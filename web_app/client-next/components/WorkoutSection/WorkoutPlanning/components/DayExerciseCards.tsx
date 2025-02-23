import { useLazyQuery, useQuery } from '@apollo/client'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd'
import { Button, Select, SelectItem, Spinner } from '@heroui/react'
import { Card } from '@heroui/react'
import { Chip, Input } from '@heroui/react'
import { GripVertical, Dumbbell, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'react-toastify'

import { GET_ALL_EXERCISES, GET_EXERCISE_BY_ID } from '@/graphql/ExerciseConsts'
import { GetAllExercisesQuery } from '@/graphql/types'
import { ExerciseWithId as ExerciseTypeWithId } from '@/types/Exercise'
import { CreateWorkoutPlanFormData } from '@/types/WorkoutPlanning'
import {
  PlannedExercise as PlannedExerciseType,
  PlannedSet as PlannedSetType,
} from '@/types/WorkoutPlanning'

type DayExerciseCardsProps = {
  selectedDayIndex: number
  form: UseFormReturn<CreateWorkoutPlanFormData>
  type: 'createPlanForm' | 'editPlanForm'
}

export const DayExerciseCards = ({
  selectedDayIndex,
  form,
  type,
}: DayExerciseCardsProps) => {
  const { setValue, watch } = form
  const { data: session } = useSession()
  const {
    data: allExercises,
    loading: exercisesLoading,
    error: exercisesError,
  } = useQuery<GetAllExercisesQuery>(GET_ALL_EXERCISES)

  const [getExerciseById, { error: exerciseError }] =
    useLazyQuery(GET_EXERCISE_BY_ID)

  useEffect(() => {
    if (exercisesError) {
      toast.error(exercisesError.message)
    }
  }, [exercisesError])

  // Handle drag and drop reordering
  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !watch('days')[selectedDayIndex]) return

    const items = Array.from(watch('days')[selectedDayIndex].plannedExercises)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    if (type === 'createPlanForm') {
      setValue(`days.${selectedDayIndex}.plannedExercises`, items)
    }
  }

  const addExerciseToDay = (exercise: ExerciseTypeWithId) => {
    if (!exercise) return

    const newPlannedExercise: PlannedExerciseType = {
      userId: session?.user?.id.toString() || '',
      exerciseId: exercise.id,
      exercise: exercise,
      plannedSets: [
        {
          reps: 10,
          restTime: 60,
        },
      ],
      notes: '',
    }

    if (type === 'createPlanForm') {
      const existingExercises =
        watch(`days.${selectedDayIndex}.plannedExercises`) || []
      const updatedExercises = [...existingExercises, newPlannedExercise]
      setValue(`days.${selectedDayIndex}.plannedExercises`, updatedExercises)
    }
  }

  const addSetToExercise = (plannedExerciseIndex: number) => {
    const newSet: PlannedSetType = {
      reps: 10,
      restTime: 60,
    }

    if (type === 'createPlanForm') {
      const existingPlannedExercises = watch(
        `days.${selectedDayIndex}.plannedExercises`
      )

      const updatedPlannedExercises = [...existingPlannedExercises]
      const plannedExerciseToUpdate = {
        ...updatedPlannedExercises[plannedExerciseIndex],
      }

      plannedExerciseToUpdate.plannedSets = [
        ...plannedExerciseToUpdate.plannedSets,
        newSet,
      ]
      updatedPlannedExercises[plannedExerciseIndex] = plannedExerciseToUpdate

      setValue(
        `days.${selectedDayIndex}.plannedExercises`,
        updatedPlannedExercises
      )
    }
  }

  const removeExerciseFromDay = (plannedExerciseIndex: number) => {
    if (type === 'createPlanForm') {
      const existingExercises = watch(
        `days.${selectedDayIndex}.plannedExercises`
      )

      const updatedExercises = existingExercises.filter(
        (_, i) => i !== plannedExerciseIndex
      )

      setValue(`days.${selectedDayIndex}.plannedExercises`, updatedExercises)
    }
  }

  const removeSetFromExercise = (
    plannedExerciseIndex: number,
    setIndex: number
  ) => {
    if (type === 'createPlanForm') {
      const existingExercises = watch(
        `days.${selectedDayIndex}.plannedExercises`
      )

      const updatedExercises = [...existingExercises]
      const exerciseToUpdate = { ...updatedExercises[plannedExerciseIndex] }

      exerciseToUpdate.plannedSets = exerciseToUpdate.plannedSets.filter(
        (_, idx) => idx !== setIndex
      )

      updatedExercises[plannedExerciseIndex] = exerciseToUpdate

      setValue(`days.${selectedDayIndex}.plannedExercises`, updatedExercises)
    }
  }

  const updateExerciseNotes = (plannedExerciseIndex: number, notes: string) => {
    if (type === 'createPlanForm') {
      const existingPlannedExercises = watch(
        `days.${selectedDayIndex}.plannedExercises`
      )
      const updatedPlannedExercises = [...existingPlannedExercises]
      const exerciseToUpdate = {
        ...updatedPlannedExercises[plannedExerciseIndex],
      }
      exerciseToUpdate.notes = notes
      updatedPlannedExercises[plannedExerciseIndex] = exerciseToUpdate
      setValue(
        `days.${selectedDayIndex}.plannedExercises`,
        updatedPlannedExercises
      )
    }
  }

  const updateSetDetails = (
    plannedExerciseIndex: number,
    plannedSetIndex: number,
    field: keyof PlannedSetType,
    value: number | string
  ) => {
    if (type === 'createPlanForm') {
      const existingPlannedExercises = watch(
        `days.${selectedDayIndex}.plannedExercises`
      )
      const updatedPlannedExercises = [...existingPlannedExercises]
      const plannedExerciseToUpdate = {
        ...updatedPlannedExercises[plannedExerciseIndex],
      }
      plannedExerciseToUpdate.plannedSets[plannedSetIndex][field] = parseInt(
        value as string
      )
      updatedPlannedExercises[plannedExerciseIndex] = plannedExerciseToUpdate
      setValue(
        `days.${selectedDayIndex}.plannedExercises`,
        updatedPlannedExercises
      )
    }
  }
  const handleAddExercise = async (exerciseId: string) => {
    try {
      const { data } = await getExerciseById({
        variables: {
          id: exerciseId,
        },
      })

      if (exerciseError) {
        toast.error(exerciseError.message)
        return
      }

      if (data?.getExerciseById) {
        addExerciseToDay(data.getExerciseById)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong fetching exercise data.')
    }
  }

  const renderExerciseCard = (
    plannedExercise: PlannedExerciseType,
    plannedExerciseIndex: number
  ) => (
    <Draggable
      key={plannedExerciseIndex}
      draggableId={plannedExerciseIndex.toString()}
      index={plannedExerciseIndex}
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
                  onPress={() => addSetToExercise(plannedExerciseIndex)}
                >
                  Add Set
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  isIconOnly
                  onPress={() => removeExerciseFromDay(plannedExerciseIndex)}
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
                updateExerciseNotes(plannedExerciseIndex, e.target.value)
              }
            />

            <div className="flex flex-wrap gap-3">
              {watch(
                `days.${selectedDayIndex}.plannedExercises.${plannedExerciseIndex}.plannedSets`
              ).map((set, setIndex) => (
                <div
                  key={setIndex}
                  className="flex flex-wrap items-center gap-2"
                >
                  <Chip size="sm" variant="flat">
                    Set {setIndex + 1}
                  </Chip>
                  <Input
                    type="number"
                    size="sm"
                    className="w-20"
                    value={
                      watch(
                        `days.${selectedDayIndex}.plannedExercises.${plannedExerciseIndex}.plannedSets.${setIndex}.reps`
                      )?.toString() || ''
                    }
                    onChange={e =>
                      updateSetDetails(
                        plannedExerciseIndex,
                        setIndex,
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
                    value={
                      watch(
                        `days.${selectedDayIndex}.plannedExercises.${plannedExerciseIndex}.plannedSets.${setIndex}.restTime`
                      )?.toString() || ''
                    }
                    onChange={e =>
                      updateSetDetails(
                        plannedExerciseIndex,
                        setIndex,
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
                  {plannedExercise.plannedSets.length > 1 && (
                    <Button
                      size="sm"
                      isIconOnly
                      color="danger"
                      variant="light"
                      onPress={() =>
                        removeSetFromExercise(plannedExerciseIndex, setIndex)
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
            Exercises for {watch(`days.${selectedDayIndex}.name`)}
          </p>
          <Select
            key={selectedDayIndex}
            placeholder="Add Exercise"
            className="max-w-xs"
            aria-label="Select an exercise to add"
            onChange={e => {
              handleAddExercise(e.target.value)
            }}
          >
            {exercisesLoading ? (
              <SelectItem key="loading">
                <Spinner />
              </SelectItem>
            ) : (
              allExercises?.getAllExercises?.map(exercise => (
                <SelectItem key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </SelectItem>
              )) || []
            )}
          </Select>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={selectedDayIndex.toString()}
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
          >
            {(provided: DroppableProvided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {watch(`days.${selectedDayIndex}.plannedExercises`).length ===
                0 ? (
                  <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <p className="text-default-500">No exercises added yet</p>
                    <p className="text-sm text-default-400">
                      Use the dropdown above to add exercises
                    </p>
                  </div>
                ) : (
                  watch(`days.${selectedDayIndex}.plannedExercises`).map(
                    (plannedExercise, index) =>
                      renderExerciseCard(plannedExercise, index)
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
