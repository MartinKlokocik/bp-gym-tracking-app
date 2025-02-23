'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { PlannedWorkoutDay } from '../types'
import { Trash2 } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDay, calendarDaySchema } from '@/types/CalendarDay'
import { User } from 'next-auth'
import { CREATE_CALENDAR_DAY } from '@/graphql/CalendarConsts'
import { PlanAndDaySelect } from './components/PlanAndDaySelect'

type DayConfigurationModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  user: User
  selectedDate: Date
}

export const DayConfigurationModal = ({
  isOpen,
  onOpenChange,
  user,
  selectedDate,
}: DayConfigurationModalProps) => {
  const [
    createCalendarDay,
    {
      data: createCalendarDayData,
      loading: createCalendarDayLoading,
      error: createCalendarDayError,
    },
  ] = useMutation(CREATE_CALENDAR_DAY)

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

  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<
    PlannedWorkoutDay | undefined
  >()

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
      setValue('plannedWorkoutDayId', selectedWorkoutDay.id)
    }
  }, [selectedWorkoutDay])

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
              <ModalHeader>Plan Editor</ModalHeader>

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
