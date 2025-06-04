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

import { useMediaQuery } from '@/CustomHooks/useMediaQueryHook'
import { ProgressionCurve } from '@/types/DashboardMetrics'

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded border border-gray-700">
        <p className="text-white">{`Session: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}kg`}
          </p>
        ))}
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
  const isMobile = useMediaQuery('(max-width: 430px)')

  const maxSessions = Math.max(...data.map(ex => ex.weights.length))
  const chartData = Array.from({ length: maxSessions }, (_, sessionIndex) => {
    const sessionData: { session: number; [key: string]: number | null } = {
      session: sessionIndex + 1,
    }

    data.forEach(exercise => {
      sessionData[exercise.exerciseName] =
        exercise.weights[sessionIndex] || null
    })

    return sessionData
  })

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1']

  return (
    <div className="flex flex-col gap-4 col-span-2 md:p-6 md:pl-8">
      <div className="text-2xl font-bold pl-2">Progression Curve</div>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="session" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          {data.map((exercise, index) => (
            <Line
              key={exercise.exerciseName}
              type="monotone"
              dataKey={exercise.exerciseName}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              connectNulls={false}
              name={exercise.exerciseName}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
