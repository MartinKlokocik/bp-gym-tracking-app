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
} from '@heroui/react'
import React, { useState } from 'react'
import { dummyPlannedWorkouts } from '../DummyData'
import {
  getActiveWorkoutPlan,
  getWorkoutDayById,
  getWorkoutPlanById,
} from '../utils'
import { PlannedWorkout, PlannedWorkoutDay } from '../types'
import { DayExerciseCards } from './components/DayExerciseCards'
import { Trash2 } from 'lucide-react'
type DayConfigurationModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const DayConfigurationModal = ({
  isOpen,
  onOpenChange,
}: DayConfigurationModalProps) => {
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<
    PlannedWorkout | undefined
  >(getActiveWorkoutPlan())

  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<
    PlannedWorkoutDay | undefined
  >(selectedWorkoutPlan?.days[0])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>Plan Editor</ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-7">
                  <div className="flex flex-row gap-1">
                    <Select
                      label="Select a workout plan"
                      placeholder="Select a workout plan"
                      variant="bordered"
                      selectedKeys={[selectedWorkoutPlan?.id || '']}
                      onChange={e => {
                        setSelectedWorkoutPlan(
                          getWorkoutPlanById(e.target.value)
                        )
                        setSelectedWorkoutDay(getWorkoutDayById(e.target.value))
                      }}
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

                    {selectedWorkoutPlan && (
                      <Select
                        label="Select a workout day"
                        placeholder="Select a workout day"
                        variant="bordered"
                        selectedKeys={[selectedWorkoutDay?.id || '']}
                        onChange={e =>
                          setSelectedWorkoutDay(
                            getWorkoutDayById(e.target.value)
                          )
                        }
                      >
                        {selectedWorkoutPlan.days.map(plannedWorkoutDay => (
                          <SelectItem
                            key={plannedWorkoutDay.id}
                            value={plannedWorkoutDay.id}
                          >
                            {plannedWorkoutDay.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  </div>

                  {selectedWorkoutDay && (
                    <div className="flex flex-col gap-3">
                      <DayExerciseCards
                        selectedDay={selectedWorkoutDay}
                        setSelectedWorkoutDay={setSelectedWorkoutDay}
                      />

                      <Button
                        color="danger"
                        onPress={onClose}
                        startContent={<Trash2 size={16} />}
                      >
                        Remove all records for this day
                      </Button>
                    </div>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add to this day
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
