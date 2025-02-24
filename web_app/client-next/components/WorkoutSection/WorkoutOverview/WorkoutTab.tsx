'use client'

import { QueryResult } from '@apollo/client'
import {
  Input,
  Image,
  Textarea,
  Accordion,
  AccordionItem,
  Checkbox,
} from '@heroui/react'
import { ChevronLeft, ChevronRight, StepBack } from 'lucide-react'
import { User } from 'next-auth'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { getLatestExerciseRecord } from '../utils'

import { GymProgressChart } from './GymProgressChart'
import { NotWorkoutRecordForm } from './NotWorkoutRecordForm'

import {
  GetCalendarDayByDateQuery,
  GetCalendarDayByDateQueryVariables,
} from '@/graphql/types'
import { PlannedExerciseWithIdsType } from '@/types/WorkoutPlanning'
type WorkoutTabProps = {
  selectedDate: Date
  user: User
  getCalendarDayByDateQuery: QueryResult<
    GetCalendarDayByDateQuery,
    GetCalendarDayByDateQueryVariables
  >
}
export const WorkoutTab = ({
  selectedDate,
  user,
  getCalendarDayByDateQuery,
}: WorkoutTabProps) => {
  const {
    data: calendarDayData,
    error: calendarDayError,
    loading: calendarDayLoading,
    refetch: refetchCalendarDay,
  } = getCalendarDayByDateQuery

  const [exerciseIndex, setExerciseIndex] = useState<number>(0)
  const [selectedPlannedExercise, setselectedPlannedExercise] =
    useState<PlannedExerciseWithIdsType | null>(
      calendarDayData?.getCalendarDayByDate?.plannedWorkoutDay
        .plannedExercises[0] ?? null
    )
  const [notes, setNotes] = useState(
    selectedPlannedExercise?.notes?.trim() ||
      'Put your notes for this exercise here'
  )
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [isSkipped, setIsSkipped] = useState<boolean>(false)

  const refetchDayFunction = useCallback(async () => {
    const { data } = await refetchCalendarDay()

    if (data && data.getCalendarDayByDate) {
      setselectedPlannedExercise(
        data.getCalendarDayByDate.plannedWorkoutDay.plannedExercises[0] ?? null
      )
    } else {
      setselectedPlannedExercise(null)
    }
  }, [refetchCalendarDay])

  useEffect(() => {
    refetchDayFunction()
  }, [calendarDayData, refetchCalendarDay, selectedDate, refetchDayFunction])

  useEffect(() => {
    if (calendarDayError) {
      toast.error(calendarDayError.message)
    }
  }, [calendarDayError])

  const handlePrevExercise = () => {
    if (exerciseIndex > 0) {
      const newIndex = exerciseIndex - 1
      setExerciseIndex(newIndex)
      setselectedPlannedExercise(
        calendarDayData?.getCalendarDayByDate.plannedWorkoutDay
          .plannedExercises[newIndex] ?? null
      )
    }
  }
  const handleNextExercise = () => {
    if (
      calendarDayData?.getCalendarDayByDate.plannedWorkoutDay
        .plannedExercises &&
      exerciseIndex <
        calendarDayData?.getCalendarDayByDate.plannedWorkoutDay.plannedExercises
          .length -
          1
    ) {
      const newIndex = exerciseIndex + 1
      setExerciseIndex(newIndex)
      setselectedPlannedExercise(
        calendarDayData?.getCalendarDayByDate.plannedWorkoutDay
          .plannedExercises[newIndex] ?? null
      )
    }
  }

  const isDisplaying = () => {
    if (!calendarDayData) {
      return false
    }
    if (
      !calendarDayData?.getCalendarDayByDate?.plannedWorkoutDay.plannedExercises
    ) {
      return false
    }
    if (
      calendarDayData?.getCalendarDayByDate.plannedWorkoutDay.plannedExercises
        .length === 0
    ) {
      return false
    }
    return true
  }

  const latestExerciseRecord = getLatestExerciseRecord(
    selectedPlannedExercise?.exercise ?? null
  )

  return (
    <div className="flex flex-row justify-center items-center w-[90%] h-full pb-10 mt-5">
      {calendarDayLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!isDisplaying() ? (
            <NotWorkoutRecordForm
              refetchDayFunction={refetchDayFunction}
              user={user}
              selectedDate={selectedDate}
            />
          ) : (
            <>
              <button
                className="text-white p-2"
                onClick={handlePrevExercise}
                disabled={exerciseIndex == 0}
              >
                <ChevronLeft
                  className={`text-white ${
                    exerciseIndex == 0 ? 'disabled-white-button' : ''
                  }`}
                  size={80}
                />
              </button>
              <div className="flex flex-col items-center w-full h-full gap-16 pl-5 pr-5 gap-4">
                <div className="flex w-full justify-end gap-10">
                  <div className="flex flex-row gap-4">
                    <Checkbox
                      value="1"
                      color="success"
                      size="lg"
                      isSelected={isCompleted}
                      onChange={() => {
                        setIsCompleted(prev => !prev)
                        setIsSkipped(false)
                      }}
                    >
                      Completed
                    </Checkbox>
                    <Checkbox
                      value="-1"
                      color="danger"
                      size="lg"
                      isSelected={isSkipped}
                      onChange={() => {
                        setIsSkipped(prev => !prev)
                        setIsCompleted(false)
                      }}
                    >
                      Skipped
                    </Checkbox>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start justify-start w-full h-full gap-8 mb-12">
                  <div className="flex flex-col gap-4 w-[40%]">
                    <h2 className="text-2xl font-semibold">
                      Exercise ({exerciseIndex + 1}/
                      {calendarDayData?.getCalendarDayByDate.plannedWorkoutDay
                        .plannedExercises?.length ?? 0}
                      ): {selectedPlannedExercise?.exercise.name}
                    </h2>
                    <Image
                      src={`/assets/DummyPictures/${selectedPlannedExercise?.exercise.image}`}
                      alt={selectedPlannedExercise?.exercise.name}
                      width={500}
                      height={400}
                      fallbackSrc="https://placehold.co/500x400"
                    />
                  </div>
                  <div className="flex flex-col items-start w-[60%]">
                    <GymProgressChart
                      exercise={selectedPlannedExercise?.exercise}
                    />
                  </div>
                </div>

                <div className="flex flex-row w-full h-full justify-between">
                  <div className="flex flex-col w-auto h-full items-start justify-start">
                    <div className="flex flex-row gap-4 justify-between w-full">
                      {latestExerciseRecord && (
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                          <StepBack size={20} />
                          Previous
                        </h2>
                      )}
                      <h2 className="text-lg font-semibold">Current</h2>
                    </div>

                    {calendarDayData?.getCalendarDayByDate.plannedWorkoutDay.plannedExercises[
                      exerciseIndex
                    ]?.plannedSets?.map(
                      (
                        set: { id: string; reps: number; restTime?: number },
                        index: number
                      ) => {
                        const setData = latestExerciseRecord?.sets[index]
                        return (
                          <div
                            key={index}
                            className="grid grid-cols-2 gap-4 items-center"
                          >
                            {/* Previous Section */}
                            {latestExerciseRecord && (
                              <div>
                                <Accordion>
                                  <AccordionItem
                                    aria-label={`Set ${index + 1}`}
                                    title={`Set ${index + 1}: ${setData?.weight} kg`}
                                    subtitle="See details"
                                    className="w-full"
                                  >
                                    <div className="text-gray-300">
                                      <p>📊 {setData?.reps} reps</p>
                                      <p>⏳ {setData?.restTime} sec</p>
                                      <p>💓 {/* TODO: Add pulse data */}</p>
                                    </div>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            )}

                            {/* Current Section */}
                            <div className="w-full mb-2">
                              <Input
                                label={`Set ${index + 1}`}
                                placeholder="Current weight"
                                type="number"
                                value={setData?.weight.toString()}
                                variant="underlined"
                                className="w-full"
                              />
                              <Input
                                label={`Set ${index + 1}`}
                                placeholder="Current reps"
                                type="number"
                                value={setData?.reps.toString()}
                                variant="underlined"
                                className="w-full"
                              />
                            </div>
                          </div>
                        )
                      }
                    ) ?? null}
                  </div>
                  <div className="flex flex-col items-end w-full h-full">
                    <Textarea
                      isClearable
                      className="max-w-lg mb-4"
                      label="Notes for this training"
                      variant="bordered"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      onClear={() => setNotes('')}
                    />
                    <Textarea
                      isClearable
                      className="max-w-lg"
                      label="Notes for this exercise"
                      variant="bordered"
                      value={selectedPlannedExercise?.notes}
                      onChange={e => setNotes(e.target.value)}
                      onClear={() => setNotes('')}
                    />
                  </div>
                </div>
              </div>
              <button className="text-white p-2" onClick={handleNextExercise}>
                <ChevronRight
                  className={`text-white ${
                    exerciseIndex ==
                    (calendarDayData?.getCalendarDayByDate.plannedWorkoutDay
                      .plannedExercises?.length ?? 0) -
                      1
                      ? 'disabled-white-button'
                      : ''
                  }`}
                  size={80}
                />
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}
