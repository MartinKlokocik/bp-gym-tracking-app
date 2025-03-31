import { Card, Tabs, Tab } from '@heroui/react'
import { User } from 'lucide-react'
import React, { Key, useState } from 'react'

import { BasicInformationTab } from './ProfileForm/BasicInformationTab'
import { FitnessProfileTab } from './ProfileForm/FitnesProfileTab'
import { PhysicalStatsTab } from './ProfileForm/PhysicalStatsTab'

// Example type for the profile form
export type UserProfile = {
  // Basic Info
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  profilePicture?: string

  // Physical Stats
  height: number
  weight: number

  // Fitness Profile
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience: number
  primaryGoal: string
  secondaryGoals: string[]
  preferredWorkoutDays: number
  workoutDuration: number

  // Preferences & Limitations
  availableEquipment: string[]
  healthIssues: string
  injuries: string
}

const ProfileForm: React.FC = () => {
  // Default initial values for the form
  const initialProfile: UserProfile = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',

    height: 175,
    weight: 75,

    fitnessLevel: 'intermediate',
    yearsOfExperience: 1,
    primaryGoal: 'muscle_gain',
    secondaryGoals: [],
    preferredWorkoutDays: 4,
    workoutDuration: 60,

    availableEquipment: [],
    healthIssues: '',
    injuries: '',
  }

  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [activeTab, setActiveTab] = useState('basicInfo')

  const handleChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting profile:', profile)
  }

  return (
    <Card className="bg-gray-900 text-white border border-gray-800 rounded-xl shadow-xl max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold flex items-center">
            <User className="mr-2 text-purple-500" />
            Profile Information
          </h2>
          <p className="text-gray-400 mt-1">
            Complete your profile to get personalized workout recommendations
          </p>
        </div>

        <Tabs
          selectedKey={activeTab}
          onSelectionChange={setActiveTab as (key: Key) => void}
          classNames={{
            tabList: 'ml-4 bg-gray-800',
          }}
        >
          <Tab key="basicInfo" title="Basic Info">
            <BasicInformationTab
              profile={profile}
              handleChange={handleChange}
              setActiveTab={setActiveTab}
            />
          </Tab>

          <Tab key="physicalStats" title="Physical Stats">
            <PhysicalStatsTab
              profile={profile}
              handleChange={handleChange}
              setActiveTab={setActiveTab}
            />
          </Tab>

          <Tab key="fitnessProfile" title="Fitness Profile">
            <FitnessProfileTab
              profile={profile}
              handleChange={handleChange}
              setActiveTab={setActiveTab}
            />
          </Tab>

          <Tab key="preferences" title="Preferences">
            <PreferencesTab
              profile={profile}
              handleChange={handleChange}
              setActiveTab={setActiveTab}
            />
          </Tab>
        </Tabs>
      </form>
    </Card>
  )
}

export default ProfileForm
