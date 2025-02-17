'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
} from '@heroui/react'
import { Dumbbell, Camera, Clock } from 'lucide-react'
import { equipment, muscleGroups } from '../DummyData'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useMutation } from '@apollo/client'
import { CREATE_EXERCISE } from '@/graphql/ExercisesConsts'
import { exerciseSchema, CreateExerciseFormData } from '@/types/Exercise'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

type ExerciseCreatorModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const ExerciseCreatorModal = ({
  isOpen,
  onOpenChange,
}: ExerciseCreatorModalProps) => {
  const { data: session } = useSession()
  const [createExercise, { data, loading, error }] =
    useMutation(CREATE_EXERCISE)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      userId: session?.user?.id?.toString() || '1',
      isDefault: session?.user?.id === '1' ? true : false,
      isPublic: session?.user?.id === '1' ? true : false,
      type: 'strength',
    },
  })

  const onSubmit = async (formData: CreateExerciseFormData) => {
    console.log('Form Submitted:', formData)

    let equipmentArray: string[] = []
    if (typeof formData.equipment === 'string') {
      equipmentArray = formData.equipment?.split(',').map(item => item.trim())
    } else {
      equipmentArray = []
    }

    try {
      await createExercise({
        variables: {
          ...formData,
          equipment: equipmentArray,
        },
      })

      reset()
      onOpenChange(false)
    } catch (err) {
      console.error('Error creating exercise:', err)
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  useEffect(() => {
    if (data) {
      toast.success('Exercise created successfully!')
    }
  }, [data])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        className="h-auto overflow-y-auto"
        scrollBehavior="inside"
      >
        <ModalContent>
          {onClose => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Create New Exercise
              </ModalHeader>

              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Exercise Type Selector */}
                    <div className="mb-6">
                      <p className="text-sm text-default-500 mb-2">
                        Exercise Type
                      </p>
                      <div className="flex gap-2">
                        <Button
                          color={
                            watch('type') === 'strength' ? 'primary' : 'default'
                          }
                          variant={
                            watch('type') === 'strength' ? 'solid' : 'flat'
                          }
                          startContent={<Dumbbell size={18} />}
                          onPress={() => setValue('type', 'strength')}
                        >
                          Strength
                        </Button>
                        <Button
                          color={
                            watch('type') === 'cardio' ? 'primary' : 'default'
                          }
                          variant={
                            watch('type') === 'cardio' ? 'solid' : 'flat'
                          }
                          startContent={<Clock size={18} />}
                          onPress={() => setValue('type', 'cardio')}
                        >
                          Cardio
                        </Button>
                      </div>
                    </div>

                    <Input
                      label="Exercise Name"
                      placeholder="e.g., Barbell Squat"
                      variant="bordered"
                      {...register('name')}
                      errorMessage={errors.name?.message}
                      isInvalid={!!errors.name}
                    />

                    {/* Description */}
                    <Textarea
                      className="w-full"
                      label="Description"
                      variant="bordered"
                      placeholder="Enter your description"
                      {...register('description')}
                      errorMessage={errors.description?.message}
                      isInvalid={!!errors.description}
                    />

                    <Checkbox
                      color="primary"
                      size="md"
                      {...register('isPublic')}
                    >
                      Do you want this exercise to be public?
                    </Checkbox>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Media Upload */}
                    <div className="space-y-2">
                      <p className="text-medium font-medium">Exercise Media</p>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-default-100 flex items-center justify-center">
                            <Camera size={24} />
                          </div>
                          <div>
                            <p className="text-sm">
                              Drop images here or click to upload
                            </p>
                            <p className="text-xs text-default-400">
                              Supports JPG, PNG, GIF
                            </p>
                          </div>
                          <Button color="primary" variant="flat" size="sm">
                            Upload Media
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Select
                      {...register('muscleGroup')}
                      errorMessage={errors.muscleGroup?.message}
                      isInvalid={!!errors.muscleGroup}
                      label="Muscle Group"
                      placeholder="Select a muscle group"
                      variant="bordered"
                    >
                      {muscleGroups.map(group => (
                        <SelectItem key={group.value} value={group.value}>
                          {group.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      {...register('equipment')}
                      label="Equipment"
                      placeholder="Select equipment"
                      variant="bordered"
                      selectionMode="multiple"
                    >
                      {equipment.map(equipment => (
                        <SelectItem
                          key={equipment.value}
                          value={equipment.value}
                        >
                          {equipment.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {loading ? 'Creating...' : 'Create Exercise'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
