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
    <div className="flex items-center justify-between gap-2 bg-black p-4 rounded-lg">
      <button className="text-white p-2" onClick={handlePrevWeek}>
        <ChevronLeft size={32} />
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
        <ChevronRight size={32} />
      </button>
    </div>
  )
}
