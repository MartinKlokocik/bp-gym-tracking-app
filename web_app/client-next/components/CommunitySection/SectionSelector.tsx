export default function SectionSelector({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  return (
    <div className="flex mt-3 md:mt-6 border-b border-gray-800 w-full">
      <button
        className={`px-2 md:px-4 py-1 md:py-2 font-medium text-sm md:text-md ${activeTab === 'trending' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        onClick={() => setActiveTab('trending')}
      >
        Trending
      </button>
      <button
        className={`px-2 md:px-4 py-1 md:py-2 font-medium text-sm md:text-md ${activeTab === 'recent' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        onClick={() => setActiveTab('recent')}
      >
        Recent
      </button>
      <button
        className={`px-2 md:px-4 py-1 md:py-2 font-medium text-sm md:text-md ${activeTab === 'my-posts' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        onClick={() => setActiveTab('my-posts')}
      >
        My Posts
      </button>
    </div>
  )
}
