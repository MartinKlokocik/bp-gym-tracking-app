'use client'

import { Button, ButtonGroup, useDisclosure } from '@heroui/react'
import { PlanCreatorModal } from './PlanCreatorModal'
import { Plus } from 'lucide-react'
import { ExerciseCreatorModal } from './ExerciseCreatorModal'

export default function PlanWorkoutComponent() {
  const {
    isOpen: isExerciseCreatorOpen,
    onOpen: onExerciseCreatorOpen,
    onOpenChange: onExerciseCreatorOpenChange,
  } = useDisclosure()
  const {
    isOpen: isPlanCreatorOpen,
    onOpen: onPlanCreatorOpen,
    onOpenChange: onPlanCreatorOpenChange,
  } = useDisclosure()

  return (
    <>
      <ButtonGroup className="ml-2">
        <Button
          variant="bordered"
          className={'bg-white text-black'}
          onPress={onExerciseCreatorOpen}
          startContent={<Plus size={16} />}
        >
          Add Exercise
        </Button>
        <Button
          variant="bordered"
          className={'bg-white text-black'}
          onPress={onPlanCreatorOpen}
          startContent={<Plus size={16} />}
        >
          Add Plan
        </Button>
      </ButtonGroup>

      <PlanCreatorModal
        isOpen={isPlanCreatorOpen}
        onOpenChange={onPlanCreatorOpenChange}
      />
      <ExerciseCreatorModal
        isOpen={isExerciseCreatorOpen}
        onOpenChange={onExerciseCreatorOpenChange}
      />
    </>
  )
}
