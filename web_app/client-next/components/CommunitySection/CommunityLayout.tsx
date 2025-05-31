import { User } from 'next-auth'
import { useState } from 'react'

import CommunityHeader from './CommunityHeader'
import PostsSection from './PostsSection'
import SectionSelector from './SectionSelector'

import { PostCard } from '@/types/CommunitySection'

export default function CommunityLayout({
  user,
  trendingPosts,
  trendingPostsLoading,
  recentPosts,
  recentPostsLoading,
  myPosts,
  myPostsLoading,
  refetchTrendingPosts,
  refetchRecentPosts,
  refetchMyPosts,
  search,
  setSearch,
}: {
  user: User
  trendingPosts: PostCard[]
  trendingPostsLoading: boolean
  recentPosts: PostCard[]
  recentPostsLoading: boolean
  myPosts: PostCard[]
  myPostsLoading: boolean
  refetchTrendingPosts: () => void
  refetchRecentPosts: () => void
  refetchMyPosts: () => void
  search: string
  setSearch: (search: string) => void
}) {
  const [activeTab, setActiveTab] = useState('trending')

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <CommunityHeader search={search} setSearch={setSearch} />
      <SectionSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <PostsSection
        user={user}
        trendingPosts={trendingPosts}
        trendingPostsLoading={trendingPostsLoading}
        recentPosts={recentPosts}
        recentPostsLoading={recentPostsLoading}
        myPosts={myPosts}
        myPostsLoading={myPostsLoading}
        activeTab={activeTab}
        refetchTrendingPosts={refetchTrendingPosts}
        refetchRecentPosts={refetchRecentPosts}
        refetchMyPosts={refetchMyPosts}
      />
    </div>
  )
}
