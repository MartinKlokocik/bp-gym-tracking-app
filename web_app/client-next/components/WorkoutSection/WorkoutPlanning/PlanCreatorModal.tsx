'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  Checkbox,
} from '@heroui/react'
import { ChevronRight, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { PlannedWorkoutDay } from '../types'
import { DayExerciseCards } from './components/DayExerciseCards'
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
  const [isPublic, setIsPublic] = useState(true)
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
                <div className="space-y-3">
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
                  <Checkbox
                    defaultSelected={true}
                    color="primary"
                    size="md"
                    checked={isPublic}
                    onChange={e => setIsPublic(e.target.checked)}
                  >
                    Do you want the plan to be public?
                  </Checkbox>
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
                      <DayExerciseCards
                        selectedDay={selectedDay}
                        setPlannedWorkoutDays={setPlannedWorkoutDays}
                      />
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
