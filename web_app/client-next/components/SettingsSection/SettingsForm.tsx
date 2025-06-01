'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  IS_USER_PAIRED,
  PAIR_DEVICE,
  UNPAIR_USER,
} from '@/graphql/AppleWatchConsts'

const devicePairingSchema = z.object({
  userId: z.string().nonempty({ message: 'User ID is required' }),
  deviceUUID: z
    .string()
    .nonempty({ message: 'Device UUID is required' })
    .max(6, { message: 'Device UUID must be less than 6 characters' }),
})

type DevicePairingType = z.infer<typeof devicePairingSchema>

export default function SettingsForm({ userId }: { userId: string }) {
  const { data: isUserPaired, refetch: refetchIsUserPaired } = useQuery(
    IS_USER_PAIRED,
    {
      variables: { userId },
    }
  )
  const [pairDevice, { loading: isPairing }] = useMutation(PAIR_DEVICE)
  const [unpairUser, { loading: isUnpairing }] = useMutation(UNPAIR_USER)

  const formMethods = useForm<DevicePairingType>({
    resolver: zodResolver(devicePairingSchema),
    defaultValues: {
      userId,
    },
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = formMethods

  const onSubmit = async (data: DevicePairingType) => {
    console.log(data)

    await pairDevice({ variables: data })
    await refetchIsUserPaired()

    reset({
      userId,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-10 gap-3">
      <h1 className="text-2xl font-bold">Settings</h1>
      {isUserPaired?.isUserPaired ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-xl text-gray-500">
            Device is already paired with your account.
          </p>
          <Button
            onClick={() => unpairUser({ variables: { userId } })}
            isLoading={isUnpairing}
          >
            Unpair Device
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-3"
        >
          <p className="text-xl font-bold text-gray-200">
            Pair your device to your account.
          </p>
          <Input
            {...register('deviceUUID')}
            placeholder="Enter your device code"
            className="w-full max-w-md"
            errorMessage={errors.deviceUUID?.message}
          />
          <Button type="submit" isLoading={isPairing}>
            Pair Device
          </Button>
        </form>
      )}
    </div>
  )
}
