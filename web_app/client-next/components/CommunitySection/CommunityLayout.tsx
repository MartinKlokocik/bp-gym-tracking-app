import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'

import CommunityHeader from './CommunityHeader'
import PostsSection from './PostsSection'
import SectionSelector from './SectionSelector'

import {
  GET_RECENT_POSTS,
  GET_TRENDING_POSTS,
} from '@/graphql/CommunitySectionConsts'
import { GET_MY_POSTS } from '@/graphql/CommunitySectionConsts'

export default function CommunityLayout({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState('trending')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams?.get('q') || '')

  const {
    data: trendingPosts,
    loading: trendingPostsLoading,
    error: trendingPostsError,
    refetch: refetchTrendingPosts,
  } = useQuery(GET_TRENDING_POSTS, {
    variables: {
      userId: user.id,
      searchTerm: search,
    },
    skip: !user.id,
  })

  const {
    data: recentPosts,
    loading: recentPostsLoading,
    error: recentPostsError,
    refetch: refetchRecentPosts,
  } = useQuery(GET_RECENT_POSTS, {
    variables: {
      userId: user.id,
      searchTerm: search,
    },
    skip: !user.id,
  })

  const {
    data: myPosts,
    loading: myPostsLoading,
    error: myPostsError,
    refetch: refetchMyPosts,
  } = useQuery(GET_MY_POSTS, {
    variables: {
      userId: user.id,
      searchTerm: search,
    },
    skip: !user.id,
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

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams?.toString() || '')

    if (search && search.trim() !== '') {
      currentParams.set('q', search)
    } else {
      currentParams.delete('q')
    }

    router.push(`/community_section?${currentParams.toString()}`, {
      scroll: false,
    })
  }, [search, router, searchParams])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <CommunityHeader search={search} setSearch={setSearch} />
      <SectionSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <PostsSection
        user={user}
        trendingPosts={trendingPosts?.getTrendingPosts}
        trendingPostsLoading={trendingPostsLoading}
        recentPosts={recentPosts?.getRecentPosts}
        recentPostsLoading={recentPostsLoading}
        myPosts={myPosts?.getMyPosts}
        myPostsLoading={myPostsLoading}
        activeTab={activeTab}
        refetchTrendingPosts={refetchTrendingPosts}
        refetchRecentPosts={refetchRecentPosts}
        refetchMyPosts={refetchMyPosts}
      />
    </div>
  )
}
