'use client'

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
} from '@heroui/react'
import React, { useState } from 'react'
import { dummyPlannedWorkouts } from '../DummyData'
import { EditIcon, PlusIcon, Trash } from 'lucide-react'
import { PlanCreatorModal } from './PlanCreatorModal'
import { getActiveWorkoutPlan } from '../utils'
import { ExerciseCreatorModal } from './ExerciseCreatorModal'

type PlanConfigurationModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const PlanConfigurationModal = ({
  isOpen,
  onOpenChange,
}: PlanConfigurationModalProps) => {
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
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(
    getActiveWorkoutPlan()?.id || ''
  )

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
                      selectedKeys={[selectedWorkoutPlan]}
                      onChange={e => setSelectedWorkoutPlan(e.target.value)}
                    >
                      {dummyPlannedWorkouts.map(plannedWorkout => (
                        <SelectItem
                          key={plannedWorkout.id}
                          value={plannedWorkout.id}
                        >
                          {plannedWorkout.name}
                        </SelectItem>
                      ))}
                    </Select>

                    <Link
                      onPress={() => {}}
                      className="text-sm ml-1 cursor-pointer"
                    >
                      Detail view
                    </Link>
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row justify-start gap-3 w-full flex-wrap">
                      <Button
                        color="primary"
                        size="md"
                        variant="flat"
                        onPress={() => {}}
                        startContent={<EditIcon size={14} />}
                      >
                        Edit this plan
                      </Button>

                      <Button
                        color="danger"
                        size="md"
                        variant="flat"
                        onPress={() => {}}
                        startContent={<Trash size={14} />}
                      >
                        Delete this plan
                      </Button>
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
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Set workout as active
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <PlanCreatorModal
        isOpen={isPlanCreatorModalOpen}
        onOpenChange={onPlanCreatorModalOpenChange}
      />

      <ExerciseCreatorModal
        isOpen={isExerciseCreatorModalOpen}
        onOpenChange={onExerciseCreatorModalOpenChange}
      />
    </>
  )
}
