import { useState } from 'react'

import CommunityHeader from './CommunityHeader'
import PostsSection from './PostsSection'
import SectionSelector from './SectionSelector'

export default function CommunityLayout() {
  const [activeTab, setActiveTab] = useState('trending')
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <CommunityHeader />
      <SectionSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <PostsSection />
    </div>
  )
}
