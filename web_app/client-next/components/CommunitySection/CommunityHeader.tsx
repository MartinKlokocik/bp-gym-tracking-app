import { Input } from '@heroui/react'
import { Search } from 'lucide-react'

export default function CommunityHeader({
  search,
  setSearch,
}: {
  search: string
  setSearch: (search: string) => void
}) {
  return (
    <div className="flex items-center justify-between w-full h-full flex-col md:flex-row gap-2 md:gap-3">
      <h1 className="text-xl md:text-2xl font-bold">Community</h1>
      <Input
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
        placeholder="Search posts..."
        className="w-full md:w-auto"
        startContent={
          <Search className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
        }
        size="sm"
      />
    </div>
  )
}
