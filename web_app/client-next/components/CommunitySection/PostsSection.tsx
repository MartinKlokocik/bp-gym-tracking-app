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

  const refetchPosts = () => {
    refetchTrendingPosts()
    refetchRecentPosts()
    refetchMyPosts()
  }

  return (
    <div className="flex flex-col gap-4 md:gap-10 w-full md:w-[90%] h-full p-1 md:p-10">
      <NewPost user={user} refetchPosts={refetchPosts} />
      {(activeTab === 'trending' && trendingPostsLoading) ||
      (activeTab === 'recent' && recentPostsLoading) ||
      (activeTab === 'my-posts' && myPostsLoading) ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-6 h-6 md:w-10 md:h-10 animate-spin" />
        </div>
      ) : (
        posts &&
        posts.map((post: PostCardType) => (
          <PostCard
            key={post.id}
            post={post}
            user={user}
            refetchPosts={refetchPosts}
          />
        ))
      )}
    </div>
  )
}
