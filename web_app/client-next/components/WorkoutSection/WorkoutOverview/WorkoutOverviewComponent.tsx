'use client'

import { useState } from 'react'
import { CalendarBar } from './CalendarBar'
import { WorkoutTab } from './WorkoutTab'
export default function WorkoutOverviewComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  return (
    <div className="flex flex-col h-full w-full items-center justify-center mt-5">
      <CalendarBar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <WorkoutTab selectedDate={selectedDate} />
    </div>
  )
}
