import { useMutation } from '@apollo/client'
import { Image, Input, useDisclosure } from '@heroui/react'
import { Textarea } from '@heroui/react'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { User } from 'next-auth'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import WorkoutAttachmentModal from './WorkoutAttachmentModal'

import { CREATE_POST } from '@/graphql/CommunitySectionConsts'
import { NewPost as NewPostType, postSchema } from '@/types/CommunitySection'
export default function NewPost({
  user,
  refetchPosts,
}: {
  user: User
  refetchPosts: () => void
}) {
  const [createPost, { loading, error }] = useMutation(CREATE_POST)
  const { isOpen, onOpenChange } = useDisclosure()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewPostType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      userId: user.id,
      title: '',
      attachedWorkoutPlan: '',
      content: '',
      image: '',
    },
  })

  const onSubmit = async (formData: NewPostType) => {
    console.log('Form Submitted:', formData)

    try {
      await createPost({
        variables: {
          input: formData,
        },
      })

      toast.success('Post created successfully')
      refetchPosts()
      reset({
        userId: user.id,
        title: '',
        attachedWorkoutPlan: '',
        content: '',
        image: '',
      })
    } catch (error) {
      toast.error('Failed to create post')
      console.error('Mutation error:', error)
    }
  }

  useEffect(() => {
    if (errors) {
      console.log(errors)
    }
    if (error) {
      console.log(error)
    }
  }, [errors, error])

  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full p-4 bg-gray-900 rounded-2xl">
        <div className="flex justify-start items-center gap-4">
          <Image
            src={user.image || '/avatar.png'}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2 w-full">
            <Input
              {...register('title')}
              value={watch('title')}
              placeholder="Title"
              className="text-2xl font-medium"
              variant="bordered"
              radius="full"
              errorMessage={errors.title?.message}
            />
            <Textarea
              {...register('content')}
              value={watch('content')}
              placeholder="What's on your mind?"
              className="text-2xl font-medium"
              variant="bordered"
              radius="full"
              errorMessage={errors.content?.message}
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <Plus />
              <p>Photo</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Plus onClick={onOpenChange} className="cursor-pointer" />
              <p>Workout</p>
            </div>
          </div>
          <Button
            color="primary"
            className="text-lg"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post'}
          </Button>
        </div>
      </div>
      <WorkoutAttachmentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        user={user}
        setValue={setValue}
        watch={watch}
      />
    </>
  )
}
