'use client'

import { Button, ButtonGroup, useDisclosure } from '@heroui/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { CalendarBar } from '@/components/WorkoutSection/WorkoutOverview/CalendarBar'
import { WorkoutTab } from '@/components/WorkoutSection/WorkoutOverview/WorkoutTab'
import { DayConfigurationModal } from '@/components/WorkoutSection/WorkoutPlanning/DayConfigurationModal'
import { PlanConfigurationModal } from '@/components/WorkoutSection/WorkoutPlanning/PlanConfigurationModal'
export default function Home() {
  const { data: session } = useSession()

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

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex flex-col h-full w-full items-center justify-center mt-5">
        <CalendarBar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="flex w-full items-center justify-center">
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

        <WorkoutTab user={session.user} selectedDate={selectedDate} />
      </div>

      <PlanConfigurationModal
        user={session.user}
        isOpen={isPlanConfigurationOpen}
        onOpenChange={onPlanConfigurationOpenChange}
      />
      <DayConfigurationModal
        user={session.user}
        selectedDate={selectedDate}
        isOpen={isDayConfigurationOpen}
        onOpenChange={onDayConfigurationOpenChange}
      />
    </>
  )
}
