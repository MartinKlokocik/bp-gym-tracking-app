import {
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Slider,
} from '@heroui/react'
import {
  Activity,
  Calendar,
  CheckCircle,
  ChevronRight,
  Medal,
  Target,
} from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { goalOptions } from '@/components/WorkoutSection/DummyData'
import { UserProfileType } from '@/types/UserProfile'

type FitnessProfileTabProps = {
  formMethods: UseFormReturn<UserProfileType>
  setActiveTab: (tab: string) => void
}
export const FitnessProfileTab = ({
  formMethods,
  setActiveTab,
}: FitnessProfileTabProps) => {
  const { watch, setValue } = formMethods

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Activity className="mr-2 text-purple-500 w-5 h-5" />
            Fitness Level & Goals
          </h3>
          <p className="text-gray-400 text-sm">
            This information helps us tailor workout plans to your experience
            and objectives
          </p>
        </div>

        {/* Fitness Level Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <div className="flex items-center mb-4">
            <Medal className="text-purple-500 mr-2" />
            <h4 className="text-lg font-medium">Fitness Level</h4>
          </div>

          <RadioGroup
            value={watch('fitnessLevel')}
            onValueChange={value => {
              setValue('fitnessLevel', value)
            }}
            classNames={{
              wrapper: 'flex flex-col gap-6 mb-4 mt-2',
            }}
          >
            {/* BEGINNER */}
            <Radio
              value="BEGINNER"
              description="New to fitness or returning after a long break"
              className={`border ${
                watch('fitnessLevel') === 'BEGINNER'
                  ? 'border-purple-500'
                  : 'border-gray-700'
              } rounded-lg p-4 cursor-pointer`}
            >
              <span className="font-semibold">Beginner</span>
            </Radio>

            {/* INTERMEDIATE */}
            <Radio
              value="INTERMEDIATE"
              description="Consistent workout routine for 6+ months"
              className={`border ${
                watch('fitnessLevel') === 'INTERMEDIATE'
                  ? 'border-purple-500'
                  : 'border-gray-700'
              } rounded-lg p-4 cursor-pointer`}
            >
              <span className="font-semibold">Intermediate</span>
            </Radio>

            {/* ADVANCED */}
            <Radio
              value="ADVANCED"
              description="Serious training for 2+ years with good results"
              className={`border ${
                watch('fitnessLevel') === 'ADVANCED'
                  ? 'border-purple-500'
                  : 'border-gray-700'
              } rounded-lg p-4 cursor-pointer`}
            >
              <span className="font-semibold">Advanced</span>
            </Radio>

            {/* EXPERT */}
            <Radio
              value="EXPERT"
              description="5+ years of focused training, significant achievements"
              className={`border ${
                watch('fitnessLevel') === 'EXPERT'
                  ? 'border-purple-500'
                  : 'border-gray-700'
              } rounded-lg p-4 cursor-pointer`}
            >
              <span className="font-semibold">Expert</span>
            </Radio>
          </RadioGroup>

          <div className="mt-4">
            <h4 className="text-lg font-medium mb-4">
              Years of Training Experience
            </h4>
            <Slider
              value={watch('yearsOfExperience')}
              onChange={value => setValue('yearsOfExperience', value as number)}
              aria-label="Years of Training Experience"
              defaultValue={0}
              step={0.5}
              minValue={0}
              maxValue={20}
              className="mb-2"
            />
            <div className="text-center">
              <span className="text-lg font-medium text-purple-400">
                {watch('yearsOfExperience')}{' '}
                {watch('yearsOfExperience') === 1 ? 'year' : 'years'}
              </span>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <div className="flex items-center mb-4">
            <Target className="text-purple-500 mr-2" />
            <h4 className="text-lg font-medium">Fitness Goals</h4>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium mb-4">Primary Goal</h4>
            <Select
              selectedKeys={[watch('primaryGoal') || '']}
              onChange={e => {
                setValue('primaryGoal', e.target.value)
              }}
              aria-label="Primary Goal"
              className="rounded-lg border border-gray-700"
              classNames={{
                trigger: 'bg-gray-800',
                listbox: 'bg-gray-800',
              }}
              placeholder="Select a goal"
            >
              {goalOptions.map(goal => (
                <SelectItem key={goal.value}>{goal.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium mb-4">
              Secondary Goals (Up to 3)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {goalOptions
                .filter(goal => goal.value !== watch('primaryGoal'))
                .map(goal => (
                  <div
                    key={goal.value}
                    className={`flex items-center space-x-2 border ${
                      watch('secondaryGoals')?.includes(goal.value)
                        ? 'border-purple-500 bg-purple-500 bg-opacity-20'
                        : 'border-gray-700'
                    } rounded-lg p-3 cursor-pointer`}
                    onClick={() => {
                      const newGoals = watch('secondaryGoals')?.includes(
                        goal.value
                      )
                        ? watch('secondaryGoals')?.filter(g => g !== goal.value)
                        : [
                            ...(watch('secondaryGoals') || []),
                            goal.value,
                          ].slice(0, 3)
                      setValue('secondaryGoals', newGoals)
                    }}
                  >
                    {watch('secondaryGoals')?.includes(goal.value) && (
                      <CheckCircle className="text-purple-500 w-5 h-5" />
                    )}
                    <span>{goal.label}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Workout Preferences */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <div className="flex items-center mb-4">
            <Calendar className="text-purple-500 mr-2" />
            <h4 className="text-lg font-medium">Workout Schedule</h4>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium mb-4">
              Preferred Workout Days Per Week
            </h4>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
            </div>
            <Slider
              value={watch('preferredWorkoutDays')}
              onChange={value =>
                setValue('preferredWorkoutDays', value as number)
              }
              aria-label="Preferred Workout Days Per Week"
              defaultValue={1}
              minValue={1}
              maxValue={7}
              step={1}
              className="mb-2"
            />
            <div className="text-center">
              <span className="text-lg font-medium text-purple-400">
                {watch('preferredWorkoutDays')}{' '}
                {watch('preferredWorkoutDays') === 1 ? 'day' : 'days'} per week
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">
              Workout Duration (minutes)
            </h4>
            <Slider
              value={watch('workoutDuration')}
              onChange={value => setValue('workoutDuration', value as number)}
              aria-label="Workout Duration"
              defaultValue={15}
              step={15}
              minValue={15}
              maxValue={240}
              className="mb-2"
            />
            <div className="text-center">
              <span className="text-lg font-medium text-purple-400">
                {watch('workoutDuration')} minutes
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="flat"
            color="default"
            onClick={e => {
              e.preventDefault()
              setActiveTab('physicalStats')
            }}
          >
            Back
          </Button>
          <Button
            color="primary"
            onPress={() => {
              setActiveTab('preferences')
            }}
          >
            Continue
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
