'use client'

import { useSession } from 'next-auth/react'

import SettingsForm from '@/components/SettingsSection/SettingsForm'

export default function Settings() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SettingsForm userId={session.user.id} />
    </>
  )
}
