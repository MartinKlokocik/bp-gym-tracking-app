import { gql } from '@apollo/client'

export const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      content
      image
      tags
      attachedWorkoutPlan
      createdAt
      updatedAt
      isDeleted
    }
  }
`

export const GET_TRENDING_POSTS = gql`
  query GetTrendingPosts {
    getTrendingPosts {
      id
      title
      content
      image
      tags
      attachedWorkoutPlan
      createdAt
      updatedAt
      isDeleted
      user {
        id
        name
        profilePicture
      }
      comments {
        id
        content
        createdAt
        updatedAt
        isDeleted
      }

      reactions {
        id
        type
        createdAt
        updatedAt
        isDeleted
      }

      likesCount
      dislikesCount
      commentsCount
    }
  }
`

export const GET_RECENT_POSTS = gql`
  query GetRecentPosts {
    getRecentPosts {
      id
      title
      content
      image
      tags
      attachedWorkoutPlan
      createdAt
      updatedAt
      isDeleted
      user {
        id
        name
        profilePicture
      }
      comments {
        id
        content
        createdAt
        updatedAt
        isDeleted
      }

      reactions {
        id
        type
        createdAt
        updatedAt
        isDeleted
      }

      likesCount
      dislikesCount
      commentsCount
    }
  }
`

export const GET_MY_POSTS = gql`
  query GetMyPosts($userId: String!) {
    getMyPosts(userId: $userId) {
      id
      title
      content
      image
      tags
      attachedWorkoutPlan
      createdAt
      updatedAt
      isDeleted
      user {
        id
        name
        profilePicture
      }
      comments {
        id
        content
        createdAt
        updatedAt
        isDeleted
      }

      reactions {
        id
        type
        createdAt
        updatedAt
        isDeleted
      }

      likesCount
      dislikesCount
      commentsCount
    }
  }
`
