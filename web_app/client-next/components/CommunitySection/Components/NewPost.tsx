import { useMutation } from '@apollo/client'
import { Image, Input, useDisclosure } from '@heroui/react'
import { Textarea } from '@heroui/react'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import TagInput from './TagInput'
import WorkoutAttachmentModal from './WorkoutAttachmentModal'
import WorkoutPhotoUploadModal from './WorkoutPhotoUploadModal'

import { CREATE_POST } from '@/graphql/CommunitySectionConsts'
import { NewPost as NewPostType, postSchema } from '@/types/CommunitySection'
import { uploadImage } from '@/utils/upload-image'
export default function NewPost({
  user,
  refetchPosts,
}: {
  user: User
  refetchPosts: () => void
}) {
  const [createPost, { loading, error }] = useMutation(CREATE_POST)
  const {
    isOpen: isWorkoutAttachmentOpen,
    onOpenChange: onWorkoutAttachmentOpenChange,
  } = useDisclosure()
  const {
    isOpen: isWorkoutPhotoUploadOpen,
    onOpenChange: onWorkoutPhotoUploadOpenChange,
  } = useDisclosure()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

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
      tags: [],
    },
  })

  const onSubmit = async (formData: NewPostType) => {
    try {
      let imageUrl = ''

      try {
        if (file) {
          imageUrl = await uploadImage(file, 'post_images')
        }
      } catch (e) {
        console.error(e)
        toast.error('Upload failed')
      }

      await createPost({
        variables: {
          input: {
            ...formData,
            image: imageUrl,
          },
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
        tags: [],
      })
      setFile(null)
      setPreview(null)
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
      <div className="flex flex-col gap-1 md:gap-2 w-full h-full p-3 md:p-4 bg-gray-900 rounded-xl md:rounded-2xl">
        <div className="flex justify-start items-center gap-2 md:gap-4">
          <Image
            src={user.image || '/avatar.png'}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-full hidden md:block"
          />
          <div className="flex flex-col gap-1 md:gap-2 w-full">
            <Input
              {...register('title')}
              value={watch('title')}
              placeholder="Title"
              className="text-lg md:text-2xl font-medium"
              variant="bordered"
              radius="full"
              errorMessage={errors.title?.message}
            />
            <Textarea
              {...register('content')}
              value={watch('content')}
              placeholder="What's on your mind?"
              className="text-lg md:text-2xl font-medium"
              variant="bordered"
              radius="full"
              errorMessage={errors.content?.message}
            />
            <TagInput
              tags={(watch('tags') || []) as string[]}
              onTagsChange={(value: string[]) => setValue('tags', value)}
              error={errors.tags?.message}
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <Plus
                onClick={onWorkoutPhotoUploadOpenChange}
                className="cursor-pointer w-4 h-4 md:w-5 md:h-5"
              />
              <p className="text-xs md:text-sm">Photo</p>
            </div>
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <Plus
                onClick={onWorkoutAttachmentOpenChange}
                className="cursor-pointer w-4 h-4 md:w-5 md:h-5"
              />
              <p className="text-xs md:text-sm">Workout</p>
            </div>
          </div>
          <Button
            color="primary"
            className="text-sm md:text-lg"
            size="sm"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? (
              <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
            ) : (
              'Post'
            )}
          </Button>
        </div>
      </div>
      <WorkoutAttachmentModal
        isOpen={isWorkoutAttachmentOpen}
        onOpenChange={onWorkoutAttachmentOpenChange}
        user={user}
        setValue={setValue}
        watch={watch}
      />
      <WorkoutPhotoUploadModal
        isOpen={isWorkoutPhotoUploadOpen}
        onOpenChange={onWorkoutPhotoUploadOpenChange}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
      />
    </>
  )
}
