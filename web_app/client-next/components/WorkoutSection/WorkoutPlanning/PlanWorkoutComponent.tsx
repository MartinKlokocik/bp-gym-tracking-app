'use client'

import { useState } from 'react'
import ExerciseCreator from './ExerciseCreator'
import PlanCreator from './PlanCreator'
import { Button, ButtonGroup } from '@heroui/react'

export default function PlanWorkoutComponent() {
  const [activeView, setActiveView] = useState('WorkoutCreator')

  return (
    <>
      <ButtonGroup className='ml-2'>
        <Button
          variant="bordered"
          className={` ${
            activeView === 'ExerciseCreator'
              ? 'bg-white text-black'
              : 'bg-black text-white'
          }`}
          onClick={() => setActiveView('ExerciseCreator')}
        >
          Create Exercise
        </Button>
        <Button
          variant="bordered"
          className={` ${
            activeView === 'PlanCreator'
              ? 'bg-white text-black'
              : 'bg-black text-white'
          }`}
          onClick={() => setActiveView('PlanCreator')}
        >
          Create Plan
        </Button>
      </ButtonGroup>

      <div>
        {activeView == 'ExerciseCreator' && <ExerciseCreator></ExerciseCreator>}
        {activeView == 'PlanCreator' && <PlanCreator></PlanCreator>}
      </div>
    </>
  )
}
