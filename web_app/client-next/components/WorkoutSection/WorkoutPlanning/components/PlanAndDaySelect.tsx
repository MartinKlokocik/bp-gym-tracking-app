import { useLazyQuery, useQuery } from '@apollo/client'
import { Select, SelectItem } from '@heroui/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { getActiveWorkoutPlan } from '../../utils'

import {
  GET_ALL_PLANNED_WORKOUTS,
  GET_PLANNED_WORKOUT_BY_ID,
} from '@/graphql/PlannedWorkoutConsts'
import { GET_WORKOUT_DAY_BY_ID } from '@/graphql/WorkoutDayConsts'
import {
  PlannedWorkoutDayWithIdType,
  PlannedWorkoutWithIdsType,
} from '@/types/WorkoutPlanning'
type PlanAndDaySelectProps = {
  selectedWorkoutDay: PlannedWorkoutDayWithIdType | undefined
  setSelectedWorkoutDay: React.Dispatch<
    React.SetStateAction<PlannedWorkoutDayWithIdType | undefined>
  >
}
export const PlanAndDaySelect = ({
  selectedWorkoutDay,
  setSelectedWorkoutDay,
}: PlanAndDaySelectProps) => {
  const {
    data: allPlannedWorkoutsData,
    loading: allPlannedWorkoutsLoading,
    error: allPlannedWorkoutsError,
  } = useQuery(GET_ALL_PLANNED_WORKOUTS)
  const [getPlannedWorkoutById, { error: plannedWorkoutError }] = useLazyQuery(
    GET_PLANNED_WORKOUT_BY_ID
  )
  const [getWorkoutDayById, { error: workoutDayError }] = useLazyQuery(
    GET_WORKOUT_DAY_BY_ID
  )

  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<
    PlannedWorkoutWithIdsType | undefined
  >()

  useEffect(() => {
    if (allPlannedWorkoutsData) {
      const activeWorkoutPlan = getActiveWorkoutPlan(
        allPlannedWorkoutsData.getAllPlannedWorkouts
      )
      setSelectedWorkoutPlan(activeWorkoutPlan)
      setSelectedWorkoutDay(activeWorkoutPlan?.days[0])
    }
  }, [allPlannedWorkoutsData, setSelectedWorkoutDay])

  useEffect(() => {
    if (allPlannedWorkoutsError) {
      toast.error('Error fetching planned workouts')
    }
  }, [allPlannedWorkoutsError])

  const handleWorkoutPlanChange = async (plannedWorkoutId: string) => {
    try {
      const { data } = await getPlannedWorkoutById({
        variables: {
          id: plannedWorkoutId,
        },
      })

      if (plannedWorkoutError) {
        toast.error(plannedWorkoutError.message)
        return
      }

      if (data?.getWorkoutPlanById) {
        setSelectedWorkoutPlan(data.getWorkoutPlanById)
        setSelectedWorkoutDay(data.getWorkoutPlanById.days[0])
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong fetching workout plan data.')
    }
  }

  const handleWorkoutDayChange = async (plannedWorkoutDayId: string) => {
    try {
      const { data } = await getWorkoutDayById({
        variables: {
          id: plannedWorkoutDayId,
        },
      })

      if (workoutDayError) {
        toast.error(workoutDayError.message)
        return
      }

      if (data?.getWorkoutDayById) {
        setSelectedWorkoutDay(data.getWorkoutDayById)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong fetching workout day data.')
    }
  }

  return (
    <>
      <Select
        label="Select a workout plan"
        placeholder="Select a workout plan"
        variant="bordered"
        selectedKeys={[selectedWorkoutPlan?.id || '']}
        onChange={e => {
          handleWorkoutPlanChange(e.target.value)
        }}
      >
        {allPlannedWorkoutsLoading ? (
          <SelectItem>Loading...</SelectItem>
        ) : (
          allPlannedWorkoutsData?.getAllPlannedWorkouts.map(
            (plannedWorkout: PlannedWorkoutWithIdsType) => (
              <SelectItem key={plannedWorkout.id} value={plannedWorkout.id}>
                {plannedWorkout.name}
              </SelectItem>
            )
          )
        )}
      </Select>

      {selectedWorkoutPlan && (
        <Select
          label="Select a workout day"
          placeholder="Select a workout day"
          variant="bordered"
          selectedKeys={[selectedWorkoutDay?.id || '']}
          onChange={e => handleWorkoutDayChange(e.target.value)}
        >
          {selectedWorkoutPlan.days.map(
            (plannedWorkoutDay: PlannedWorkoutDayWithIdType) => (
              <SelectItem
                key={plannedWorkoutDay.id}
                value={plannedWorkoutDay.id}
              >
                {plannedWorkoutDay.name}
              </SelectItem>
            )
          )}
        </Select>
      )}
    </>
  )
}
