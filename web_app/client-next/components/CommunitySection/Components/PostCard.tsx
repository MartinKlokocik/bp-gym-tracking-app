import { Image } from '@heroui/react'
import { Heart, MessageCircle } from 'lucide-react'

import { Post } from '../DummyData'

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex justify-start items-center gap-1">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.image || ''}
            alt={post.user.name}
            width={70}
            height={70}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-xl font-medium">{post.user.name}</p>
            <p className="text-md text-gray-400">
              {post.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-lg text-gray-100">{post.content}</p>

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
          <Heart className="w-6 h-6" />
          <p className="text-md text-gray-200">{post.reactions.length}</p>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-6 h-6" />
          <p className="text-md text-gray-200">{post.comments.length}</p>
        </div>
      </div>
    </div>
  )
}
