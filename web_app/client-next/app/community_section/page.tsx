'use client'

import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import CommunityLayout from '@/components/CommunitySection/CommunityLayout'
import {
  GET_RECENT_POSTS,
  GET_TRENDING_POSTS,
  GET_MY_POSTS,
} from '@/graphql/CommunitySectionConsts'

export default function Home() {
  const { data: session } = useSession()

  const {
    data: trendingPosts,
    loading: trendingPostsLoading,
    error: trendingPostsError,
    refetch: refetchTrendingPosts,
  } = useQuery(GET_TRENDING_POSTS)

  const {
    data: recentPosts,
    loading: recentPostsLoading,
    error: recentPostsError,
    refetch: refetchRecentPosts,
  } = useQuery(GET_RECENT_POSTS)

  const {
    data: myPosts,
    loading: myPostsLoading,
    error: myPostsError,
    refetch: refetchMyPosts,
  } = useQuery(GET_MY_POSTS, {
    variables: {
      userId: session?.user.id,
    },
    skip: !session?.user.id,
  })

  console.log(trendingPosts)

  useEffect(() => {
    if (trendingPostsError) {
      console.error(trendingPostsError)
    }
    if (recentPostsError) {
      console.error(recentPostsError)
    }
    if (myPostsError) {
      console.error(myPostsError)
    }
  }, [trendingPostsError, recentPostsError, myPostsError])

  if (!session) {
    return <div>Loading...</div>
  }
  return (
    <CommunityLayout
      user={session.user}
      trendingPosts={trendingPosts?.getTrendingPosts}
      trendingPostsLoading={trendingPostsLoading}
      refetchTrendingPosts={refetchTrendingPosts}
      recentPosts={recentPosts?.getRecentPosts}
      recentPostsLoading={recentPostsLoading}
      refetchRecentPosts={refetchRecentPosts}
      myPosts={myPosts?.getMyPosts}
      myPostsLoading={myPostsLoading}
      refetchMyPosts={refetchMyPosts}
    />
  )
}
