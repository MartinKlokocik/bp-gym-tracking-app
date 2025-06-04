import { useMutation } from '@apollo/client'
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react'
import { format } from 'date-fns'
import { EllipsisVertical, Heart, ThumbsDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  HIT_LIKE_COMMENT,
  HIT_DISLIKE_COMMENT,
  DELETE_COMMENT,
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
  const [isCommentPopoverOpen, setIsCommentPopoverOpen] = useState(false)
  const [hitLikeComment, { error: likeError }] = useMutation(HIT_LIKE_COMMENT)
  const [hitDislikeComment, { error: dislikeError }] =
    useMutation(HIT_DISLIKE_COMMENT)
  const [deleteComment, { error: deleteCommentError }] =
    useMutation(DELETE_COMMENT)

  useEffect(() => {
    if (likeError) {
      toast.error(`Error liking comment: ${likeError.message}`)
    }
    if (dislikeError) {
      toast.error(`Error disliking comment: ${dislikeError.message}`)
    }
    if (deleteCommentError) {
      toast.error(`Error deleting comment: ${deleteCommentError.message}`)
    }
  }, [likeError, dislikeError, deleteCommentError])

  const handleLikeComment = async () => {
    await hitLikeComment({
      variables: {
        commentId: comment.id,
        userId: userId,
      },
    })
    refetchPosts()
  }

  const handleDislikeComment = async () => {
    await hitDislikeComment({
      variables: {
        commentId: comment.id,
        userId: userId,
      },
    })
    refetchPosts()
  }

  const handleDeleteComment = async () => {
    await deleteComment({ variables: { commentId: comment.id } })
    setIsCommentPopoverOpen(false)
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
      <div className="flex flex-col gap-1 w-full pr-2">
        <div className="flex justify-between items-center gap-1 w-full">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{comment.user.name}</p>
            <p className="text-xs text-gray-400">
              {format(
                new Date(parseInt(comment.createdAt)),
                'hh:mm a, MMM d, yyyy'
              )}
            </p>
          </div>

          {comment.isUserCreator && (
            <div className="flex items-center justify-center">
              <Popover
                placement="bottom"
                isOpen={isCommentPopoverOpen}
                onOpenChange={open => {
                  setIsCommentPopoverOpen(open)
                }}
              >
                <PopoverTrigger>
                  <EllipsisVertical className="w-4 h-4 md:w-5 md:h-5 cursor-pointer text-white" />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <Button
                      variant="ghost"
                      color="default"
                      size="sm"
                      onClick={handleDeleteComment}
                    >
                      Delete Comment
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
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
