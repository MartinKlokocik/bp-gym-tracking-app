'use client'

import { CalendarBar } from '@/components/WorkoutSection/WorkoutOverview/CalendarBar'
import { WorkoutTab } from '@/components/WorkoutSection/WorkoutOverview/WorkoutTab'
import { PlanConfigurationModal } from '@/components/WorkoutSection/WorkoutPlanning/PlanConfigurationModal'
import { DayConfigurationModal } from '@/components/WorkoutSection/WorkoutPlanning/DayConfigurationModal'
import { Button, ButtonGroup, useDisclosure } from '@heroui/react'
import { useState } from 'react'
export default function Home() {
  const {
    isOpen: isPlanConfigurationOpen,
    onOpen: onPlanConfigurationOpen,
    onOpenChange: onPlanConfigurationOpenChange,
  } = useDisclosure()
  const {
    isOpen: isDayConfigurationOpen,
    onOpen: onDayConfigurationOpen,
    onOpenChange: onDayConfigurationOpenChange,
  } = useDisclosure()
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <>
      <div className="flex w-full items-center justify-center mt-5">
        <ButtonGroup>
          <Button
            variant="bordered"
            className="bg-white text-black"
            onPress={onDayConfigurationOpen}
          >
            Modify this day
          </Button>
          <Button
            variant="bordered"
            className="bg-black text-white"
            onPress={onPlanConfigurationOpen}
          >
            Workout plan configuration
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-col h-full w-full items-center justify-center mt-5">
        <CalendarBar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <WorkoutTab selectedDate={selectedDate} />
      </div>

      <PlanConfigurationModal
        isOpen={isPlanConfigurationOpen}
        onOpenChange={onPlanConfigurationOpenChange}
      />
      <DayConfigurationModal
        isOpen={isDayConfigurationOpen}
        onOpenChange={onDayConfigurationOpenChange}
      />
    </>
  )
}
