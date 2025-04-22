import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
} from 'recharts'
import { ResponsiveContainer } from 'recharts'
import { Line } from 'recharts'

import { ProgressionCurve } from '@/types/DashboardMetrics'

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded border border-gray-700">
        <p className="text-white">{`Exercise: ${payload[0].payload.exerciseName}`}</p>
        <p className="text-white">{`Session: ${payload[0].payload.session}`}</p>
        <p className="text-amber-500">{`Weight: ${payload[0].value}kg`}</p>
      </div>
    )
  }
  return null
}

export const ProgressionCurveGraph = ({
  data,
}: {
  data: ProgressionCurve[]
}) => {
  // Transform data for recharts
  const transformedData = data.flatMap(exercise =>
    exercise.weights.map((weight, index) => ({
      exerciseName: exercise.exerciseName,
      weight,
      session: index + 1,
    }))
  )

  return (
    <div className="flex flex-col gap-4 col-span-2 md:p-6 md:pl-8">
      <div className="text-2xl font-bold pl-2">Progression Curve</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="session" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            strokeWidth={3}
            name="Weight"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
