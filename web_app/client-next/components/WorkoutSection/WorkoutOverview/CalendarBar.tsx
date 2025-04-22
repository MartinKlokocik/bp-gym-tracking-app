'use client'
import { addDays, format, subDays } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useGetDateFromUrl } from '@/CustomHooks/DateHooks'
type CalendarBarProps = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export const CalendarBar = ({
  selectedDate,
  setSelectedDate,
}: CalendarBarProps) => {
  const [startDate, setStartDate] = useState(useGetDateFromUrl())
  const searchParams = useSearchParams()
  const router = useRouter()
  const [visibleDays, setVisibleDays] = useState(7)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setVisibleDays(5)
      } else {
        setVisibleDays(7)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrevWeek = () => {
    setStartDate(subDays(startDate, 7))
  }

  const handleNextWeek = () => {
    setStartDate(addDays(startDate, 7))
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    const date = params.get('date')
    if (date) {
      setSelectedDate(new Date(date))
    }
  }, [searchParams, setSelectedDate])

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    if (selectedDate) {
      params.set('date', format(selectedDate, 'yyyy-MM-dd'))
      router.push(`?${params.toString()}`)
    }
  }, [selectedDate, searchParams, router])

  return (
    <div className="flex items-center justify-between gap-2 bg-black p-3 sm:p-4 rounded-lg">
      <button className="text-white p-1 sm:p-2" onClick={handlePrevWeek}>
        <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
      </button>
      <div className="flex items-center justify-center py-2 w-full">
        {[...Array(visibleDays)].map((_, i) => {
          const date = addDays(startDate, i)

          return (
            <div key={i} className="flex flex-row items-center">
              <button
                className={`px-2 sm:px-3 md:px-4 py-1
                ${
                  format(date, 'yyyy-MM-dd') ===
                  format(selectedDate, 'yyyy-MM-dd')
                    ? 'bg-white text-black font-bold'
                    : 'text-white hover:bg-gray-700'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="text-xs sm:text-sm">{format(date, 'EEE')}</div>
                <div className="text-xs sm:text-base font-semibold">
                  {format(date, 'd.M')}
                  <span className="hidden md:inline">
                    .{format(date, 'yyyy')}
                  </span>
                </div>
              </button>
              {i !== visibleDays - 1 && (
                <div className="text-white w-px h-7 sm:h-9 bg-white mx-1" />
              )}
            </div>
          )
        })}
      </div>
      <button className="text-white p-1 sm:p-2" onClick={handleNextWeek}>
        <ChevronRight size={24} className="sm:w-8 sm:h-8" />
      </button>
    </div>
  )
}
