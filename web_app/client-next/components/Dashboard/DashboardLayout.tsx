import { useQuery } from '@apollo/client'

import { TotalVolumeGraph } from './Graphs/TotalVolumeGraph'

import { GET_DASHBOARD_METRICS } from '@/graphql/DashboardMetricsConsts'

export default function DashboardLayout({ userId }: { userId: string }) {
  const { data, loading, error } = useQuery(GET_DASHBOARD_METRICS, {
    variables: { userId },
    skip: !userId,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full grid grid-cols-3 gap-4">
        <TotalVolumeGraph data={data.getDashboardMetrics.volumeLiftedInWeeks} />
        <div className="flex flex-col gap-4">
          <div>Last 7 Days Consistency</div>
          <div>Recent PRs</div>
        </div>
      </div>
    </div>
  )
}
