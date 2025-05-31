'use client'

import { useSession } from 'next-auth/react'

import CommunityLayout from '@/components/CommunitySection/CommunityLayout'

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }
  return <CommunityLayout user={session.user} />
}
