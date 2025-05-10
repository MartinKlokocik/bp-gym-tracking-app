import { Filter, Search } from 'lucide-react'

export default function CommunityHeader() {
  return (
    <div className="flex flex items-center justify-between w-full h-full">
      <h1 className="text-2xl font-bold">Community</h1>
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            className="bg-gray-900 rounded-lg py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <button className="bg-gray-900 p-2 rounded-lg">
          <Filter className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}
