'use client'
import { addDays, format, subDays } from 'date-fns'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export const CalendarBar = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handlePrevWeek = () => {
    setStartDate(subDays(startDate, 7))
  }

  const handleNextWeek = () => {
    setStartDate(addDays(startDate, 7))
  }

  return (
    <div className="flex items-center justify-between gap-2 bg-black p-4 rounded-lg">
      <button className="text-white p-2" onClick={handlePrevWeek}>
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>
      <div className="flex items-center gap-2">
        {[...Array(7)].map((_, i) => {
          const date = addDays(startDate, i)

          return (
            <div key={i} className="flex flex-row items-center gap-2">
              <button
                key={i}
                className={`px-4 py-1
                ${
                  format(date, 'yyyy-MM-dd') ===
                  format(selectedDate, 'yyyy-MM-dd')
                    ? 'bg-white text-black font-bold'
                    : 'text-white hover:bg-gray-700'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="text-sm">{format(date, 'EEE')}</div>
                <div className="font-semibold">{format(date, 'd.M.yyyy')}</div>
              </button>
              {i !== 6 && <div className="text-white w-px h-9 bg-white" />}
            </div>
          )
        })}
      </div>
      <button className="text-white p-2" onClick={handleNextWeek}>
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  )
}
