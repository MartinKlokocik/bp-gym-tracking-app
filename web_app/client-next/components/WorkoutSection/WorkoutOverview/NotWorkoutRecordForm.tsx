import { useMutation } from '@apollo/client'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { PlanAndDaySelect } from '../WorkoutPlanning/components/PlanAndDaySelect'

import { CREATE_CALENDAR_DAY } from '@/graphql/CalendarConsts'
import { CalendarDayWithIdsType, calendarDaySchema } from '@/types/CalendarDay'
import { PlannedWorkoutDayWithIdType } from '@/types/WorkoutPlanning'
type NotWorkoutRecordFormProps = {
  user: User
  selectedDate: Date
  refetchDayFunction: () => Promise<void>
}

export const NotWorkoutRecordForm = ({
  user,
  selectedDate,
  refetchDayFunction,
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
    PlannedWorkoutDayWithIdType | undefined
  >()

  const formMethods = useForm<CalendarDayWithIdsType>({
    resolver: zodResolver(calendarDaySchema),
    defaultValues: {
      userId: user.id,
      date: selectedDate.toISOString(),
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
      setValue('plannedWorkoutDay', selectedWorkoutDay)
    }
  }, [selectedWorkoutDay, setValue])

  useEffect(() => {
    setValue('date', selectedDate.toISOString())
  }, [selectedDate, setValue])

  const onSubmit = async (formData: CalendarDayWithIdsType) => {
    console.log(formData)

    try {
      await createCalendarDay({
        variables: {
          input: {
            userId: formData.userId,
            date: formData.date,
            plannedWorkoutDay: {
              id: formData.plannedWorkoutDay.id,
              userId: formData.plannedWorkoutDay.userId,
              name: formData.plannedWorkoutDay.name,
              plannedExercises: formData.plannedWorkoutDay.plannedExercises.map(
                plannedExercise => ({
                  id: plannedExercise.id,
                  userId: plannedExercise.userId,
                  exerciseId: plannedExercise.exercise.id,
                  exerciseNumber: plannedExercise.exerciseNumber,
                  plannedSets: plannedExercise.plannedSets.map(set => ({
                    id: set.id,
                    reps: set.reps,
                    restTime: set.restTime ?? null,
                    setNumber: set.setNumber,
                  })),
                })
              ),
            },
          },
        },
      })

      reset()
      refetchDayFunction()
    } catch (err) {
      console.error('Error with assigning workout day to calendar day: ', err)
      toast.error('Error with assigning workout day to calendar day.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <p>There are not workout records for this day.</p>
      <form
        className="flex flex-col gap-4 w-full md:w-3/4 lg:w-1/2 h-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PlanAndDaySelect
          selectedWorkoutDay={selectedWorkoutDay}
          setSelectedWorkoutDay={setSelectedWorkoutDay}
          userId={user.id}
        />

        {selectedWorkoutDay && (
          <div className="flex flex-col gap-4 w-full h-full items-center md:items-end justify-center">
            <Button
              color="primary"
              variant="solid"
              type="submit"
              className="w-full md:w-auto py-2"
            >
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
