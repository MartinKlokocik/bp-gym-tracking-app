import { format } from 'date-fns'

import { RecentPRs } from '@/types/DashboardMetrics'
export const RecentPrsCard = ({ data }: { data: RecentPRs[] }) => {
  console.log('RecentPrsCard', data)
  return (
    <div className="p-4 pl-8 border border-gray-700 rounded-lg">
      <div className="text-xl font-bold">Recent PRs</div>
      <div className="flex flex-col gap-2">
        {data.map((pr, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="text-sm text-gray-400">{pr.exerciseName}</div>
            <div className="text-lg font-bold">{pr.weight}kg</div>
            <div className="text-sm text-gray-400">
              {format(pr.date, 'd MMM yyyy')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
