import { gql } from '@apollo/client'

export const PAIR_DEVICE = gql`
  mutation PairDevice($deviceUUID: String!, $userId: String!) {
    pairDevice(deviceUUID: $deviceUUID, userId: $userId)
  }
`

export const IS_USER_PAIRED = gql`
  query IsUserPaired($userId: String!) {
    isUserPaired(userId: $userId)
  }
`

export const UNPAIR_USER = gql`
  mutation UnpairUser($userId: String!) {
    unpairUser(userId: $userId)
  }
`
