'use client'

import { useMutation } from '@apollo/client'
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
  Textarea,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, Dumbbell, Clock, X } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { equipmentOptions, muscleGroups } from '../DummyData'

import { CREATE_EXERCISE } from '@/graphql/ExerciseConsts'
import { exerciseSchema, ExerciseWithoutIdsType } from '@/types/Exercise'
import { uploadImage } from '@/utils/upload-image'

type ExerciseCreatorModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  refetchExercises?: () => void
}

export const ExerciseCreatorModal = ({
  isOpen,
  onOpenChange,
  refetchExercises,
}: ExerciseCreatorModalProps) => {
  const { data: session } = useSession()
  const [createExercise, { data, loading, error }] =
    useMutation(CREATE_EXERCISE)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExerciseWithoutIdsType>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      userId: session?.user?.id,
      isDefault: session?.user?.id === '1' ? true : false,
      isPublic: false,
      type: 'strength',
    },
  })

  const onSubmit = async (formData: ExerciseWithoutIdsType) => {
    console.log('Form Submitted:', formData)

    let equipmentArray: string[] = []
    if (typeof formData.equipment === 'string') {
      equipmentArray = formData.equipment?.split(',').map(item => item.trim())
    } else {
      equipmentArray = []
    }

    let imageUrl = ''

    try {
      if (file) {
        imageUrl = await uploadImage(file, 'exercise_images')
      }
    } catch (e) {
      console.error(e)
      toast.error('Upload failed')
    }

    try {
      await createExercise({
        variables: {
          ...formData,
          equipment: equipmentArray,
          image: imageUrl,
        },
      })

      reset()
      onOpenChange(false)
      refetchExercises?.()
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

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setFile(files[0] as File)
    setPreview(URL.createObjectURL(files[0]))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }, [])

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
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSubmit(onSubmit)(e)
              }}
            >
              <ModalHeader className="flex flex-col gap-1">
                Create New Exercise
              </ModalHeader>

              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
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
                      {equipmentOptions.map(equipment => (
                        <SelectItem
                          key={equipment.value}
                          value={equipment.value}
                        >
                          {equipment.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Media Upload */}
                    <div className="space-y-2">
                      <p className="text-medium font-medium">Exercise Media</p>
                      <div
                        className="border-2 border-dashed rounded-lg p-6 text-center"
                        onDrop={onDrop}
                        onDragOver={e => e.preventDefault()}
                        role="button"
                        tabIndex={0}
                        onClick={() => inputRef.current?.click()}
                      >
                        {!preview ? (
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
                            <Button
                              color="primary"
                              variant="flat"
                              size="sm"
                              onClick={e => {
                                e.stopPropagation()
                                inputRef.current?.click()
                              }}
                            >
                              Upload Media
                            </Button>
                          </div>
                        ) : (
                          <div className="relative">
                            <Image
                              src={preview}
                              alt="preview"
                              className="max-h-60 mx-auto mt-4 rounded-lg"
                              width={360}
                              height={360}
                            />
                            <button
                              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                              onClick={e => {
                                e.stopPropagation()
                                setPreview(null)
                                setFile(null)
                              }}
                            >
                              <X size={16} color="white" />
                            </button>
                          </div>
                        )}
                        <input
                          ref={inputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/gif"
                          className="hidden"
                          onChange={e => handleFiles(e.target.files)}
                        />
                      </div>
                    </div>

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
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={e => {
                    e.preventDefault()
                    handleSubmit(onSubmit)(e)
                  }}
                >
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
