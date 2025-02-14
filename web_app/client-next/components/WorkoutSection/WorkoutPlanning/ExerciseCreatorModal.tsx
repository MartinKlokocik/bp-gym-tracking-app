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
} from '@heroui/react'
import { Dumbbell, Camera, Clock } from 'lucide-react'
import React, { useState } from 'react'
import { muscleGroups } from '../DummyData'

type ExerciseCreatorModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const ExerciseCreatorModal = ({
  isOpen,
  onOpenChange,
}: ExerciseCreatorModalProps) => {
  const [exerciseType, setExerciseType] = useState('strength')

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Exercise
              </ModalHeader>

              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Exercise Type Selector */}
                    <div className="mb-6">
                      <p className="text-sm text-default-500 mb-2">
                        Exercise Type
                      </p>
                      <div className="flex gap-2">
                        <Button
                          color={
                            exerciseType === 'strength' ? 'primary' : 'default'
                          }
                          variant={
                            exerciseType === 'strength' ? 'solid' : 'flat'
                          }
                          startContent={<Dumbbell size={18} />}
                          onPress={() => setExerciseType('strength')}
                        >
                          Strength
                        </Button>
                        <Button
                          color={
                            exerciseType === 'cardio' ? 'primary' : 'default'
                          }
                          variant={exerciseType === 'cardio' ? 'solid' : 'flat'}
                          startContent={<Clock size={18} />}
                          onPress={() => setExerciseType('cardio')}
                        >
                          Cardio
                        </Button>
                      </div>
                    </div>

                    <Input
                      label="Exercise Name"
                      placeholder="e.g., Barbell Squat"
                      variant="bordered"
                    />

                    <Select
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

                    {/* Set Configuration */}
                    <div className="space-y-4">
                      <p className="text-medium font-medium">
                        Default Set Configuration
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="number"
                          label="Sets"
                          placeholder="3"
                          variant="bordered"
                        />
                        <Input
                          type="number"
                          label="Reps"
                          placeholder="12"
                          variant="bordered"
                        />
                        <Input
                          type="number"
                          label="Rest (seconds)"
                          placeholder="60"
                          variant="bordered"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Media Upload */}
                    <div className="space-y-2">
                      <p className="text-medium font-medium">Exercise Media</p>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
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
                          <Button color="primary" variant="flat" size="sm">
                            Upload Media
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <p className="text-medium font-medium">Notes</p>
                      <textarea
                        className="w-full h-32 rounded-lg bg-default-100 border-2 border-default-200 p-3 text-sm"
                        placeholder="Add form tips, variations, or other notes..."
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create Exercise
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
