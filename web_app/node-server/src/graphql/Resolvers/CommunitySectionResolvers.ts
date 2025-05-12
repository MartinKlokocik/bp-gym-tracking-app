import { PrismaClient, ReactionType } from "@prisma/client";

const prisma = new PrismaClient();

const buildPostCounts = (posts: any[]) => {
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
  }));
};

const resolvers = {
  Query: {
    getTrendingPosts: async () => {
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

      const postsWithCounts = buildPostCounts(posts);

      return postsWithCounts;
    },

    getRecentPosts: async () => {
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

      const postsWithCounts = buildPostCounts(posts);

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

      const postsWithCounts = buildPostCounts(posts);

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
  },
};

export default resolvers;
