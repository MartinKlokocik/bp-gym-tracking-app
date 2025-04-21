import { useQuery } from '@apollo/client'

import { ConsistencyCard } from './ConsistencyCard'
import { TotalVolumeGraph } from './Graphs/TotalVolumeGraph'
import { RecentPrsCard } from './RecentPrsCard'

import { GET_DASHBOARD_METRICS } from '@/graphql/DashboardMetricsConsts'
export default function DashboardLayout({ userId }: { userId: string }) {
  const { data, loading, error } = useQuery(GET_DASHBOARD_METRICS, {
    variables: { userId },
    skip: !userId,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <div className="w-full h-full grid grid-cols-3 gap-4">
        <TotalVolumeGraph data={data.getDashboardMetrics.volumeLiftedInWeeks} />
        <div className="grid grid-rows-2 gap-4">
          <ConsistencyCard
            consistency={data.getDashboardMetrics.last7DaysConsistency}
          />
          <RecentPrsCard />
        </div>
      </div>
    </div>
  )
}
