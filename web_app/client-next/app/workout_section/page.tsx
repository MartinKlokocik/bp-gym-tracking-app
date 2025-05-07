'use client'

import { useQuery } from '@apollo/client'
import { Button, ButtonGroup, useDisclosure } from '@heroui/react'
import { useSession } from 'next-auth/react'
import { Suspense, useState } from 'react'

import { CalendarBar } from '@/components/WorkoutSection/WorkoutOverview/CalendarBar'
import { WorkoutTab } from '@/components/WorkoutSection/WorkoutOverview/WorkoutTab'
import { DayConfigurationModal } from '@/components/WorkoutSection/WorkoutPlanning/DayConfigurationModal'
import { PlanConfigurationModal } from '@/components/WorkoutSection/WorkoutPlanning/PlanConfigurationModal'
import { useGetDateFromUrl } from '@/CustomHooks/DateHooks'
import { GET_CALENDAR_DAY_BY_DATE } from '@/graphql/CalendarConsts'
import { GetCalendarDayByDateQuery } from '@/graphql/types'
import { GetCalendarDayByDateQueryVariables } from '@/graphql/types'

function WorkoutSection() {
  const { data: session } = useSession()

  const currentDate = useGetDateFromUrl()
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const getCalendarDayByDateQuery = useQuery<
    GetCalendarDayByDateQuery,
    GetCalendarDayByDateQueryVariables
  >(GET_CALENDAR_DAY_BY_DATE, {
    variables: {
      date: selectedDate.toISOString(),
      userId: session?.user.id || '',
    },
  })

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

        <WorkoutTab
          user={session.user}
          selectedDate={selectedDate}
          getCalendarDayByDateQuery={getCalendarDayByDateQuery}
        />
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
        getCalendarDayByDateQuery={getCalendarDayByDateQuery}
      />
    </>
  )
}

function WorkoutSectionFallback() {
  return <div>Loading workout section...</div>
}

export default function Home() {
  return (
    <Suspense fallback={<WorkoutSectionFallback />}>
      <WorkoutSection />
    </Suspense>
  )
}
