import { useMutation } from '@apollo/client'
import { Button, Image, useDisclosure } from '@heroui/react'
import { format } from 'date-fns'
import { Heart, MessageCircle, ThumbsDown } from 'lucide-react'
import { User } from 'next-auth'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import CommentsModal from '../CommentsModal'

import { WorkoutDetailViewModal } from '@/components/WorkoutSection/WorkoutPlanning/WorkoutDetailViewModal'
import {
  HIT_DISLIKE_POST,
  HIT_LIKE_POST,
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
  const {
    isOpen: isOpenWorkoutDetailView,
    onOpenChange: onOpenChangeWorkoutDetailView,
  } = useDisclosure()
  const [hitLikePost, { error: likeError }] = useMutation(HIT_LIKE_POST)
  const [hitDislikePost, { error: dislikeError }] =
    useMutation(HIT_DISLIKE_POST)
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
  }, [likeError, dislikeError])

  const handleDislikePost = async () => {
    await hitDislikePost({ variables: { postId: post.id, userId: user.id } })
    refetchPosts()
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="flex justify-start items-center gap-1">
          <div className="flex items-center gap-4">
            <Image
              src={post.user.profilePicture || '/user.png'}
              alt={post.user.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-xl font-medium">{post.user.name}</p>
              <p className="text-md text-gray-400">
                {format(new Date(parseInt(post.createdAt)), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-lg text-gray-100">{post.content}</p>
        {post.attachedWorkoutPlan && (
          <div className="flex items-center gap-2 mt-3">
            <Button
              color="default"
              className="cursor-pointer"
              onClick={onOpenChangeWorkoutDetailView}
            >
              View Attached Workout Plan
            </Button>
            <Button
              color="default"
              className="cursor-pointer"
              onClick={() => {}}
            >
              Save to My Plans
            </Button>
          </div>
        )}

        <div className="flex justify-start items-center gap-1 mt-1">
          {post.tags.map(tag => (
            <div
              key={tag}
              className="flex items-center gap-2 bg-gray-300 px-3 py-1 rounded-md"
            >
              <p className="text-md text-black">#{tag}</p>
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-gray-200 my-2" />

        <div className="flex justify-start items-center gap-5">
          <div className="flex items-center gap-1">
            <Heart
              className="w-6 h-6 cursor-pointer"
              onClick={handleLikePost}
              color={post.isLiked ? 'red' : 'white'}
            />
            <p className="text-md text-gray-200">{post.likesCount}</p>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown
              className="w-6 h-6 cursor-pointer"
              onClick={handleDislikePost}
              color={post.isDisliked ? 'red' : 'white'}
            />
            <p className="text-md text-gray-200">{post.dislikesCount}</p>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle
              className="w-6 h-6 cursor-pointer"
              onClick={onOpenChangeComments}
            />
            <p className="text-md text-gray-200">{post.commentsCount}</p>
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
