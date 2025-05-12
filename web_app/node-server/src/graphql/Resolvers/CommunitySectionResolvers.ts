import { PrismaClient, ReactionTarget, ReactionType } from "@prisma/client";

const prisma = new PrismaClient();

const buildPostCounts = (posts: any[], userId: string) => {
  return posts.map((post) => ({
    ...post,
    likesCount: post.reactions.filter((r: any) => r.type === ReactionType.LIKE)
      .length,
    dislikesCount: post.reactions.filter(
      (r: any) => r.type === ReactionType.DISLIKE
    ).length,
    commentsCount: post.comments.length,
    user: {
      ...post.user,
      profilePicture: post.user.profile?.profilePicture,
    },
    isLiked: post.reactions.some(
      (r: any) => r.userId === userId && r.type === ReactionType.LIKE
    ),
    isDisliked: post.reactions.some(
      (r: any) => r.userId === userId && r.type === ReactionType.DISLIKE
    ),
    isUserCreator: post.userId === userId,
  }));
};

const resolvers = {
  Query: {
    getTrendingPosts: async (_: unknown, { userId }: { userId: string }) => {
      const posts = await prisma.post.findMany({
        where: {
          isDeleted: false,
        },
        include: {
          reactions: true,
          comments: true,
          user: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  profilePicture: true,
                },
              },
            },
          },
        },
        orderBy: [
          {
            reactions: {
              _count: "desc",
            },
          },
          {
            comments: {
              _count: "desc",
            },
          },
          {
            createdAt: "desc",
          },
        ],
      });

      const postsWithCounts = buildPostCounts(posts, userId);

      return postsWithCounts;
    },

    getRecentPosts: async (_: unknown, { userId }: { userId: string }) => {
      const posts = await prisma.post.findMany({
        where: {
          isDeleted: false,
        },
        include: {
          reactions: true,
          comments: true,
          user: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  profilePicture: true,
                },
              },
            },
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      const postsWithCounts = buildPostCounts(posts, userId);

      return postsWithCounts;
    },

    getMyPosts: async (_: unknown, { userId }: { userId: string }) => {
      const posts = await prisma.post.findMany({
        where: {
          isDeleted: false,
          userId: userId,
        },
        include: {
          reactions: true,
          comments: true,
          user: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  profilePicture: true,
                },
              },
            },
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      const postsWithCounts = buildPostCounts(posts, userId);

      return postsWithCounts;
    },
  },
  Mutation: {
    createPost: async (
      _: unknown,
      {
        input,
      }: {
        input: {
          userId: string;
          title: string;
          content: string;
          image?: string;
          tags?: string[];
          attachedWorkoutPLan?: string;
        };
      }
    ) => {
      const { userId, title, content, image, tags, attachedWorkoutPLan } =
        input;

      const post = await prisma.post.create({
        data: {
          userId,
          title,
          content,
          image,
          tags,
          attachedWorkoutPLan,
        },
      });

      return post;
    },

    hitLikePost: async (
      _: unknown,
      { postId, userId }: { postId: string; userId: string }
    ) => {
      const existingReaction = await prisma.reaction.findFirst({
        where: {
          postId,
          userId,
          type: ReactionType.LIKE,
        },
      });

      if (existingReaction) {
        await prisma.reaction.delete({
          where: { id: existingReaction.id },
        });
      } else {
        const reaction = await prisma.reaction.create({
          data: {
            postId,
            userId,
            type: ReactionType.LIKE,
            target: ReactionTarget.POST,
            postCommentId: null,
          },
        });
      }
      return true;
    },

    hitDislikePost: async (
      _: unknown,
      { postId, userId }: { postId: string; userId: string }
    ) => {
      const existingReaction = await prisma.reaction.findFirst({
        where: {
          postId,
          userId,
          type: ReactionType.DISLIKE,
        },
      });

      if (existingReaction) {
        await prisma.reaction.delete({
          where: { id: existingReaction.id },
        });
      } else {
        const reaction = await prisma.reaction.create({
          data: {
            postId,
            userId,
            type: ReactionType.DISLIKE,
            target: ReactionTarget.POST,
            postCommentId: null,
          },
        });
      }
      return true;
    },
  },
};

export default resolvers;
