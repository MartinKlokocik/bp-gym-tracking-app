import { Button, ButtonGroup } from '@heroui/react'
import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

import { ExerciseRecord, Exercise } from '../types'
import { getExerciseRecords } from '../utils'

type GymProgressChartProps = {
  exercise: Exercise | undefined
}

// TODO: CHECK IF THIS IS CORRECT
const aggregateWorkoutData = (data: ExerciseRecord[], metric: string) => {
  return data.map(record => ({
    date: record.timestamp.toISOString().split('T')[0], // Format date
    value:
      metric === 'totalVolume'
        ? record.sets.reduce((sum, set) => sum + set.weight * set.reps, 0)
        : metric === 'maxWeight'
          ? Math.max(...record.sets.map(set => set.weight))
          : record.sets.reduce((sum, set) => sum + set.weight, 0) /
            record.sets.length,
  }))
}

export const GymProgressChart = ({ exercise }: GymProgressChartProps) => {
  const [metric, setMetric] = useState('totalVolume')

  const exerciseRecords = getExerciseRecords(exercise)
  const chartData = aggregateWorkoutData(exerciseRecords, metric)

  return (
    <div className="w-full mx-auto">
      <h2 className="text-white text-2xl font-bold mb-4">
        {exercise?.name} Progress
      </h2>

      {/* Metric Selection Buttons */}
      <ButtonGroup className="mb-6">
        <Button
          variant="bordered"
          onPress={() => setMetric('totalVolume')}
          className={metric === 'totalVolume' ? 'bg-yellow-500 text-black' : ''}
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
          className={metric === 'avgWeight' ? 'bg-green-500 text-white' : ''}
        >
          Avg Weight
        </Button>
      </ButtonGroup>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
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
    </div>
  )
}
