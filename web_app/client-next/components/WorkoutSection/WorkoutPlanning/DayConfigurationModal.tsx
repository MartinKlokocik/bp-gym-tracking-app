'use client'

import { QueryResult, useMutation } from '@apollo/client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
import { User } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { PlanAndDaySelect } from './components/PlanAndDaySelect'

import { CREATE_CALENDAR_DAY } from '@/graphql/CalendarConsts'
import { GetCalendarDayByDateQueryVariables } from '@/graphql/types'
import { GetCalendarDayByDateQuery } from '@/graphql/types'
import { CalendarDayWithIdsType, calendarDaySchema } from '@/types/CalendarDay'
import { PlannedWorkoutDayWithIdType } from '@/types/WorkoutPlanning'
type DayConfigurationModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  user: User
  selectedDate: Date
  getCalendarDayByDateQuery: QueryResult<
    GetCalendarDayByDateQuery,
    GetCalendarDayByDateQueryVariables
  >
}

export const DayConfigurationModal = ({
  isOpen,
  onOpenChange,
  user,
  selectedDate,
  getCalendarDayByDateQuery,
}: DayConfigurationModalProps) => {
  const [
    createCalendarDay,
    {
      data: createCalendarDayData,
      loading: createCalendarDayLoading,
      error: createCalendarDayError,
    },
  ] = useMutation(CREATE_CALENDAR_DAY)

  const { refetch: refetchCalendarDay } = getCalendarDayByDateQuery

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

  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<
    PlannedWorkoutDayWithIdType | undefined
  >()

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

      await refetchCalendarDay()
      onOpenChange(false)
      reset()
    } catch (err) {
      console.error('Error with assigning workout day to calendar day: ', err)
      toast.error('Error with assigning workout day to calendar day.')
    }
  }

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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {onClose => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>Date Editor</ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-7">
                  <div className="flex flex-row gap-1">
                    <PlanAndDaySelect
                      selectedWorkoutDay={selectedWorkoutDay}
                      setSelectedWorkoutDay={setSelectedWorkoutDay}
                    />
                  </div>

                  {selectedWorkoutDay && (
                    <div className="flex flex-col gap-3">
                      {/* TODO: Add the day exercise cards */}
                      {/* <DayExerciseCards
                        selectedDay={selectedWorkoutDay}
                        setSelectedWorkoutDay={setSelectedWorkoutDay}
                      /> */}

                      <Button
                        color="danger"
                        onPress={onClose}
                        startContent={<Trash2 size={16} />}
                      >
                        Remove all records for this day
                      </Button>
                    </div>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    reset()
                    onClose()
                  }}
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  {createCalendarDayLoading ? 'Adding...' : 'Add to this day'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
