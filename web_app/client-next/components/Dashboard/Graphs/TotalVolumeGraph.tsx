import { VolumeLiftedInWeeks } from '@/types/DashboardMetrics'

export const TotalVolumeGraph = ({ data }: { data: VolumeLiftedInWeeks[] }) => {
  console.log(data)
  return <div className="col-span-2">TotalVolumeGraph</div>
}
