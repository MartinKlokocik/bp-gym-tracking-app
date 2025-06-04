import { Radio, RadioGroup, Button, Input, Image } from '@heroui/react'
import { ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { UserProfileType } from '@/types/UserProfile'

type BasicInformationTabProps = {
  formMethods: UseFormReturn<UserProfileType>
  setActiveTab: (tab: string) => void
  setFileAvatar: (file: File | null) => void
}

export const BasicInformationTab = ({
  formMethods,
  setActiveTab,
  setFileAvatar,
}: BasicInformationTabProps) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = formMethods
  const currentAvatar = watch('profilePicture')

  const [preview, setPreview] = useState<string | null>(currentAvatar || null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return

    setFileAvatar(files[0] as File)
    setPreview(URL.createObjectURL(files[0]))
  }

  useEffect(() => {
    if (currentAvatar && typeof currentAvatar === 'string') {
      setPreview(currentAvatar)
    }
  }, [currentAvatar])

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-800 border-2 border-purple-500 flex items-center justify-center overflow-hidden z-10">
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Profile picture"
                  className="w-32 h-32 rounded-full bg-gray-800 border-2 border-purple-500 z-0"
                  width={128}
                  height={128}
                />
                <button
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                  onClick={e => {
                    e.stopPropagation()
                    setPreview(null)
                    setFileAvatar(null)
                  }}
                >
                  <X size={16} color="white" />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-600">No image</span>
              </div>
            )}
          </div>
          <Button
            size="sm"
            color="primary"
            className="absolute bottom-0 right-0 rounded-full"
            onClick={e => {
              e.preventDefault()
              inputRef.current?.click()
            }}
          >
            Upload
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif"
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          value={watch('firstName') || ''}
          onChange={e => {
            setValue('firstName', e.target.value)
          }}
          errorMessage={errors.firstName?.message}
          placeholder="Enter your first name"
          className="rounded-lg border border-gray-700"
          classNames={{
            inputWrapper: 'bg-gray-800',
            input: 'bg-gray-800',
          }}
          label="First Name"
          labelPlacement="outside"
        />

        <Input
          value={watch('lastName') || ''}
          onChange={e => {
            setValue('lastName', e.target.value)
          }}
          errorMessage={errors.lastName?.message}
          placeholder="Enter your last name"
          className="rounded-lg border border-gray-700"
          classNames={{
            inputWrapper: 'bg-gray-800',
            input: 'bg-gray-800',
          }}
          label="Last Name"
          labelPlacement="outside"
        />

        <Input
          type="date"
          value={watch('dateOfBirth') || ''}
          onChange={e => {
            setValue('dateOfBirth', e.target.value)
          }}
          errorMessage={errors.dateOfBirth?.message}
          className="rounded-lg border border-gray-700 h-10"
          classNames={{
            inputWrapper: 'bg-gray-800',
            input: 'bg-gray-800',
          }}
          label="Date of Birth"
          labelPlacement="outside"
        />

        <RadioGroup
          value={watch('gender') || ''}
          onValueChange={value => {
            setValue('gender', value)
          }}
          className="flex space-x-6 mt-2"
        >
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </RadioGroup>
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          color="primary"
          onPress={() => {
            setActiveTab('physicalStats')
          }}
          type="submit"
        >
          Continue
          <ChevronRight className="ml-1 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
