import { useQuery } from '@apollo/client'
import { Button, ButtonGroup } from '@heroui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from 'recharts'

import { useMediaQuery } from '@/CustomHooks/useMediaQueryHook'
import { GET_ALL_USER_EXERCISE_RECORDS_FOR_EXERCISE } from '@/graphql/ExerciseRecordsConsts'
import { ExerciseWithIdsType } from '@/types/Exercise'
import { ExerciseRecordWithIdsType } from '@/types/ExerciseRecords'

type GymProgressChartProps = {
  exercise: ExerciseWithIdsType | undefined
  userId: string
  updateTrigger: number
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded border border-gray-700">
        <p className="text-white">{`Date: ${format(
          new Date(payload[0].payload.date),
          'dd/MM'
        )}`}</p>
        <p className="text-white">{`Value: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

// TODO: CHECK IF THIS IS CORRECT
const aggregateWorkoutData = (
  data: ExerciseRecordWithIdsType[],
  metric: string
) => {
  return data.map(record => ({
    date: record.date,
    value:
      metric === 'totalVolume'
        ? record.recordSets.reduce((sum, set) => sum + set.weight * set.reps, 0)
        : metric === 'maxWeight'
          ? Math.max(...record.recordSets.map(set => set.weight))
          : record.recordSets.reduce((sum, set) => sum + set.weight, 0) /
            record.recordSets.length,
  }))
}

export const GymProgressChart = ({
  exercise,
  userId,
  updateTrigger,
}: GymProgressChartProps) => {
  const {
    data: exerciseRecordsData,
    loading: exerciseRecordsLoading,
    error: exerciseRecordsError,
    refetch,
  } = useQuery(GET_ALL_USER_EXERCISE_RECORDS_FOR_EXERCISE, {
    variables: { exerciseId: exercise?.id, userId },
    skip: !exercise?.id,
  })
  const isMobile = useMediaQuery('(max-width: 430px)')

  useEffect(() => {
    refetch()
  }, [exerciseRecordsData, refetch, updateTrigger])

  const [metric, setMetric] = useState('totalVolume')

  useEffect(() => {
    if (exerciseRecordsError) {
      toast.error(exerciseRecordsError.message)
    }
  }, [exerciseRecordsError])

  if (exerciseRecordsLoading) return <div>Loading...</div>

  const chartData = aggregateWorkoutData(
    exerciseRecordsData?.getAllUserExerciseRecordsForExercise ?? [],
    metric
  )

  return (
    <div className="w-full mx-auto h-full">
      <h2 className="text-white text-2xl font-bold mb-4">
        {exercise?.name} Progress
      </h2>

      {chartData.length > 0 ? (
        <>
          {/* Metric Selection Buttons */}
          <ButtonGroup className="flex mb-6 w-full justify-center md:justify-start items-center">
            <Button
              variant="bordered"
              onPress={() => setMetric('totalVolume')}
              className={
                metric === 'totalVolume' ? 'bg-yellow-500 text-black' : ''
              }
            >
              Total Volume
            </Button>
            <Button
              variant="bordered"
              onClick={() => setMetric('maxWeight')}
              className={metric === 'maxWeight' ? 'bg-blue-500 text-white' : ''}
            >
              Max Weight
            </Button>
            <Button
              variant="bordered"
              onPress={() => setMetric('avgWeight')}
              className={
                metric === 'avgWeight' ? 'bg-green-500 text-white' : ''
              }
            >
              Avg Weight
            </Button>
          </ButtonGroup>

          <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.2)"
              />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={
                  metric === 'totalVolume'
                    ? '#f59e0b'
                    : metric === 'maxWeight'
                      ? '#3b82f6'
                      : '#10b981'
                }
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="text-white text-center w-full h-full flex flex-col items-center justify-center gap-1 min-h-[200px] md:min-h-[300px]">
          <h2 className="text-2xl font-bold">
            There are no older records for this exercise
          </h2>
          <p className="text-gray-400">
            Start tracking your progress by adding records for this exercise.
          </p>
        </div>
      )}
    </div>
  )
}
