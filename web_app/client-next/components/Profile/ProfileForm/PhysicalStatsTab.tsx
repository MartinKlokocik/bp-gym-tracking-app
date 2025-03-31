import { Button, Slider } from '@heroui/react'
import { ChevronRight, Database, Ruler, Scale } from 'lucide-react'

import { UserProfile } from '../ProfileForm'

type PhysicalStatsTabProps = {
  profile: UserProfile
  handleChange: (field: string, value: any) => void
  setActiveTab: (tab: string) => void
}
export const PhysicalStatsTab = ({
  profile,
  handleChange,
  setActiveTab,
}: PhysicalStatsTabProps) => {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Database className="mr-2 text-purple-500 w-5 h-5" />
            Physical Measurements
          </h3>
          <p className="text-gray-400 text-sm">
            These measurements help us calculate your BMI and tailor workout
            intensity
          </p>
        </div>

        {/* Height Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <div className="flex items-center mb-4">
            <Ruler className="text-purple-500 mr-2" />
            <h4 className="text-lg font-medium">Height</h4>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <Slider
                value={profile.height}
                onChange={value => handleChange('height', value)}
                defaultValue={profile.height}
                step={1}
                minValue={60}
                maxValue={250}
                className="mb-2"
              />
              <div className="text-center text-2xl font-bold text-purple-400">
                {profile.height} cm
              </div>
            </div>
          </div>
        </div>

        {/* Weight Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <div className="flex items-center mb-4">
            <Scale className="text-purple-500 mr-2" />
            <h4 className="text-lg font-medium">Weight</h4>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <Slider
                value={profile.weight}
                onChange={value => handleChange('weight', value)}
                defaultValue={profile.weight}
                step={0.5}
                minValue={30}
                maxValue={200}
                className="mb-2"
              />
              <div className="text-center text-2xl font-bold text-purple-400">
                {profile.weight} kg
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="flat"
            color="default"
            onClick={() => setActiveTab('basicInfo')}
          >
            Back
          </Button>
          <Button
            color="primary"
            onClick={() => setActiveTab('fitnessProfile')}
          >
            Continue
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
