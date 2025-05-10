import { format } from 'date-fns'
import { CartesianGrid } from 'recharts'
import { Line, Tooltip, XAxis, YAxis } from 'recharts'
import { LineChart } from 'recharts'
import { ResponsiveContainer } from 'recharts'
import { TooltipProps } from 'recharts'

import { useMediaQuery } from '@/CustomHooks/useMediaQueryHook'
import { VolumeLiftedInWeeks } from '@/types/DashboardMetrics'

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded border border-gray-700">
        <p className="text-white">{`Date: ${
          format(new Date(payload[0].payload.dateFrom), 'dd/MM') +
          ' - ' +
          format(new Date(payload[0].payload.dateTo), 'dd/MM/yy')
        }`}</p>
        <p className="text-white">{`Week: ${payload[0].payload.weekLabel}`}</p>
        <p className="text-amber-500">{`Volume: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export const TotalVolumeGraph = ({ data }: { data: VolumeLiftedInWeeks[] }) => {
  const isMobile = useMediaQuery('(max-width: 430px)')

  return (
    <div className="col-span-2 md:pl-2 flex flex-col gap-4">
      <div className="text-2xl font-bold pl-2">Total Volume in Weeks</div>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="dateFrom" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
