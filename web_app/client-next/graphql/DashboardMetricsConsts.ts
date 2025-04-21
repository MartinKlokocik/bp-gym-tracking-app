import { gql } from '@apollo/client'

export const GET_DASHBOARD_METRICS = gql`
  query GetDashboardMetrics($userId: String!) {
    getDashboardMetrics(userId: $userId) {
      last7DaysConsistency
      volumeLiftedInWeeks {
        weekLabel
        dateFrom
        dateTo
        volume
      }
      recentPRs {
        exerciseName
        weight
        date
      }
      muscleGroupsFocus {
        muscleGroup
        count
      }
    }
  }
`
