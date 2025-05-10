import { Image } from '@heroui/react'
import { Textarea } from '@heroui/react'
import { Button } from '@heroui/react'
import { Plus } from 'lucide-react'
export default function NewPost() {
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
        <Textarea
          placeholder="What's on your mind?"
          className="text-2xl font-medium"
          variant="bordered"
          radius="full"
        />
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
        <Button color="primary" className="text-lg">
          Post
        </Button>
      </div>
    </div>
  )
}
