import { Loader2 } from 'lucide-react'
import { User } from 'next-auth'

import NewPost from './Components/NewPost'
import PostCard from './Components/PostCard'

import { PostCard as PostCardType } from '@/types/CommunitySection'
export default function PostsSection({
  user,
  trendingPosts,
  trendingPostsLoading,
  recentPosts,
  recentPostsLoading,
  myPosts,
  myPostsLoading,
  activeTab,
  refetchTrendingPosts,
  refetchRecentPosts,
  refetchMyPosts,
}: {
  user: User
  trendingPosts: PostCardType[]
  trendingPostsLoading: boolean
  recentPosts: PostCardType[]
  recentPostsLoading: boolean
  myPosts: PostCardType[]
  myPostsLoading: boolean
  activeTab: string
  refetchTrendingPosts: () => void
  refetchRecentPosts: () => void
  refetchMyPosts: () => void
}) {
  const posts =
    activeTab === 'trending'
      ? trendingPosts
      : activeTab === 'recent'
        ? recentPosts
        : activeTab === 'my-posts'
          ? myPosts
          : []

  return (
    <div className="flex flex-col gap-10 w-[90%] h-full p-10">
      <NewPost
        user={user}
        refetchTrendingPosts={refetchTrendingPosts}
        refetchRecentPosts={refetchRecentPosts}
        refetchMyPosts={refetchMyPosts}
      />
      {(activeTab === 'trending' && trendingPostsLoading) ||
      (activeTab === 'recent' && recentPostsLoading) ||
      (activeTab === 'my-posts' && myPostsLoading) ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        posts &&
        posts.map((post: PostCardType) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  )
}
