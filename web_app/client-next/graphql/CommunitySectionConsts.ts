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
  query GetTrendingPosts($userId: String!) {
    getTrendingPosts(userId: $userId) {
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
      isLiked
      isDisliked
      isUserCreator
    }
  }
`

export const GET_RECENT_POSTS = gql`
  query GetRecentPosts($userId: String!) {
    getRecentPosts(userId: $userId) {
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
      isLiked
      isDisliked
      isUserCreator
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
      isLiked
      isDisliked
      isUserCreator
    }
  }
`

export const HIT_LIKE_POST = gql`
  mutation HitLikePost($postId: String!, $userId: String!) {
    hitLikePost(postId: $postId, userId: $userId)
  }
`

export const HIT_DISLIKE_POST = gql`
  mutation HitDislikePost($postId: String!, $userId: String!) {
    hitDislikePost(postId: $postId, userId: $userId)
  }
`
