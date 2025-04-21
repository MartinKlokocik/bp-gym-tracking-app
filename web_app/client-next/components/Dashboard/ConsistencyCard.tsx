import { CalendarDaysIcon } from 'lucide-react'

export const ConsistencyCard = ({ consistency }: { consistency: number }) => {
  return (
    <div className="p-6 pl-8 border border-gray-700 rounded-lg flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">Last 7 Days Consistency</div>
        <div className="text-4xl font-bold">{consistency}/7</div>
      </div>
      <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-3 text-[#2563eb]">
        <CalendarDaysIcon className="w-10 h-10" />
      </div>
    </div>
  )
}
