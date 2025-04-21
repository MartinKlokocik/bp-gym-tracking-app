import { useQuery } from '@apollo/client'

import { ConsistencyCard } from './ConsistencyCard'
import { MuscleGroupsFocusGraph } from './Graphs/MuscleGroupsFocusGraph'
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
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-4">
      <div className="w-full h-full grid grid-cols-3 gap-4">
        <TotalVolumeGraph data={data.getDashboardMetrics.volumeLiftedInWeeks} />
        <div className="flex flex-col gap-4">
          <ConsistencyCard
            consistency={data.getDashboardMetrics.last7DaysConsistency}
          />
          <RecentPrsCard data={data.getDashboardMetrics.recentPRs} />
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        <MuscleGroupsFocusGraph
          data={data.getDashboardMetrics.muscleGroupsFocus}
        />
      </div>
    </div>
  )
}
