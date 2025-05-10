import NewPost from './Components/NewPost'
import PostCard from './Components/PostCard'
import { dummyPosts } from './DummyData'
export default function PostsSection() {
  return (
    <div className="flex flex-col gap-10 w-[90%] h-full p-10">
      <NewPost />
      {dummyPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
