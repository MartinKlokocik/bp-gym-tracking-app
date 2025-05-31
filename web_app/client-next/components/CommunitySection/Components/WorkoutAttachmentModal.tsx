import { useQuery } from '@apollo/client'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Button,
  useDisclosure,
} from '@heroui/react'
import { Modal } from '@heroui/react'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { WorkoutDetailViewModal } from '../../WorkoutSection/WorkoutPlanning/WorkoutDetailViewModal'

import { GET_ALL_PLANNED_WORKOUTS } from '@/graphql/PlannedWorkoutConsts'
import { NewPost as NewPostType } from '@/types/CommunitySection'
import { PlannedWorkoutWithIdsType } from '@/types/WorkoutPlanning'
type WorkoutAttachmentModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  user: User
  setValue: UseFormSetValue<NewPostType>
  watch: UseFormWatch<NewPostType>
}

export default function WorkoutAttachmentModal({
  isOpen,
  onOpenChange,
  user,
  setValue,
  watch,
}: WorkoutAttachmentModalProps) {
  const {
    data: allPlannedWorkoutsData,
    loading: allPlannedWorkoutsLoading,
    error: allPlannedWorkoutsError,
  } = useQuery(GET_ALL_PLANNED_WORKOUTS, {
    variables: {
      userId: user.id,
    },
    skip: !user.id,
  })
  const {
    isOpen: isDetailedWorkoutPlanOpen,
    onOpenChange: setIsDetailedWorkoutPlanOpen,
  } = useDisclosure()

  const [selectedWorkoutPlan, setSelectedWorkoutPlan] =
    useState<PlannedWorkoutWithIdsType>()
  const [attachedWorkoutPlan, setAttachedWorkoutPlan] =
    useState<PlannedWorkoutWithIdsType>()

  const attachedWorkoutPlanIdWatcher = watch('attachedWorkoutPlan')

  useEffect(() => {
    if (allPlannedWorkoutsError) {
      toast.error('Error fetching planned workouts')
    }
  }, [allPlannedWorkoutsError])

  useEffect(() => {
    console.log('attachedWorkoutPlan', attachedWorkoutPlan)
  }, [attachedWorkoutPlan])

  useEffect(() => {
    const workoutPlan = allPlannedWorkoutsData?.getAllPlannedWorkouts.find(
      (workout: PlannedWorkoutWithIdsType) =>
        workout.id === attachedWorkoutPlanIdWatcher
    )
    setSelectedWorkoutPlan(workoutPlan)
    setAttachedWorkoutPlan(workoutPlan)
  }, [attachedWorkoutPlanIdWatcher])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="h-auto overflow-y-auto"
        scrollBehavior="inside"
      >
        <ModalContent className="pb-6">
          <ModalHeader className="flex flex-col gap-1">
            Workout Attachment
          </ModalHeader>
          <ModalBody>
            <Select
              label="Select a workout plan"
              placeholder="Select a workout plan"
              variant="bordered"
              selectedKeys={[selectedWorkoutPlan?.id || '']}
              onChange={e => {
                setSelectedWorkoutPlan(
                  allPlannedWorkoutsData?.getAllPlannedWorkouts.find(
                    (workout: PlannedWorkoutWithIdsType) =>
                      workout.id === e.target.value
                  )
                )
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
            {attachedWorkoutPlan && (
              <div className="flex flex-col gap-2">
                <h1>Attached Workout Plan: {attachedWorkoutPlan.name}</h1>
                <p
                  className="cursor-pointer text-blue-500"
                  onClick={setIsDetailedWorkoutPlanOpen}
                >
                  Detailed view
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {attachedWorkoutPlan && (
              <Button
                color="danger"
                className="cursor-pointer"
                onClick={e => {
                  setValue('attachedWorkoutPlan', '')
                  setAttachedWorkoutPlan(undefined)
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                Detach
              </Button>
            )}
            <Button
              color="primary"
              className="cursor-pointer"
              onClick={e => {
                setValue('attachedWorkoutPlan', selectedWorkoutPlan?.id)
                setAttachedWorkoutPlan(selectedWorkoutPlan)
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              Attach
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <WorkoutDetailViewModal
        isOpen={isDetailedWorkoutPlanOpen}
        onOpenChange={setIsDetailedWorkoutPlanOpen}
        selectedWorkoutPlanId={attachedWorkoutPlan?.id || ''}
        isPreview={true}
      />
    </>
  )
}
