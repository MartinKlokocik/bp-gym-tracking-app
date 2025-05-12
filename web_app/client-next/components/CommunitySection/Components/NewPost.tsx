import { useMutation } from '@apollo/client'
import { Image, Input } from '@heroui/react'
import { Textarea } from '@heroui/react'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { User } from 'next-auth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { CREATE_POST } from '@/graphql/CommunitySectionConsts'
import { NewPost as NewPostType, postSchema } from '@/types/CommunitySection'

export default function NewPost({
  user,
  refetchPosts,
}: {
  user: User
  refetchPosts: () => void
}) {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPostType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      userId: user.id,
    },
  })

  const onSubmit = async (formData: NewPostType) => {
    console.log('Form Submitted:', formData)

    await createPost({
      variables: {
        input: formData,
      },
    })

    if (data) {
      toast.success('Post created successfully')
      refetchPosts()
    } else if (error) {
      toast.error('Failed to create post')
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 bg-gray-900 rounded-2xl">
      <div className="flex justify-start items-center gap-4">
        <Image
          src="https://lbxmtenbmntnpvhgoayu.supabase.co/storage/v1/object/public/gym-tracking-app/avatar/5c539c52-f21a-44c3-81b8-52c41fcd5d72.png"
          alt="avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2 w-full">
          <Input
            {...register('title')}
            placeholder="Title"
            className="text-2xl font-medium"
            variant="bordered"
            radius="full"
            errorMessage={errors.title?.message}
          />
          <Textarea
            {...register('content')}
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
            <Plus />
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
  )
}
