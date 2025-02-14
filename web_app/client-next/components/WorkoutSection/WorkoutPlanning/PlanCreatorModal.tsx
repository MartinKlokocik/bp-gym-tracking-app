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
  Card,
  CardBody,
  Chip,
} from '@heroui/react'
import { X, ChevronRight, Dumbbell, GripVertical, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from '@hello-pangea/dnd'
import { Set, PlannedWorkoutDay, PlannedExercise } from '../types'
import { dummyExercises } from '../DummyData'
import { getExerciseById } from '../utils'

type PlanCreatorModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const PlanCreatorModal = ({
  isOpen,
  onOpenChange,
}: PlanCreatorModalProps) => {
  const [step, setStep] = useState(1)
  const [plannedWorkoutDayName, setPlannedWorkoutDayName] = useState('')
  const [numberOfDays, setNumberOfDays] = useState('')
  const [plannedWorkoutDays, setPlannedWorkoutDays] = useState<
    PlannedWorkoutDay[]
  >([])
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null)

  const selectedDay = plannedWorkoutDays.find(day => day.id === selectedDayId)

  const initializeWorkoutDays = () => {
    const days = parseInt(numberOfDays)
    if (isNaN(days) || days < 1) return

    const newDays = Array.from({ length: days }, (_, index) => ({
      id: `day-${index + 1}`,
      name: `Workout ${index + 1}`,
      exercises: [],
    }))
    setPlannedWorkoutDays(newDays)
    setSelectedDayId(newDays[0].id)
  }

  // Handle day name update
  const updateDayName = (dayId: string, newName: string) => {
    setPlannedWorkoutDays(days =>
      days.map(day => (day.id === dayId ? { ...day, name: newName } : day))
    )
  }

  // Handle drag and drop reordering
  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !selectedDay) return

    const items = Array.from(selectedDay.exercises)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setPlannedWorkoutDays(days =>
      days.map(day =>
        day.id === selectedDay.id ? { ...day, exercises: items } : day
      )
    )
  }

  const addExerciseToDay = (dayId: string, exerciseId: string) => {
    const exercise = getExerciseById(exerciseId)
    if (!exercise) return
    const newExercise: PlannedExercise = {
      id: dayId + '-' + exerciseId + '-' + Date.now(),
      exercise: exercise,
      sets: [
        {
          id: `set-${Date.now()}`,
          reps: 12,
          restTime: 60,
        },
      ],
      notes: '',
    }

    setPlannedWorkoutDays(days =>
      days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: [...day.exercises, newExercise],
          }
        }
        return day
      })
    )
  }

  const addSetToExercise = (dayId: string, exerciseId: string) => {
    setPlannedWorkoutDays(days =>
      days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map(exercise => {
              if (exercise.id === exerciseId) {
                const newSet: Set = {
                  id: `set-${Date.now()}`,
                  reps: 12,
                  restTime: 60,
                }
                return { ...exercise, sets: [...exercise.sets, newSet] }
              }
              return exercise
            }),
          }
        }
        return day
      })
    )
  }

  const removeExerciseFromDay = (dayId: string, exerciseId: string) => {
    setPlannedWorkoutDays(days =>
      days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.filter(
              exercise => exercise.id !== exerciseId
            ),
          }
        }
        return day
      })
    )
  }

  const removeSetFromExercise = (
    dayId: string,
    exerciseId: string,
    setId: string
  ) => {
    setPlannedWorkoutDays(days =>
      days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map(exercise => {
              if (exercise.id === exerciseId) {
                return {
                  ...exercise,
                  sets: exercise.sets.filter(set => set.id !== setId),
                }
              }
              return exercise
            }),
          }
        }
        return day
      })
    )
  }

  const updateExerciseNotes = (
    dayId: string,
    exerciseId: string,
    notes: string
  ) => {
    setPlannedWorkoutDays(days =>
      days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map(exercise =>
              exercise.id === exerciseId ? { ...exercise, notes } : exercise
            ),
          }
        }
        return day
      })
    )
  }

  const updateSetDetails = (
    dayId: string,
    exerciseId: string,
    setId: string,
    field: keyof Set,
    value: number | string
  ) => {
    setPlannedWorkoutDays(days =>
      days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map(exercise => {
              if (exercise.id === exerciseId) {
                return {
                  ...exercise,
                  sets: exercise.sets.map(set =>
                    set.id === setId ? { ...set, [field]: value } : set
                  ),
                }
              }
              return exercise
            }),
          }
        }
        return day
      })
    )
  }

  const renderPreview = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{plannedWorkoutDayName}</h3>
      {plannedWorkoutDays.map(day => (
        <Card key={day.id} className="p-4 bg-default-100">
          <h4 className="text-lg font-semibold mb-4">{day.name}</h4>
          {day.exercises.map(plannedExercise => (
            <div key={plannedExercise.id} className="mb-4">
              <p className="font-medium">{plannedExercise.exercise.name}</p>
              <div className="ml-4">
                {plannedExercise.sets.map((set, idx) => (
                  <p key={set.id} className="text-sm text-default-600">
                    Set {idx + 1}: {set.reps} reps{' '}
                    {set.restTime !== undefined
                      ? ` - Rest: ${set.restTime}s`
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

  const renderExerciseCard = (
    plannedExercise: PlannedExercise,
    index: number
  ) => (
    <Draggable
      key={plannedExercise.id}
      draggableId={plannedExercise.id}
      index={index}
    >
      {(provided: DraggableProvided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="p-4 mb-4"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div {...provided.dragHandleProps}>
                  <GripVertical className="text-default-400" size={20} />
                </div>
                <Dumbbell className="text-default-400" size={20} />
                <p className="font-medium">{plannedExercise.exercise.name}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  onPress={() =>
                    addSetToExercise(selectedDay!.id, plannedExercise.id)
                  }
                >
                  Add Set
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  isIconOnly
                  onPress={() =>
                    removeExerciseFromDay(selectedDay!.id, plannedExercise.id)
                  }
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            <Input
              size="sm"
              placeholder="Add notes for this exercise..."
              value={plannedExercise.notes || ''}
              onChange={e =>
                updateExerciseNotes(
                  selectedDay!.id,
                  plannedExercise.id,
                  e.target.value
                )
              }
            />

            <div className="flex flex-wrap gap-3">
              {plannedExercise.sets.map((set, idx) => (
                <div key={set.id} className="flex flex-wrap items-center gap-2">
                  <Chip size="sm" variant="flat">
                    Set {idx + 1}
                  </Chip>
                  <Input
                    type="number"
                    size="sm"
                    className="w-20"
                    value={set.reps.toString()}
                    onChange={e =>
                      updateSetDetails(
                        selectedDay!.id,
                        plannedExercise.id,
                        set.id,
                        'reps',
                        parseInt(e.target.value) || 0
                      )
                    }
                    endContent={
                      <div className="pointer-events-none text-default-400 text-small">
                        reps
                      </div>
                    }
                  />
                  <Input
                    type="number"
                    size="sm"
                    className="w-20"
                    value={set.restTime?.toString() || '60'}
                    onChange={e =>
                      updateSetDetails(
                        selectedDay!.id,
                        plannedExercise.id,
                        set.id,
                        'restTime',
                        parseInt(e.target.value) || 60
                      )
                    }
                    endContent={
                      <div className="pointer-events-none text-default-400 text-small">
                        sec
                      </div>
                    }
                  />
                  {plannedExercise.sets.length > 1 && (
                    <Button
                      size="sm"
                      isIconOnly
                      color="danger"
                      variant="light"
                      onPress={() =>
                        removeSetFromExercise(
                          selectedDay!.id,
                          plannedExercise.id,
                          set.id
                        )
                      }
                    >
                      <X size={14} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </Draggable>
  )

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={open => {
        if (!open) {
          setPlannedWorkoutDayName('')
          setNumberOfDays('')
          setPlannedWorkoutDays([])
          setSelectedDayId(null)
          setStep(1)
        }
        onOpenChange(open)
      }}
      size={step === 1 ? 'md' : '4xl'}
      scrollBehavior="inside"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Workout Plan - Step {step} of 3
            </ModalHeader>

            <ModalBody>
              {step === 1 && (
                <div className="space-y-6">
                  <Input
                    label="Plan Name"
                    placeholder="Enter plan name"
                    value={plannedWorkoutDayName}
                    onChange={e => setPlannedWorkoutDayName(e.target.value)}
                    variant="bordered"
                  />
                  <Input
                    type="number"
                    label="Number of Workout Days"
                    placeholder="Enter number of days"
                    min={1}
                    value={numberOfDays}
                    onChange={e => setNumberOfDays(e.target.value)}
                    variant="bordered"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 w-full">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4 w-4/5">
                      <p className="text-medium font-medium">Workout Days</p>
                      {plannedWorkoutDays.map(day => (
                        <Card
                          key={day.id}
                          className={
                            selectedDayId === day.id
                              ? 'border-2 border-primary'
                              : ''
                          }
                        >
                          <CardBody className="p-3">
                            <div className="flex justify-between items-center">
                              <Input
                                size="sm"
                                value={day.name}
                                onChange={e =>
                                  updateDayName(day.id, e.target.value)
                                }
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
                                onPress={() => setSelectedDayId(day.id)}
                              >
                                <ChevronRight className="text-default-600" />
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>

                    {selectedDay && (
                      <div className="space-y-4">
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-center">
                            <p className="text-medium font-medium">
                              Exercises for {selectedDay.name}
                            </p>
                            <Select
                              key={selectedDay.id}
                              placeholder="Add Exercise"
                              className="max-w-xs"
                              aria-label="Select an exercise to add"
                              onChange={e => {
                                const exercise = dummyExercises.find(
                                  ex => ex.id === e.target.value
                                )
                                if (exercise && selectedDay) {
                                  addExerciseToDay(selectedDay.id, exercise.id)
                                }
                              }}
                            >
                              {dummyExercises.map(exercise => (
                                <SelectItem
                                  key={exercise.id}
                                  value={exercise.id}
                                >
                                  {exercise.name}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>

                          <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                              droppableId={selectedDay.id}
                              isDropDisabled={false}
                              isCombineEnabled={false}
                              ignoreContainerClipping={false}
                            >
                              {(provided: DroppableProvided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  {selectedDay.exercises.length === 0 ? (
                                    <div className="text-center p-8 border-2 border-dashed rounded-lg">
                                      <p className="text-default-500">
                                        No exercises added yet
                                      </p>
                                      <p className="text-sm text-default-400">
                                        Use the dropdown above to add exercises
                                      </p>
                                    </div>
                                  ) : (
                                    selectedDay.exercises.map(
                                      (exercise, index) =>
                                        renderExerciseCard(exercise, index)
                                    )
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && renderPreview()}
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              {step === 1 ? (
                <Button
                  color="primary"
                  onPress={() => {
                    if (plannedWorkoutDayName && numberOfDays) {
                      initializeWorkoutDays()
                      setStep(2)
                    }
                  }}
                  isDisabled={!plannedWorkoutDayName || !numberOfDays}
                >
                  Next
                </Button>
              ) : step === 2 ? (
                <div className="flex gap-2">
                  <Button
                    color="default"
                    variant="flat"
                    onPress={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => setStep(3)}
                    isDisabled={plannedWorkoutDays.some(
                      day => day.exercises.length === 0
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
                  <Button color="primary" onPress={onClose}>
                    Create Plan
                  </Button>
                </div>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
