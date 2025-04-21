import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

import { MuscleGroupsFocus } from '@/types/DashboardMetrics'

export const MuscleGroupsFocusGraph = ({
  data,
}: {
  data: MuscleGroupsFocus[]
}) => {
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#8dd1e1',
    '#a4de6c',
    '#d0ed57',
  ]

  return (
    <div className="flex flex-col gap-4 col-span-1 p-6 pl-8 border border-gray-700 rounded-lg">
      <div className="text-2xl font-bold pl-2">Muscle Groups Focus</div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="muscleGroup"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} sessions`, name]}
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
            }}
            itemStyle={{ color: '#ffffff' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
