import { useQuery } from '@apollo/client'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Card,
  Divider,
  Button,
} from '@heroui/react'
import {
  Dumbbell,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Repeat,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { GET_PLANNED_WORKOUT_BY_ID } from '@/graphql/PlannedWorkoutConsts'
import { PlannedWorkoutWithIdsType } from '@/types/WorkoutPlanning'
import { formatRestTime } from '@/utils/TimeUtils'

type WorkoutDetailViewModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedWorkoutPlanId: string
}

export const WorkoutDetailViewModal = ({
  isOpen,
  onOpenChange,
  selectedWorkoutPlanId,
}: WorkoutDetailViewModalProps) => {
  const {
    data: workoutPlanData,
    loading: workoutPlanLoading,
    error: workoutPlanError,
  } = useQuery(GET_PLANNED_WORKOUT_BY_ID, {
    variables: { id: selectedWorkoutPlanId },
    skip: !selectedWorkoutPlanId,
  })

  const [workoutPlan, setWorkoutPlan] =
    useState<PlannedWorkoutWithIdsType | null>(null)

  useEffect(() => {
    if (workoutPlanData) {
      setWorkoutPlan(workoutPlanData.getWorkoutPlanById)
    }
  }, [workoutPlanData])

  useEffect(() => {
    if (workoutPlanError) {
      toast.error('Error fetching workout plan')
    }
  }, [workoutPlanError])

  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {}
      if (workoutPlan) {
        if (workoutPlan.days.length > 0) {
          initial[workoutPlan.days[0].id] = true
        }
      }
      return initial
    }
  )

  const toggleDayExpansion = (dayId: string) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayId]: !prev[dayId],
    }))
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        <ModalHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <Dumbbell className="w-6 h-6" />
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-xl font-bold">
                  {workoutPlanLoading ? 'Loading...' : workoutPlan?.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {workoutPlan?.schema && (
                    <>
                      <Calendar className="w-3 h-3" />
                      {workoutPlan.schema}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="flat" color="default">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="p-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            {workoutPlan?.days.map(day => (
              <Card
                key={day.id}
                className="border border-gray-700 overflow-hidden"
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleDayExpansion(day.id)}
                >
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-lg">{day.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {day.plannedExercises.length} exercises
                    {expandedDays[day.id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedDays[day.id] && (
                  <div className="px-4 pb-4 space-y-4">
                    <Divider className="border-gray-700" />

                    {day.plannedExercises.map(exercise => (
                      <div key={exercise.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                              {exercise.exerciseNumber}
                            </div>
                            <div>
                              <h5 className="font-medium text-white">
                                {exercise.exercise.name}
                              </h5>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                {exercise.exercise.muscleGroup}
                                {exercise.exercise.equipment &&
                                  Array.isArray(exercise.exercise.equipment) &&
                                  exercise.exercise.equipment.map((item, i) => (
                                    <span key={i}>{item}</span>
                                  ))}
                              </div>
                            </div>
                          </div>
                          {exercise.exercise.type === 'cardio' ? (
                            <Clock className="w-7 h-7" />
                          ) : (
                            <Dumbbell className="w-7 h-7" />
                          )}
                        </div>

                        {exercise.notes && (
                          <div className="bg-gray-800 p-3 rounded-md text-gray-300 text-sm italic">
                            {exercise.notes}
                          </div>
                        )}

                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {exercise.plannedSets.map(set => (
                            <div
                              key={set.id}
                              className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex flex-col items-center"
                            >
                              <span className="text-xs text-gray-400 mb-1">
                                Set {set.setNumber}
                              </span>
                              <span className="text-lg font-bold flex items-center justify-center">
                                <Repeat className="w-4 h-4 mr-1" />
                                {set.reps}
                              </span>
                              <div className="mt-1 flex items-center text-xs text-gray-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {formatRestTime(set.restTime)}
                              </div>
                            </div>
                          ))}
                        </div>

                        <Divider className="border-gray-700" />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
