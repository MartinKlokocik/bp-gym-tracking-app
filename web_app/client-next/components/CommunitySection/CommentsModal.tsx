import { ModalBody, ModalContent, ModalHeader } from '@heroui/react'
import { Modal } from '@heroui/react'
import { User } from 'next-auth'

import CommentCard from './Components/CommentCard'
import NewComment from './Components/NewComment'

import { Comment } from '@/types/CommunitySection'
type CommentsModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  comments: Comment[]
  postId: string
  user: User
  refetchPosts: () => void
}

export default function CommentsModal({
  isOpen,
  onOpenChange,
  comments,
  postId,
  user,
  refetchPosts,
}: CommentsModalProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        className="h-auto overflow-y-auto"
        scrollBehavior="inside"
      >
        <ModalContent className="pb-6">
          <ModalHeader className="flex flex-col gap-1">Comments</ModalHeader>
          <ModalBody>
            <NewComment
              postId={postId}
              user={user}
              refetchPosts={refetchPosts}
            />
            {comments.map(comment => (
              <CommentCard
                key={comment.id}
                comment={comment}
                refetchPosts={refetchPosts}
                userId={user.id}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
