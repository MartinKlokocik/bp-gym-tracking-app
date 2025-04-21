import { format } from 'date-fns'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
} from 'recharts'

import { WorkoutCompletionRate } from '@/types/DashboardMetrics'

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded border border-gray-700">
        <p className="text-white">{`Date: ${
          format(new Date(payload[0].payload.dateFrom), 'dd/MM') +
          ' - ' +
          format(new Date(payload[0].payload.dateTo), 'dd/MM/yy')
        }`}</p>
        <p className="text-emerald-500">{`Completed: ${payload[0]?.value}`}</p>
        <p className="text-red-500">{`Skipped: ${payload[1]?.value}`}</p>
        <p className="text-amber-500">{`Pending: ${payload[2]?.value}`}</p>
      </div>
    )
  }
  return null
}

export const WorkoutCompletitionGraph = ({
  data,
}: {
  data: WorkoutCompletionRate[]
}) => {
  return (
    <div className="col-span-1 flex flex-col gap-4 p-6 pl-8">
      <div className="text-2xl font-bold pl-2">
        Planned Exercises Completion Rate
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis
            dataKey="dateFrom"
            stroke="#fff"
            tickFormatter={dateStr => format(new Date(dateStr), 'dd/MM')}
          />
          <YAxis stroke="#fff" />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
          <Legend />
          <Bar
            dataKey="numberOfCompletedExercises"
            name="Completed"
            fill="#10b981"
            activeBar={false}
          />
          <Bar
            dataKey="numberOfSkipped"
            name="Skipped"
            fill="#ef4444"
            activeBar={false}
          />
          <Bar
            dataKey="numberOfPending"
            name="Pending"
            fill="#f59e0b"
            activeBar={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
