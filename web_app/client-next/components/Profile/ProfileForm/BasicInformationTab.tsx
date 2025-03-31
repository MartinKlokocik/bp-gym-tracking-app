import { Radio, RadioGroup, Button, Input, Image } from '@heroui/react'
import { ChevronRight } from 'lucide-react'

import { UserProfile } from '../ProfileForm'

type BasicInformationTabProps = {
  profile: UserProfile
  handleChange: (field: string, value: any) => void
  setActiveTab: (tab: string) => void
}

export const BasicInformationTab = ({
  profile,
  handleChange,
  setActiveTab,
}: BasicInformationTabProps) => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-800 border-2 border-purple-500 flex items-center justify-center overflow-hidden">
            <Image className="w-12 h-12 text-gray-600" />
          </div>
          <Button
            size="sm"
            color="primary"
            className="absolute bottom-0 right-0 rounded-full"
          >
            Upload
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          value={profile.firstName}
          onChange={e => handleChange('firstName', e.target.value)}
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
          type="email"
          value={profile.lastName}
          onChange={e => handleChange('lastName', e.target.value)}
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
          value={profile.dateOfBirth}
          onChange={e => handleChange('dateOfBirth', e.target.value)}
          className="rounded-lg border border-gray-700 h-10"
          classNames={{
            inputWrapper: 'bg-gray-800',
            input: 'bg-gray-800',
          }}
          label="Date of Birth"
          labelPlacement="outside"
        />

        <RadioGroup
          value={profile.gender}
          onValueChange={value => handleChange('gender', value)}
          className="flex space-x-6 mt-2"
        >
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </RadioGroup>
      </div>
      <div className="mt-8 flex justify-end">
        <Button color="primary" onClick={() => setActiveTab('physicalStats')}>
          Continue
          <ChevronRight className="ml-1 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
