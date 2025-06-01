import { useMutation } from '@apollo/client'
import {
  Button,
  Image,
  PopoverContent,
  PopoverTrigger,
  Popover,
  useDisclosure,
} from '@heroui/react'
import { format } from 'date-fns'
import {
  EllipsisVertical,
  Heart,
  MessageCircle,
  ThumbsDown,
} from 'lucide-react'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import CommentsModal from '../CommentsModal'

import { WorkoutDetailViewModal } from '@/components/WorkoutSection/WorkoutPlanning/WorkoutDetailViewModal'
import {
  HIT_DISLIKE_POST,
  HIT_LIKE_POST,
  SAVE_WORKOUT_TO_MY_PLANS,
  DELETE_POST,
} from '@/graphql/CommunitySectionConsts'
import { PostCard as PostCardType } from '@/types/CommunitySection'

export default function PostCard({
  post,
  user,
  refetchPosts,
}: {
  post: PostCardType
  user: User
  refetchPosts: () => void
}) {
  const { isOpen: isOpenComments, onOpenChange: onOpenChangeComments } =
    useDisclosure()
  const [isPostPopoverOpen, setIsPostPopoverOpen] = useState(false)
  const {
    isOpen: isOpenWorkoutDetailView,
    onOpenChange: onOpenChangeWorkoutDetailView,
  } = useDisclosure()
  const [hitLikePost, { error: likeError }] = useMutation(HIT_LIKE_POST)
  const [hitDislikePost, { error: dislikeError }] =
    useMutation(HIT_DISLIKE_POST)
  const [
    saveWorkoutToMyPlans,
    { data: saveWorkoutToMyPlansData, error: saveWorkoutToMyPlansError },
  ] = useMutation(SAVE_WORKOUT_TO_MY_PLANS)
  const [deletePost, { error: deletePostError }] = useMutation(DELETE_POST)

  const handleLikePost = async () => {
    await hitLikePost({ variables: { postId: post.id, userId: user.id } })
    refetchPosts()
  }

  useEffect(() => {
    if (likeError) {
      toast.error('Error liking post')
    }
    if (dislikeError) {
      toast.error('Error disliking post')
    }
    if (saveWorkoutToMyPlansError) {
      toast.error('Error saving workout to my plans')
    }
    if (saveWorkoutToMyPlansData) {
      toast.success('Workout saved successfully')
    }
    if (deletePostError) {
      toast.error('Error deleting post')
    }
  }, [
    likeError,
    dislikeError,
    saveWorkoutToMyPlansData,
    saveWorkoutToMyPlansError,
    deletePostError,
  ])

  const handleDislikePost = async () => {
    await hitDislikePost({ variables: { postId: post.id, userId: user.id } })
    refetchPosts()
  }

  const handleDeletePost = async () => {
    await deletePost({ variables: { postId: post.id } })
    setIsPostPopoverOpen(false)
    refetchPosts()
  }

  return (
    <>
      <div className="flex flex-col gap-1 md:gap-2 w-full h-full">
        <div className="flex justify-between items-center gap-1 w-full">
          <div className="flex items-center gap-2 md:gap-4">
            <Image
              src={post.user.profilePicture || '/user.png'}
              alt={post.user.name}
              width={40}
              height={40}
              className="rounded-full md:w-[60px] md:h-[60px]"
            />
            <div className="flex flex-col">
              <p className="text-lg md:text-xl font-medium">{post.user.name}</p>
              <p className="text-xs md:text-md text-gray-400">
                {format(new Date(parseInt(post.createdAt)), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          {post.isUserCreator && (
            <div className="flex items-center justify-center">
              <Popover
                placement="bottom"
                isOpen={isPostPopoverOpen}
                onOpenChange={open => {
                  setIsPostPopoverOpen(open)
                }}
              >
                <PopoverTrigger>
                  <EllipsisVertical className="w-5 h-5 md:w-6 md:h-6 cursor-pointer text-white" />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <Button
                      variant="ghost"
                      color="default"
                      size="sm"
                      onClick={handleDeletePost}
                    >
                      Delete Post
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <h2 className="text-lg md:text-2xl font-bold">{post.title}</h2>
        <p className="text-sm md:text-lg text-gray-100">{post.content}</p>
        {post.image && (
          <Image src={post.image} alt="post image" width={450} height={450} />
        )}
        {post.attachedWorkoutPlan && (
          <div className="flex gap-2 mt-2 md:mt-3 flex-col md:flex-row md:items-center">
            <Button
              color="default"
              className="cursor-pointer text-xs md:text-sm"
              size="sm"
              onClick={onOpenChangeWorkoutDetailView}
            >
              View Attached Workout Plan
            </Button>
            <Button
              color="default"
              className="cursor-pointer text-xs md:text-sm"
              size="sm"
              onClick={() => {
                saveWorkoutToMyPlans({
                  variables: {
                    userId: user.id,
                    workoutPlanId: post.attachedWorkoutPlan,
                  },
                })
              }}
            >
              Save to My Plans
            </Button>
          </div>
        )}

        <div className="flex justify-start items-center gap-1 mt-1 flex-wrap">
          {post.tags.map(tag => (
            <div
              key={tag}
              className="flex items-center gap-1 md:gap-2 bg-blue-600 px-2 md:px-3 py-1 rounded-md"
            >
              <p className="text-xs md:text-md text-white">#{tag}</p>
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-gray-200 my-1 md:my-2" />

        <div className="flex justify-start items-center gap-3 md:gap-5">
          <div className="flex items-center gap-1">
            <Heart
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
              onClick={handleLikePost}
              color={post.isLiked ? 'red' : 'white'}
            />
            <p className="text-sm md:text-md text-gray-200">
              {post.likesCount}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
              onClick={handleDislikePost}
              color={post.isDisliked ? 'red' : 'white'}
            />
            <p className="text-sm md:text-md text-gray-200">
              {post.dislikesCount}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
              onClick={onOpenChangeComments}
            />
            <p className="text-sm md:text-md text-gray-200">
              {post.commentsCount}
            </p>
          </div>
        </div>
      </div>
      <CommentsModal
        isOpen={isOpenComments}
        onOpenChange={onOpenChangeComments}
        comments={post.comments}
        postId={post.id}
        user={user}
        refetchPosts={refetchPosts}
      />
      {post.attachedWorkoutPlan && (
        <WorkoutDetailViewModal
          isOpen={isOpenWorkoutDetailView}
          onOpenChange={onOpenChangeWorkoutDetailView}
          selectedWorkoutPlanId={post.attachedWorkoutPlan}
          isPreview={true}
        />
      )}
    </>
  )
}
