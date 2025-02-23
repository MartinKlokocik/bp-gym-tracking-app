import { useMutation } from '@apollo/client'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { PlannedWorkoutDay } from '../types'
import { PlanAndDaySelect } from '../WorkoutPlanning/components/PlanAndDaySelect'

import { CREATE_CALENDAR_DAY } from '@/graphql/CalendarConsts'
import { calendarDaySchema } from '@/types/CalendarDay'
import { CalendarDay } from '@/types/CalendarDay'

type NotWorkoutRecordFormProps = {
  user: User
  selectedDate: Date
}

export const NotWorkoutRecordForm = ({
  user,
  selectedDate,
}: NotWorkoutRecordFormProps) => {
  const [
    createCalendarDay,
    {
      data: createCalendarDayData,
      loading: createCalendarDayLoading,
      error: createCalendarDayError,
    },
  ] = useMutation(CREATE_CALENDAR_DAY)

  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<
    PlannedWorkoutDay | undefined
  >()

  const formMethods = useForm<CalendarDay>({
    resolver: zodResolver(calendarDaySchema),
    defaultValues: {
      userId: user.id,
      date: selectedDate.toISOString(),
      plannedWorkoutDayId: '',
    },
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = formMethods

  useEffect(() => {
    if (createCalendarDayData) {
      toast.success('Workout day assigned to calendar day successfully!')
    }
  }, [createCalendarDayData])

  useEffect(() => {
    if (createCalendarDayError) {
      toast.error('Error with assigning workout day to calendar day.')
    }
  }, [createCalendarDayError])

  useEffect(() => {
    if (errors) {
      console.log('Form errors: ', errors)
    }
  }, [errors])

  useEffect(() => {
    if (selectedWorkoutDay) {
      setValue('plannedWorkoutDayId', selectedWorkoutDay.id)
    }
  }, [selectedWorkoutDay, setValue])

  const onSubmit = async (formData: CalendarDay) => {
    console.log(formData)

    try {
      await createCalendarDay({
        variables: {
          input: {
            ...formData,
          },
        },
      })

      reset()
    } catch (err) {
      console.error('Error with assigning workout day to calendar day: ', err)
      toast.error('Error with assigning workout day to calendar day.')
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <p>There are not workout records for this day.</p>
      <form
        className="flex flex-col gap-4 w-1/2 h-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PlanAndDaySelect
          selectedWorkoutDay={selectedWorkoutDay}
          setSelectedWorkoutDay={setSelectedWorkoutDay}
        />

        {selectedWorkoutDay && (
          <div className="flex flex-col gap-4 w-full h-full items-end justify-center">
            <Button color="primary" variant="solid" type="submit">
              {createCalendarDayLoading
                ? 'Adding workout to this day...'
                : 'Add workout to this day'}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
