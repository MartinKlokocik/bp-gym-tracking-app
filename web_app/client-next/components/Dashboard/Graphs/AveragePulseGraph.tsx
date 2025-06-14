import { format } from 'date-fns'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from 'recharts'

import { useMediaQuery } from '@/CustomHooks/useMediaQueryHook'

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded border border-gray-700">
        <p className="text-white">{`Date: ${format(
          new Date(payload[0].payload.date),
          'dd/MM'
        )}`}</p>
        <p className="text-white">{`Average Pulse: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export const AveragePulseGraph = ({
  data,
}: {
  data: { date: string; averagePulse: number }[]
}) => {
  const isMobile = useMediaQuery('(max-width: 430px)')

  return (
    <div className="col-span-1 md:p-6 md:pl-8 flex flex-col gap-4">
      <div className="text-2xl font-bold pl-2">
        Average Pulse during workouts
      </div>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="averagePulse"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
