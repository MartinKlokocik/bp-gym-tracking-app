'use client'

import { useEffect, useState } from 'react'
import { CalendarDay, PlannedExercise } from '../types'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { BackwardIcon } from '@heroicons/react/16/solid'
import { getCalendarDay, getLatestExerciseRecord } from '../utils'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { Input, Image } from '@heroui/react'
import { GymProgressChart } from './GymProgressChart'
type WorkoutTabProps = {
  selectedDate: Date
}
export const WorkoutTab = ({ selectedDate }: WorkoutTabProps) => {
  const [calendarDay, setCalendarDay] = useState<CalendarDay | undefined>(
    getCalendarDay(selectedDate)
  )

  const [exerciseIndex, setExerciseIndex] = useState<number>(0)
  const [selectedPlannedExercise, setselectedPlannedExercise] =
    useState<PlannedExercise | null>(calendarDay?.workout.exercises[0] ?? null)

  useEffect(() => {
    const day = getCalendarDay(selectedDate)
    if (day) {
      setCalendarDay(day)
      setselectedPlannedExercise(day.workout.exercises[0] ?? null)
    } else {
      setCalendarDay(undefined)
      setselectedPlannedExercise(null)
    }
  }, [calendarDay?.workout, calendarDay?.workout.exercises, selectedDate])

  const handlePrevExercise = () => {
    if (exerciseIndex > 0) {
      const newIndex = exerciseIndex - 1
      setExerciseIndex(newIndex)
      setselectedPlannedExercise(
        calendarDay?.workout.exercises[newIndex] ?? null
      )
    }
  }
  const handleNextExercise = () => {
    if (
      calendarDay?.workout.exercises &&
      exerciseIndex < calendarDay.workout.exercises.length - 1
    ) {
      const newIndex = exerciseIndex + 1
      setExerciseIndex(newIndex)
      setselectedPlannedExercise(
        calendarDay?.workout.exercises[newIndex] ?? null
      )
    }
  }

  const isDisplaying = () => {
    if (!calendarDay) {
      return false
    }
    if (!calendarDay?.workout.exercises) {
      return false
    }
    if (calendarDay?.workout.exercises?.length === 0) {
      return false
    }
    return true
  }

  const latestExerciseRecord = getLatestExerciseRecord(
    selectedPlannedExercise?.exercise ?? null
  )

  return (
    <div className="flex flex-row justify-center items-center w-[90%] h-full pb-10 mt-8">
      {!isDisplaying() ? (
        <div>
          <p>There is not workout record for this day.</p>
        </div>
      ) : (
        <>
          <button
            className="text-white p-2"
            onClick={handlePrevExercise}
            disabled={exerciseIndex == 0}
          >
            <ChevronLeftIcon
              className={`text-white w-16 h-16 ${
                exerciseIndex == 0 ? 'disabled-white-button' : ''
              }`}
            />
          </button>
          <div className="flex flex-col items-center w-full h-full gap-16 pl-5 pr-5">
            <div className="flex flex-row justify-between items-start justify-start w-full h-full gap-8">
              <div className="flex flex-col gap-4 w-[40%]">
                <h2 className="text-2xl font-semibold">
                  Exercise number {exerciseIndex + 1}:{' '}
                  {selectedPlannedExercise?.exercise.name}
                </h2>
                <Image
                  src={`/assets/DummyPictures/${selectedPlannedExercise?.exercise.image}`}
                  alt={selectedPlannedExercise?.exercise.name}
                  width={500}
                  height={400}
                />
              </div>
              <div className="flex flex-col items-start w-[60%]">
                <GymProgressChart
                  exercise={selectedPlannedExercise?.exercise}
                />
              </div>
            </div>

            <div className="flex flex-col w-full h-full items-start justify-start">
              <div className="grid grid-cols-2 gap-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <BackwardIcon className="w-5 h-5" />
                  Previous
                </h2>
                <h2 className="text-lg font-semibold">Current</h2>
              </div>

              {latestExerciseRecord?.sets?.map((set, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 items-center"
                >
                  {/* Previous Section */}
                  <div>
                    <Accordion>
                      <AccordionItem
                        aria-label={`Set ${index + 1}`}
                        title={`Set ${index + 1}: ${set.weight} kg`}
                        subtitle="See details"
                        className="w-full"
                      >
                        <div className="text-gray-300">
                          <p>📊 {set.reps} reps</p>
                          <p>⏳ {set.restTime} sec</p>
                          <p>💓 {/* TODO: Add pulse data */}</p>
                        </div>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Current Section */}
                  <Input
                    label={`Set ${index + 1}`}
                    placeholder="Enter current weight"
                    type="number"
                    value={set.weight.toString()}
                    variant="underlined"
                    className="w-full"
                  />
                </div>
              )) ?? null}
            </div>
          </div>
          <button className="text-white p-2" onClick={handleNextExercise}>
            <ChevronRightIcon
              className={`text-white w-16 h-16 ${
                exerciseIndex ==
                (calendarDay?.workout.exercises?.length ?? 0) - 1
                  ? 'disabled-white-button'
                  : ''
              }`}
            />
          </button>
        </>
      )}
    </div>
  )
}
