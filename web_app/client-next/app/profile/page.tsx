'use client'

import { useSession } from 'next-auth/react'

import { ProfileForm } from '@/components/Profile/ProfileForm'
export default function Profile() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ProfileForm userId={session.user.id} />
    </>
  )
}
