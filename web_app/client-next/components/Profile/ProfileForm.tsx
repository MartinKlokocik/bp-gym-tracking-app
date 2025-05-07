import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { Card, Tabs, Tab, Spinner } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'lucide-react'
import React, { Key, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { BasicInformationTab } from './ProfileForm/BasicInformationTab'
import { FitnessProfileTab } from './ProfileForm/FitnesProfileTab'
import { PhysicalStatsTab } from './ProfileForm/PhysicalStatsTab'
import { PreferencesTab } from './ProfileForm/PreferencesTab'

import { UPDATE_USER_PROFILE } from '@/graphql/UserProfileConsts'
import { GET_USER_PROFILE } from '@/graphql/UserProfileConsts'
import { userProfileSchema, UserProfileType } from '@/types/UserProfile'
import { uploadImage } from '@/utils/upload-image'

type ProfileFormProps = {
  userId: string
}

export const ProfileForm = ({ userId }: ProfileFormProps) => {
  const [fileAvatar, setFileAvatar] = useState<File | null>(null)

  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE, {
    onCompleted: () => {
      toast.success('Profile updated successfully!')
    },
    onError: () => {
      toast.error('Error updating profile!')
    },
  })

  const formMethods = useForm<UserProfileType>({
    resolver: zodResolver(userProfileSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethods

  const { loading: loadingUserProfile, refetch: refetchUserProfile } = useQuery(
    GET_USER_PROFILE,
    {
      variables: { userId },
      skip: !userId,
      onCompleted: data => {
        const userProfile = data?.getUserProfile

        if (userProfile) {
          reset({
            userId,
            profilePicture: userProfile.profilePicture || '',
            firstName: userProfile.firstName || '',
            lastName: userProfile.lastName || '',
            dateOfBirth: userProfile.dateOfBirth || '',
            gender: userProfile.gender || '',

            height: userProfile.height || 175,
            weight: userProfile.weight || 75,

            fitnessLevel: userProfile.fitnessLevel || 'INTERMEDIATE',
            yearsOfExperience: userProfile.yearsOfExperience || 1,
            primaryGoal: userProfile.primaryGoal || 'muscle_gain',
            secondaryGoals: userProfile.secondaryGoals || [],
            preferredWorkoutDays: userProfile.preferredWorkoutDays || 4,
            workoutDuration: userProfile.workoutDuration || 60,

            availableEquipment: userProfile.availableEquipment || [],
            healthIssues: userProfile.healthIssues || '',
            injuries: userProfile.injuries || '',
          })
        }
      },
      onError: error => {
        console.error('Error fetching user profile:', error)
        toast.error('Error fetching user profile!')
      },
    }
  )

  useEffect(() => {
    if (errors) {
      console.log(errors)
    }
  }, [errors])

  const [activeTab, setActiveTab] = useState('basicInfo')

  const onSubmit = async (data: UserProfileType) => {
    console.log('Submitting profile:', data)

    if (fileAvatar) {
      const imageUrl = await uploadImage(fileAvatar, 'avatar')
      data.profilePicture = imageUrl
    } else {
      data.profilePicture = ''
    }

    await updateUserProfile({
      variables: {
        userId,
        data,
      },
    })

    await refetchUserProfile()
  }

  return (
    <>
      {loadingUserProfile ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <Card className="bg-gray-900 text-white border border-gray-800 rounded-xl shadow-xl max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold flex items-center">
                <User className="mr-2 text-purple-500" />
                Profile Information
              </h2>
              <p className="text-gray-400 mt-1">
                Complete your profile to get personalized workout
                recommendations
              </p>
            </div>

            <Tabs
              selectedKey={activeTab}
              onSelectionChange={setActiveTab as (key: Key) => void}
              classNames={{
                tabList:
                  'ml-4 bg-gray-800 flex-wrap justify-center md:justify-start overflow-x-auto',
                tab: 'text-sm md:text-base',
                panel: 'p-2 md:p-4',
              }}
              variant="underlined"
              size="sm"
              fullWidth
            >
              <Tab key="basicInfo" title="Basic Info">
                <BasicInformationTab
                  formMethods={formMethods}
                  setActiveTab={setActiveTab}
                  setFileAvatar={setFileAvatar}
                />
              </Tab>

              <Tab key="physicalStats" title="Physical Stats">
                <PhysicalStatsTab
                  formMethods={formMethods}
                  setActiveTab={setActiveTab}
                />
              </Tab>

              <Tab key="fitnessProfile" title="Fitness Profile">
                <FitnessProfileTab
                  formMethods={formMethods}
                  setActiveTab={setActiveTab}
                />
              </Tab>

              <Tab key="preferences" title="Preferences">
                <PreferencesTab
                  formMethods={formMethods}
                  setActiveTab={setActiveTab}
                />
              </Tab>
            </Tabs>
          </form>
        </Card>
      )}
    </>
  )
}
