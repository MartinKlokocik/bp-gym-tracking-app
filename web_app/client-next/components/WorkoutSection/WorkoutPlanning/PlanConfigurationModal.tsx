'use client'

import { useMutation, useQuery } from '@apollo/client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Link,
  useDisclosure,
  Spinner,
} from '@heroui/react'
import { EditIcon, PlusIcon, Trash } from 'lucide-react'
import { User } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { getActiveWorkoutPlan } from '../utils'

import { ExerciseCreatorModal } from './ExerciseCreatorModal'
import { PlanCreatorModal } from './PlanCreatorModal'
import { WorkoutDetailViewModal } from './WorkoutDetailViewModal'

import {
  DELETE_PLANNED_WORKOUT,
  GET_ALL_PLANNED_WORKOUTS,
} from '@/graphql/PlannedWorkoutConsts'
import { PlannedWorkoutWithIdsType } from '@/types/WorkoutPlanning'

type PlanConfigurationModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  user: User
}

export const PlanConfigurationModal = ({
  isOpen,
  onOpenChange,
  user,
}: PlanConfigurationModalProps) => {
  const {
    data: allPlannedWorkoutsData,
    loading: allPlannedWorkoutsLoading,
    error: allPlannedWorkoutsError,
    refetch: refetchPlannedWorkouts,
  } = useQuery(GET_ALL_PLANNED_WORKOUTS)

  const [deletePlannedWorkout, { loading: deletePlannedWorkoutLoading }] =
    useMutation(DELETE_PLANNED_WORKOUT)

  const {
    isOpen: isPlanCreatorModalOpen,
    onOpen: onPlanCreatorModalOpen,
    onOpenChange: onPlanCreatorModalOpenChange,
  } = useDisclosure()
  const {
    isOpen: isExerciseCreatorModalOpen,
    onOpen: onExerciseCreatorModalOpen,
    onOpenChange: onExerciseCreatorModalOpenChange,
  } = useDisclosure()
  const {
    isOpen: isWorkoutDetailViewModalOpen,
    onOpen: onWorkoutDetailViewModalOpen,
    onOpenChange: onWorkoutDetailViewModalOpenChange,
  } = useDisclosure()

  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<string>('')

  useEffect(() => {
    if (allPlannedWorkoutsError) {
      console.error(
        'Error fetching planned workouts: ',
        allPlannedWorkoutsError
      )
      toast.error('Error fetching planned workouts.')
    }
  }, [allPlannedWorkoutsError])

  useEffect(() => {
    if (allPlannedWorkoutsData) {
      setSelectedWorkoutPlan(
        getActiveWorkoutPlan(allPlannedWorkoutsData.getAllPlannedWorkouts)
          ?.id || ''
      )
    }
  }, [allPlannedWorkoutsData])

  const handleDeletePlannedWorkout = async () => {
    if (!selectedWorkoutPlan) {
      return
    }

    try {
      await deletePlannedWorkout({ variables: { id: selectedWorkoutPlan } })
      toast.success('Workout plan deleted successfully')
      refetchPlannedWorkouts()
    } catch (error) {
      console.error('Error deleting workout plan: ', error)
      toast.error('Error deleting workout plan')
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Plan Editor
              </ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <Select
                      label="Select a workout plan"
                      placeholder="Select a workout plan"
                      variant="bordered"
                      selectedKeys={[selectedWorkoutPlan || '']}
                      onChange={e => {
                        setSelectedWorkoutPlan(e.target.value)
                      }}
                    >
                      {allPlannedWorkoutsLoading ? (
                        <SelectItem>Loading...</SelectItem>
                      ) : (
                        allPlannedWorkoutsData?.getAllPlannedWorkouts.map(
                          (plannedWorkout: PlannedWorkoutWithIdsType) => (
                            <SelectItem
                              key={plannedWorkout.id}
                              value={plannedWorkout.id}
                            >
                              {plannedWorkout.name}
                            </SelectItem>
                          )
                        )
                      )}
                    </Select>

                    {selectedWorkoutPlan && (
                      <Link
                        onPress={() => {
                          onWorkoutDetailViewModalOpen()
                        }}
                        className="text-md ml-1 cursor-pointer"
                      >
                        Detail view
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-row justify-start gap-3 w-full flex-wrap">
                    <Button
                      color="primary"
                      size="md"
                      variant="flat"
                      onPress={onPlanCreatorModalOpen}
                      startContent={<PlusIcon size={14} />}
                    >
                      Create new plan
                    </Button>

                    <Button
                      color="primary"
                      size="md"
                      variant="flat"
                      onPress={onExerciseCreatorModalOpen}
                      startContent={<PlusIcon size={14} />}
                    >
                      Create new exercise
                    </Button>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  size="md"
                  variant="flat"
                  onPress={handleDeletePlannedWorkout}
                  startContent={<Trash size={14} />}
                  disabled={!selectedWorkoutPlan}
                >
                  {deletePlannedWorkoutLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    'Delete this plan'
                  )}
                </Button>
                <Button
                  color="primary"
                  size="md"
                  variant="flat"
                  onPress={() => {}}
                  startContent={<EditIcon size={14} />}
                  disabled={!selectedWorkoutPlan}
                >
                  Edit this plan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <PlanCreatorModal
        isOpen={isPlanCreatorModalOpen}
        onOpenChange={onPlanCreatorModalOpenChange}
        user={user}
        refetchPlannedWorkouts={refetchPlannedWorkouts}
      />

      <ExerciseCreatorModal
        isOpen={isExerciseCreatorModalOpen}
        onOpenChange={onExerciseCreatorModalOpenChange}
      />

      <WorkoutDetailViewModal
        isOpen={isWorkoutDetailViewModalOpen}
        onOpenChange={onWorkoutDetailViewModalOpenChange}
        selectedWorkoutPlanId={selectedWorkoutPlan}
      />
    </>
  )
}
