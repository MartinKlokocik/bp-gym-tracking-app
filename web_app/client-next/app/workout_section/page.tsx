'use client'

import { useState } from 'react'
import WorkoutOverviewComponent from '@/components/WorkoutSection/WorkoutOverview/WorkoutOverviewComponent'
import PlanWorkoutComponent from '@/components/WorkoutSection/WorkoutPlanning/PlanWorkoutComponent'
import { Button, ButtonGroup } from '@heroui/react'
export default function Home() {
  const [overview, setOverview] = useState(true)

  return (
    <>
      <div className="flex w-full items-center justify-center mt-5">
        <ButtonGroup>
          <Button
            variant="bordered"
            className={` ${
              !overview ? 'bg-white text-black' : 'bg-black text-white'
            }`}
            onPress={() => setOverview(true)}
          >
            My progress overview
          </Button>
          <Button
            variant="bordered"
            className={` ${
              overview ? 'bg-white text-black' : 'bg-black text-white'
            }`}
            onPress={() => setOverview(false)}
          >
            Plan editor
          </Button>
        </ButtonGroup>
      </div>
      <div>
        {overview ? <WorkoutOverviewComponent /> : <PlanWorkoutComponent />}
      </div>
    </>
  )
}
