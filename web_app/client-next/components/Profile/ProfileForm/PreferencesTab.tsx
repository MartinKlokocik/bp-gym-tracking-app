import { Button, Textarea } from '@heroui/react'
import { Activity, CheckCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { equipmentOptions } from '@/components/WorkoutSection/DummyData'
import { UserProfileType } from '@/types/UserProfile'

type PreferencesTabProps = {
  formMethods: UseFormReturn<UserProfileType>
  setActiveTab: (tab: string) => void
}
export const PreferencesTab = ({
  formMethods,
  setActiveTab,
}: PreferencesTabProps) => {
  const { watch, setValue } = formMethods
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Activity className="mr-2 text-purple-500 w-5 h-5" />
            Additional Preferences
          </h3>
          <p className="text-gray-400 text-sm">
            Help us tailor your experience by sharing your equipment access and
            health considerations
          </p>
        </div>

        {/* Equipment */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <h4 className="mb-3 block font-medium">Available Equipment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {equipmentOptions.map(equip => (
              <div
                key={equip.value}
                className={`flex items-center space-x-2 border ${
                  watch('availableEquipment')?.includes(equip.value)
                    ? 'border-purple-500 bg-purple-500 bg-opacity-20'
                    : 'border-gray-700'
                } rounded-lg p-3 cursor-pointer`}
                onClick={() => {
                  const newEquipment = watch('availableEquipment')?.includes(
                    equip.value
                  )
                    ? watch('availableEquipment')?.filter(
                        e => e !== equip.value
                      )
                    : [...(watch('availableEquipment') || []), equip.value]
                  setValue('availableEquipment', newEquipment)
                }}
              >
                {watch('availableEquipment')?.includes(equip.value) && (
                  <CheckCircle className="text-purple-500 w-5 h-5" />
                )}
                <span>{equip.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health Considerations */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <h4 className="text-lg font-medium mb-4">Health Considerations</h4>
          <div className="mb-4">
            <Textarea
              value={watch('healthIssues')}
              onChange={e => setValue('healthIssues', e.target.value)}
              placeholder="e.g., asthma, diabetes, heart conditions, etc."
              classNames={{
                inputWrapper: 'bg-gray-800 border border-gray-700 rounded-lg',
                input: 'bg-gray-800',
              }}
              label="Medical Conditions or Health Issues"
              labelPlacement="outside"
              rows={2}
              description="This information helps us recommend appropriate exercises"
            />
          </div>
          <div>
            <Textarea
              value={watch('injuries')}
              onChange={e => setValue('injuries', e.target.value)}
              placeholder="e.g., lower back pain, sprained ankle, shoulder issues, etc."
              classNames={{
                inputWrapper: 'bg-gray-800 border border-gray-700 rounded-lg',
                input: 'bg-gray-800',
              }}
              label="Current or Previous Injuries"
              labelPlacement="outside"
              rows={2}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="flat"
            color="default"
            onClick={e => {
              e.preventDefault()
              setActiveTab('fitnessProfile')
            }}
          >
            Back
          </Button>
          <Button type="submit" color="primary">
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
