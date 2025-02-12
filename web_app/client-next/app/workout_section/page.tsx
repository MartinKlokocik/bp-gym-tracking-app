'use client'

import { useState } from 'react'
import WorkoutOverviewComponent from '@/components/WorkoutSection/WorkoutOverview/WorkoutOverviewComponent'
import PlanWorkoutComponent from '@/components/WorkoutSection/WorkoutPlanning/PlanWorkoutComponent'
import { Button, ButtonGroup } from '@heroui/react'
export default function Home() {
  const [overview, setOverview] = useState(true)

  return (
    <div>
      <ButtonGroup className="m-2">
        <Button
          variant="bordered"
          className={` ${
            !overview ? 'bg-white text-black' : 'bg-black text-white'
          }`}
          onClick={() => setOverview(true)}
        >
          My progress overview
        </Button>
        <Button
          variant="bordered"
          className={` ${
            overview ? 'bg-white text-black' : 'bg-black text-white'
          }`}
          onClick={() => setOverview(false)}
        >
          Plan editor
        </Button>
      </ButtonGroup>
      <div>
        {overview ? <WorkoutOverviewComponent /> : <PlanWorkoutComponent />}
      </div>
    </div>
  )
}
