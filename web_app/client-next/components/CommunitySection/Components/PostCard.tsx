import { Image } from '@heroui/react'
import { format } from 'date-fns'
import { Heart, MessageCircle, ThumbsDown } from 'lucide-react'

import { PostCard as PostCardType } from '@/types/CommunitySection'

export default function PostCard({ post }: { post: PostCardType }) {
  return (
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
          <p className="text-md text-gray-200">{post.likesCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsDown className="w-6 h-6" />
          <p className="text-md text-gray-200">{post.dislikesCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-6 h-6" />
          <p className="text-md text-gray-200">{post.commentsCount}</p>
        </div>
      </div>
    </div>
  )
}
