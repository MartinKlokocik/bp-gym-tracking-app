'use client'

import { useMutation, useLazyQuery } from '@apollo/client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  Checkbox,
  Textarea,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight, Pencil } from 'lucide-react'
import { User } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { DayExerciseCards } from './components/DayExerciseCards'

import { GENERATE_WORKOUTS } from '@/graphql/AiCallsConsts'
import { CREATE_PLANNED_WORKOUT } from '@/graphql/PlannedWorkoutConsts'
import {
  PlannedWorkoutWithoutIdsType,
  plannedWorkoutSchema,
} from '@/types/WorkoutPlanning'

type PlanCreatorModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  user: User
  refetchPlannedWorkouts: () => void
}

export const PlanCreatorModal = ({
  isOpen,
  onOpenChange,
  user,
  refetchPlannedWorkouts,
}: PlanCreatorModalProps) => {
  const [
    createPlannedWorkout,
    {
      data: createPlannedWorkoutData,
      loading: createPlannedWorkoutLoading,
      error: createPlannedWorkoutError,
    },
  ] = useMutation(CREATE_PLANNED_WORKOUT)

  const [
    generateWorkouts,
    { loading: generateWorkoutsLoading, error: generateWorkoutsError },
  ] = useLazyQuery(GENERATE_WORKOUTS)

  const [step, setStep] = useState(1)
  const [numberOfDays, setNumberOfDays] = useState<string>('1')
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0)
  const [isGeneratingByAI, setIsGeneratingByAI] = useState<boolean>(false)
  const [profileDataUsage, setProfileDataUsage] = useState<boolean>(false)
  const [additionalInformation, setAdditionalInformation] = useState<string>('')

  const formMethods = useForm<PlannedWorkoutWithoutIdsType>({
    resolver: zodResolver(plannedWorkoutSchema),
    defaultValues: {
      userId: user?.id.toString(),
      isActive: false,
      schema: '',
      name: '',
      days: [
        {
          userId: user?.id.toString(),
          plannedExercises: [
            {
              userId: user?.id.toString(),
              plannedSets: [{ reps: 8, restTime: 60 }],
            },
          ],
        },
      ],
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = formMethods

  useEffect(() => {
    if (errors) {
      console.log('form errors: ', errors)
    }
  }, [errors])

  const onSubmit = async (formData: PlannedWorkoutWithoutIdsType) => {
    try {
      await createPlannedWorkout({
        variables: {
          input: {
            ...formData,
            days: formData.days.map(day => ({
              ...day,
              plannedExercises: day.plannedExercises.map(
                ({ exercise, ...rest }) => ({
                  ...rest,
                  exerciseId: exercise.id,
                })
              ),
            })),
          },
        },
      })

      await refetchPlannedWorkouts()
      onOpenChange(false)
      await handleReset()
    } catch (err) {
      console.error('Error creating workout plan:', err)
    }
  }

  useEffect(() => {
    if (createPlannedWorkoutError) {
      toast.error(createPlannedWorkoutError.message)
    }
  }, [createPlannedWorkoutError])

  useEffect(() => {
    if (createPlannedWorkoutData) {
      toast.success('Workout plan created successfully!')
    }
  }, [createPlannedWorkoutData])

  const handleGeneratePlan = async () => {
    try {
      const userId = watch('userId')
      const result = await generateWorkouts({
        variables: {
          additionalInformations: additionalInformation,
          userId: userId,
          useProfileData: profileDataUsage,
        },
      })

      const parsedResult = JSON.parse(result.data.generateWorkouts)
      reset(parsedResult)
      setNumberOfDays(parsedResult.days.length.toString())
      setStep(2)
    } catch (error) {
      console.error('Error generating plan:', error)
    }
  }

  const handleReset = () => {
    reset({
      userId: user?.id.toString(),
      isActive: false,
      schema: '',
      name: '',
      days: [
        {
          userId: user?.id.toString(),
          name: 'Workout 1',
          plannedExercises: [
            {
              userId: user?.id.toString(),
              plannedSets: [{ reps: 8, restTime: 60 }],
            },
          ],
        },
      ],
    })
    setStep(1)
    setNumberOfDays('1')
    setSelectedDayIndex(0)
    setProfileDataUsage(false)
    setAdditionalInformation('')
    setIsGeneratingByAI(false)
  }

  const initializeWorkoutDays = () => {
    const days = parseInt(numberOfDays)
    if (isNaN(days) || days < 1) return

    const newDays = Array.from({ length: days }, (_, index) => ({
      name: `Workout ${index + 1}`,
      plannedExercises: [],
      userId: user?.id.toString() || '',
    }))
    setValue('days', newDays)
  }

  const renderPreview = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{watch('name')}</h3>
      {watch('days').map((day, index) => (
        <Card key={index} className="p-4 bg-default-100">
          <h4 className="text-lg font-semibold mb-4">{day.name}</h4>
          {day.plannedExercises.map((plannedExercise, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{plannedExercise.exercise?.name}</p>
              <div className="ml-4">
                {plannedExercise.plannedSets.map((plannedSet, index) => (
                  <p key={index} className="text-sm text-default-600">
                    Set {index + 1}: {plannedSet.reps} reps{' '}
                    {plannedSet.restTime !== undefined
                      ? ` - Rest: ${plannedSet.restTime}s`
                      : ''}
                  </p>
                ))}
                {plannedExercise.notes && (
                  <p className="text-sm text-default-500 mt-1">
                    Note: {plannedExercise.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={open => {
        onOpenChange(open)
      }}
      size={step === 1 ? 'md' : '4xl'}
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create Workout Plan - Step {step} of 3
          </ModalHeader>

          <ModalBody>
            {step === 1 && (
              <div className="space-y-3">
                <Input
                  label="Plan Name"
                  placeholder="Enter plan name"
                  variant="bordered"
                  required
                  {...register('name')}
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                />
                <Input
                  type="number"
                  label="Number of Workout Days"
                  placeholder="Enter number of days"
                  min={1}
                  required
                  value={numberOfDays}
                  onChange={e => setNumberOfDays(e.target.value)}
                  variant="bordered"
                />
                <div className="w-full h-[1px] bg-default-200" />
                <Checkbox
                  defaultSelected={false}
                  color="primary"
                  size="md"
                  onChange={e => setIsGeneratingByAI(e.target.checked)}
                >
                  Do you want to generate it by AI?
                </Checkbox>
                {isGeneratingByAI && (
                  <>
                    <Checkbox
                      defaultSelected={false}
                      color="primary"
                      size="md"
                      onChange={e => setProfileDataUsage(e.target.checked)}
                    >
                      Do you want to use your profile data to generate the plan?
                      (goals, experience, injuries, etc.)
                    </Checkbox>
                    <Textarea
                      label="Additional information"
                      placeholder="Enter additional information for plan generation"
                      variant="bordered"
                      value={additionalInformation}
                      onChange={e => setAdditionalInformation(e.target.value)}
                    />
                    <p>{generateWorkoutsError?.message}</p>
                  </>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 w-full">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6">
                  <div className="space-y-4 w-4/5">
                    <p className="text-medium font-medium">Workout Days</p>
                    {watch('days').map((day, index) => (
                      <Card
                        key={index}
                        className={
                          selectedDayIndex === index
                            ? 'border-2 border-primary'
                            : ''
                        }
                      >
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <Input
                              size="sm"
                              {...register(`days.${index}.name`)}
                              errorMessage={errors.days?.[index]?.name?.message}
                              isInvalid={!!errors.days?.[index]?.name}
                              variant="bordered"
                              onClick={e => {
                                e.stopPropagation()
                              }}
                              endContent={
                                <Pencil className="text-default-400 w-5" />
                              }
                            />
                            <Button
                              isIconOnly
                              variant="light"
                              className="ml-1"
                              onPress={() => setSelectedDayIndex(index)}
                            >
                              <ChevronRight className="text-default-600" />
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>

                  {watch('days')[selectedDayIndex] && (
                    <DayExerciseCards
                      selectedDayIndex={selectedDayIndex}
                      type="createPlanForm"
                      form={formMethods}
                      userId={user?.id.toString()}
                    />
                  )}
                </div>
              </div>
            )}

            {step === 3 && renderPreview()}
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleReset}>
              Reset all data
            </Button>
            {step === 1 && !isGeneratingByAI ? (
              <Button
                color="primary"
                onPress={() => {
                  if (watch('name') && numberOfDays) {
                    initializeWorkoutDays()
                    setStep(2)
                  }
                }}
                isDisabled={!watch('name') || !numberOfDays}
              >
                Next
              </Button>
            ) : step === 1 && isGeneratingByAI ? (
              <Button
                color="primary"
                type="button"
                onClick={e => {
                  e.preventDefault()
                  handleGeneratePlan()
                }}
              >
                {generateWorkoutsLoading ? (
                  <span className="animate-pulse">Generating...</span>
                ) : (
                  'Generate Plan'
                )}
              </Button>
            ) : step === 2 ? (
              <div className="flex gap-2">
                <Button
                  type="button"
                  color="default"
                  variant="flat"
                  onPress={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={e => {
                    setStep(3)
                    e.preventDefault()
                  }}
                  isDisabled={watch('days').some(
                    day => day.plannedExercises.length === 0
                  )}
                >
                  Preview
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  color="default"
                  variant="flat"
                  onPress={() => setStep(2)}
                >
                  Back
                </Button>
                <Button color="primary" type="submit">
                  {createPlannedWorkoutLoading ? 'Creating...' : 'Create Plan'}
                </Button>
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
