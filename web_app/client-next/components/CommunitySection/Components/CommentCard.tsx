import { useMutation } from '@apollo/client'
import { Image } from '@heroui/react'
import { format } from 'date-fns'
import { Heart, ThumbsDown } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import {
  HIT_LIKE_COMMENT,
  HIT_DISLIKE_COMMENT,
} from '@/graphql/CommunitySectionConsts'
import { Comment } from '@/types/CommunitySection'

export default function CommentCard({
  comment,
  refetchPosts,
  userId,
}: {
  comment: Comment
  refetchPosts: () => void
  userId: string
}) {
  const [hitLikeComment, { error: likeError }] = useMutation(HIT_LIKE_COMMENT)
  const [hitDislikeComment, { error: dislikeError }] =
    useMutation(HIT_DISLIKE_COMMENT)

  useEffect(() => {
    if (likeError) {
      toast.error(`Error liking comment: ${likeError.message}`)
    }
    if (dislikeError) {
      toast.error(`Error disliking comment: ${dislikeError.message}`)
    }
  }, [likeError, dislikeError])

  const handleLikeComment = async () => {
    await hitLikeComment({
      variables: {
        commentId: comment.id,
        userId: userId,
      },
    })
    refetchPosts()
  }

  console.log(comment)

  const handleDislikeComment = async () => {
    await hitDislikeComment({
      variables: {
        commentId: comment.id,
        userId: userId,
      },
    })
    refetchPosts()
  }
  return (
    <div className="flex gap-4">
      <Image
        src={comment.user.profilePicture || '/user.png'}
        alt={comment.user.name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{comment.user.name}</p>
          <p className="text-xs text-gray-400">
            {format(
              new Date(parseInt(comment.createdAt)),
              'hh:mm a, MMM d, yyyy'
            )}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-400">{comment.content}</p>
          <div className="flex justify-start items-center gap-2">
            <div className="flex items-center gap-1">
              <Heart
                className="w-3 h-3 cursor-pointer"
                color={comment.isLiked ? 'red' : 'white'}
                onClick={handleLikeComment}
              />
              <p className="text-sm text-gray-200">{comment.likesCount || 0}</p>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsDown
                className="w-3 h-3 cursor-pointer"
                color={comment.isDisliked ? 'red' : 'white'}
                onClick={handleDislikeComment}
              />
              <p className="text-sm text-gray-200">
                {comment.dislikesCount || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
