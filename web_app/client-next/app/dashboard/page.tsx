'use client'

import { useSession } from 'next-auth/react'

import DashboardLayout from '@/components/Dashboard/DashboardLayout'

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <DashboardLayout userId={session.user.id} />
    </div>
  )
}
