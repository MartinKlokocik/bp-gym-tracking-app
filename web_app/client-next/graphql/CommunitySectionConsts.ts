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
        user {
          id
          name
          profilePicture
        }
        isLiked
        isDisliked
        likesCount
        dislikesCount
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
        user {
          id
          name
          profilePicture
        }
        isLiked
        isDisliked
        likesCount
        dislikesCount
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
        user {
          id
          name
          profilePicture
        }
        isLiked
        isDisliked
        likesCount
        dislikesCount
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

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
      id
      content
      createdAt
      updatedAt
      isDeleted
      postId
      userId
    }
  }
`

export const HIT_LIKE_COMMENT = gql`
  mutation HitLikeComment($commentId: String!, $userId: String!) {
    hitLikeComment(commentId: $commentId, userId: $userId)
  }
`

export const HIT_DISLIKE_COMMENT = gql`
  mutation HitDislikeComment($commentId: String!, $userId: String!) {
    hitDislikeComment(commentId: $commentId, userId: $userId)
  }
`

export const SAVE_WORKOUT_TO_MY_PLANS = gql`
  mutation SaveWorkoutToMyPlans($userId: String!, $workoutPlanId: String!) {
    saveWorkoutToMyPlans(userId: $userId, workoutPlanId: $workoutPlanId)
  }
`
