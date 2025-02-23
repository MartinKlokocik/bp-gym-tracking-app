'use client'

import { useMutation } from '@apollo/client'
import {
  Input,
  Image,
  Button,
  Textarea,
  RadioGroup,
  Radio,
  Accordion,
  AccordionItem,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, ChevronLeft, ChevronRight, StepBack } from 'lucide-react'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { CalendarDay, PlannedExercise, PlannedWorkoutDay } from '../types'
import { getCalendarDay, getLatestExerciseRecord } from '../utils'
import { PlanAndDaySelect } from '../WorkoutPlanning/components/PlanAndDaySelect'

import { GymProgressChart } from './GymProgressChart'

import { CREATE_CALENDAR_DAY } from '@/graphql/CalendarConsts'
import {
  calendarDaySchema,
  CalendarDay as CalendarDayForm,
} from '@/types/CalendarDay'

type WorkoutTabProps = {
  selectedDate: Date
  user: User
}
export const WorkoutTab = ({ selectedDate, user }: WorkoutTabProps) => {
  const [
    createCalendarDay,
    {
      data: createCalendarDayData,
      loading: createCalendarDayLoading,
      error: createCalendarDayError,
    },
  ] = useMutation(CREATE_CALENDAR_DAY)

  const [calendarDay, setCalendarDay] = useState<CalendarDay | undefined>(
    getCalendarDay(selectedDate)
  )
  const [exerciseIndex, setExerciseIndex] = useState<number>(0)
  const [selectedPlannedExercise, setselectedPlannedExercise] =
    useState<PlannedExercise | null>(calendarDay?.workout.exercises[0] ?? null)
  const [notes, setNotes] = useState(
    selectedPlannedExercise?.notes?.trim() ||
      'Put your notes for this exercise here'
  )
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState<boolean>(false)

  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<
    PlannedWorkoutDay | undefined
  >()

  const formMethods = useForm<CalendarDayForm>({
    resolver: zodResolver(calendarDaySchema),
    defaultValues: {
      userId: user.id,
      date: selectedDate.toISOString(),
      plannedWorkoutDayId: '',
    },
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = formMethods

  const onSubmit = async (formData: CalendarDayForm) => {
    console.log(formData)

    try {
      await createCalendarDay({
        variables: {
          input: {
            ...formData,
          },
        },
      })

      reset()
    } catch (err) {
      console.error('Error with assigning workout day to calendar day: ', err)
      toast.error('Error with assigning workout day to calendar day.')
    }
  }

  useEffect(() => {
    if (createCalendarDayData) {
      toast.success('Workout day assigned to calendar day successfully!')
    }
  }, [createCalendarDayData])

  useEffect(() => {
    if (createCalendarDayError) {
      toast.error('Error with assigning workout day to calendar day.')
    }
  }, [createCalendarDayError])

  useEffect(() => {
    if (errors) {
      console.log('Form errors: ', errors)
    }
  }, [errors])

  useEffect(() => {
    if (selectedWorkoutDay) {
      setValue('plannedWorkoutDayId', selectedWorkoutDay.id)
    }
  }, [selectedWorkoutDay, setValue])

  useEffect(() => {
    const day = getCalendarDay(selectedDate)
    if (day) {
      setCalendarDay(day)
      setselectedPlannedExercise(day.workout.exercises[0] ?? null)
    } else {
      setCalendarDay(undefined)
      setselectedPlannedExercise(null)
    }
  }, [calendarDay?.workout, calendarDay?.workout.exercises, selectedDate])

  const handlePrevExercise = () => {
    if (exerciseIndex > 0) {
      const newIndex = exerciseIndex - 1
      setExerciseIndex(newIndex)
      setselectedPlannedExercise(
        calendarDay?.workout.exercises[newIndex] ?? null
      )
    }
  }
  const handleNextExercise = () => {
    if (
      calendarDay?.workout.exercises &&
      exerciseIndex < calendarDay.workout.exercises.length - 1
    ) {
      const newIndex = exerciseIndex + 1
      setExerciseIndex(newIndex)
      setselectedPlannedExercise(
        calendarDay?.workout.exercises[newIndex] ?? null
      )
    }
  }

  const isDisplaying = () => {
    if (!calendarDay) {
      return false
    }
    if (!calendarDay?.workout.exercises) {
      return false
    }
    if (calendarDay?.workout.exercises?.length === 0) {
      return false
    }
    return true
  }

  const latestExerciseRecord = getLatestExerciseRecord(
    selectedPlannedExercise?.exercise ?? null
  )

  return (
    <div className="flex flex-row justify-center items-center w-[90%] h-full pb-10 mt-8">
      {!isDisplaying() ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <p>There are not workout records for this day.</p>
          <form
            className="flex flex-col gap-4 w-1/2 h-full items-center justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <PlanAndDaySelect
              selectedWorkoutDay={selectedWorkoutDay}
              setSelectedWorkoutDay={setSelectedWorkoutDay}
            />

            {selectedWorkoutDay && (
              <div className="flex flex-col gap-4 w-full h-full items-end justify-center">
                <Button color="primary" variant="solid" type="submit">
                  {createCalendarDayLoading
                    ? 'Adding workout to this day...'
                    : 'Add workout to this day'}
                </Button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <>
          <button
            className="text-white p-2"
            onClick={handlePrevExercise}
            disabled={exerciseIndex == 0}
          >
            <ChevronLeft
              className={`text-white ${
                exerciseIndex == 0 ? 'disabled-white-button' : ''
              }`}
              size={80}
            />
          </button>
          <div className="flex flex-col items-center w-full h-full gap-16 pl-5 pr-5 gap-4">
            <div className="flex w-full justify-end gap-10">
              <RadioGroup orientation="horizontal">
                <Radio
                  value="0"
                  defaultChecked
                  color="warning"
                  description="This exercise is not completed today yet"
                >
                  Not marked
                </Radio>
                <Radio
                  value="1"
                  color="success"
                  description="This exercise is completed today"
                >
                  Completed
                </Radio>
                <Radio
                  value="2"
                  color="danger"
                  description="Skipping this exercise for today"
                >
                  Failed
                </Radio>
              </RadioGroup>
              <Button
                variant={isWorkoutCompleted ? 'solid' : 'bordered'}
                color="primary"
                startContent={<CheckIcon />}
                onPress={() => setIsWorkoutCompleted(!isWorkoutCompleted)}
              >
                {isWorkoutCompleted
                  ? 'Unmark workout as completed'
                  : 'Mark workout as completed'}
              </Button>
            </div>
            <div className="flex flex-row justify-between items-start justify-start w-full h-full gap-8 mb-12">
              <div className="flex flex-col gap-4 w-[40%]">
                <h2 className="text-2xl font-semibold">
                  Exercise number {exerciseIndex + 1}:{' '}
                  {selectedPlannedExercise?.exercise.name}
                </h2>
                <Image
                  src={`/assets/DummyPictures/${selectedPlannedExercise?.exercise.image}`}
                  alt={selectedPlannedExercise?.exercise.name}
                  width={500}
                  height={400}
                />
              </div>
              <div className="flex flex-col items-start w-[60%]">
                <GymProgressChart
                  exercise={selectedPlannedExercise?.exercise}
                />
              </div>
            </div>

            <div className="flex flex-row w-full h-full justify-between">
              <div className="flex flex-col w-auto h-full items-start justify-start">
                <div className="flex flex-row gap-4 justify-between w-full">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <StepBack size={20} />
                    Previous
                  </h2>
                  <h2 className="text-lg font-semibold">Current</h2>
                </div>

                {latestExerciseRecord?.sets?.map((set, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 items-center"
                  >
                    {/* Previous Section */}
                    <div>
                      <Accordion>
                        <AccordionItem
                          aria-label={`Set ${index + 1}`}
                          title={`Set ${index + 1}: ${set.weight} kg`}
                          subtitle="See details"
                          className="w-full"
                        >
                          <div className="text-gray-300">
                            <p>📊 {set.reps} reps</p>
                            <p>⏳ {set.restTime} sec</p>
                            <p>💓 {/* TODO: Add pulse data */}</p>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Current Section */}
                    <Input
                      label={`Set ${index + 1}`}
                      placeholder="Enter current weight"
                      type="number"
                      value={set.weight.toString()}
                      variant="underlined"
                      className="w-full"
                    />
                  </div>
                )) ?? null}
              </div>
              <div className="flex flex-col items-end w-full h-full">
                <Textarea
                  isClearable
                  className="max-w-lg"
                  label="Notes"
                  variant="bordered"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  onClear={() => setNotes('')}
                />
              </div>
            </div>
          </div>
          <button className="text-white p-2" onClick={handleNextExercise}>
            <ChevronRight
              className={`text-white ${
                exerciseIndex ==
                (calendarDay?.workout.exercises?.length ?? 0) - 1
                  ? 'disabled-white-button'
                  : ''
              }`}
              size={80}
            />
          </button>
        </>
      )}
    </div>
  )
}
