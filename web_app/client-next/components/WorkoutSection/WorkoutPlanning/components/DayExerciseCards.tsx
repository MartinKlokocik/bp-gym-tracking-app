import { Button, Select, SelectItem } from '@heroui/react'
import { Card } from '@heroui/react'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd'
import { PlannedExercise, PlannedWorkoutDay, Set } from '../../types'
import { GripVertical, Dumbbell, X } from 'lucide-react'
import { Chip, Input } from '@heroui/react'
import { dummyExercises } from '../../DummyData'
import { getExerciseById } from '../../utils'

type DayExerciseCardsProps = {
  selectedDay: PlannedWorkoutDay
  setPlannedWorkoutDays?: React.Dispatch<
    React.SetStateAction<PlannedWorkoutDay[]>
  >
  setSelectedWorkoutDay?: React.Dispatch<
    React.SetStateAction<PlannedWorkoutDay | undefined>
  >
}

export const DayExerciseCards = ({
  selectedDay,
  setPlannedWorkoutDays,
  setSelectedWorkoutDay,
}: DayExerciseCardsProps) => {
  // Handle drag and drop reordering
  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !selectedDay) return

    const items = Array.from(selectedDay.exercises)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    if (setPlannedWorkoutDays) {
      setPlannedWorkoutDays(days =>
        days.map(day =>
          day.id === selectedDay.id ? { ...day, exercises: items } : day
        )
      )
    } else if (setSelectedWorkoutDay) {
      setSelectedWorkoutDay({ ...selectedDay, exercises: items })
    }
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

    if (setPlannedWorkoutDays) {
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
    } else if (setSelectedWorkoutDay) {
      setSelectedWorkoutDay(prevDay => {
        if (!prevDay) return prevDay
        return {
          ...prevDay,
          exercises: [...prevDay.exercises, newExercise],
        }
      })
    }
  }

  const addSetToExercise = (dayId: string, exerciseId: string) => {
    const newSet: Set = {
      id: `set-${Date.now()}`,
      reps: 12,
      restTime: 60,
    }

    if (setPlannedWorkoutDays) {
      setPlannedWorkoutDays(days =>
        days.map(day => {
          if (day.id === dayId) {
            return {
              ...day,
              exercises: day.exercises.map(exercise => {
                if (exercise.id === exerciseId) {
                  return { ...exercise, sets: [...exercise.sets, newSet] }
                }
                return exercise
              }),
            }
          }
          return day
        })
      )
    } else if (setSelectedWorkoutDay) {
      setSelectedWorkoutDay(prevDay => {
        if (!prevDay) return prevDay
        return {
          ...prevDay,
          exercises: prevDay.exercises.map(exercise =>
            exercise.id === exerciseId
              ? { ...exercise, sets: [...exercise.sets, newSet] }
              : exercise
          ),
        }
      })
    }
  }

  const removeExerciseFromDay = (dayId: string, exerciseId: string) => {
    if (setPlannedWorkoutDays) {
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
    } else if (setSelectedWorkoutDay) {
      setSelectedWorkoutDay(prevDay => {
        if (!prevDay) return prevDay
        return {
          ...prevDay,
          exercises: prevDay.exercises.filter(
            exercise => exercise.id !== exerciseId
          ),
        }
      })
    }
  }

  const removeSetFromExercise = (
    dayId: string,
    exerciseId: string,
    setId: string
  ) => {
    if (setPlannedWorkoutDays) {
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
    } else if (setSelectedWorkoutDay) {
      setSelectedWorkoutDay(prevDay => {
        if (!prevDay) return prevDay
        return {
          ...prevDay,
          exercises: prevDay.exercises.map(exercise =>
            exercise.id === exerciseId
              ? {
                ...exercise,
                sets: exercise.sets.filter(set => set.id !== setId),
              }
            : exercise
          ),
        }
      })
    }
  }

  const updateExerciseNotes = (
    dayId: string,
    exerciseId: string,
    notes: string
  ) => {
    if (setPlannedWorkoutDays) {
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
    } else if (setSelectedWorkoutDay) {
      setSelectedWorkoutDay(prevDay => {
        if (!prevDay) return prevDay
        return {
          ...prevDay,
          exercises: prevDay.exercises.map(exercise =>
            exercise.id === exerciseId ? { ...exercise, notes } : exercise
          ),
        }
      })
    }
  }

  const updateSetDetails = (
    dayId: string,
    exerciseId: string,
    setId: string,
    field: keyof Set,
    value: number | string
  ) => {
    if (setPlannedWorkoutDays) {
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
    } else if (setSelectedWorkoutDay) {
      setSelectedWorkoutDay(prevDay => {
        if (!prevDay) return prevDay
        return {
          ...prevDay,
          exercises: prevDay.exercises.map(exercise =>
            exercise.id === exerciseId
            ? {
                ...exercise,
                sets: exercise.sets.map(set =>
                  set.id === setId ? { ...set, [field]: value } : set
                ),
              }
            : exercise
          ),
        }
      })
    }
  }

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
              <SelectItem key={exercise.id} value={exercise.id}>
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
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {selectedDay.exercises.length === 0 ? (
                  <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <p className="text-default-500">No exercises added yet</p>
                    <p className="text-sm text-default-400">
                      Use the dropdown above to add exercises
                    </p>
                  </div>
                ) : (
                  selectedDay.exercises.map((exercise, index) =>
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
  )
}
