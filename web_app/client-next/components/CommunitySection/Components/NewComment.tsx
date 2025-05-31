import { useMutation } from '@apollo/client'
import { Button, Textarea, Image } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'next-auth'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { CREATE_COMMENT } from '@/graphql/CommunitySectionConsts'
import {
  commentCreationSchema,
  CommentCreation,
} from '@/types/CommunitySection'

export default function NewComment({
  postId,
  refetchPosts,
  user,
}: {
  postId: string
  refetchPosts: () => void
  user: User
}) {
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT)

  useEffect(() => {
    if (error) {
      toast.error('Error creating comment')
    }
  }, [error])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentCreation>({
    resolver: zodResolver(commentCreationSchema),
    defaultValues: {
      postId,
      userId: user.id,
      content: '',
    },
  })

  const onSubmit = async (data: CommentCreation) => {
    await createComment({ variables: { input: data } })
    reset()
    refetchPosts()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <div className="flex items-center gap-2">
        <Image
          src={user.image}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full hidden md:block"
        />
        <Textarea
          placeholder="Add a comment"
          {...register('content')}
          errorMessage={errors.content?.message}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </form>
  )
}
