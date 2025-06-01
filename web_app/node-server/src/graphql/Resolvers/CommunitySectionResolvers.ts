import { PrismaClient, ReactionTarget, ReactionType } from "@prisma/client";

const prisma = new PrismaClient();

const buildPostCounts = (posts: any[], userId: string) => {
  return posts.map((post) => ({
    ...post,
    likesCount:
      post.reactions?.filter((r: any) => r.type === ReactionType.LIKE).length ||
      0,
    dislikesCount:
      post.reactions?.filter((r: any) => r.type === ReactionType.DISLIKE)
        .length || 0,
    commentsCount: post.comments?.length || 0,
    user: {
      ...post.user,
      profilePicture: post.user.profile?.profilePicture,
    },
    isLiked:
      post.reactions?.some(
        (r: any) => r.userId === userId && r.type === ReactionType.LIKE
      ) || false,
    isDisliked:
      post.reactions?.some(
        (r: any) => r.userId === userId && r.type === ReactionType.DISLIKE
      ) || false,
    isUserCreator: post.userId === userId,
    comments:
      post.comments?.map((comment: any) => ({
        ...comment,
        user: {
          ...comment.user,
          profilePicture: comment.user.profile?.profilePicture,
        },
        likesCount:
          comment.reactions?.filter((r: any) => r.type === ReactionType.LIKE)
            .length || 0,
        dislikesCount:
          comment.reactions?.filter((r: any) => r.type === ReactionType.DISLIKE)
            .length || 0,
        isLiked:
          comment.reactions?.some(
            (r: any) => r.userId === userId && r.type === ReactionType.LIKE
          ) || false,
        isDisliked:
          comment.reactions?.some(
            (r: any) => r.userId === userId && r.type === ReactionType.DISLIKE
          ) || false,
        isUserCreator: comment.userId === userId,
      })) || [],
  }));
};

const resolvers = {
  Query: {
    getTrendingPosts: async (
      _: unknown,
      { userId, searchTerm }: { userId: string; searchTerm: string }
    ) => {
      const posts = await prisma.post.findMany({
        where: {
          isDeleted: false,
          ...(searchTerm &&
            searchTerm.trim() !== "" && {
              OR: [
                {
                  title: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  content: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  tags: {
                    has: searchTerm,
                  },
                },
              ],
            }),
        },
        include: {
          reactions: true,
          comments: {
            include: {
              reactions: true,
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
          },
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

    getRecentPosts: async (
      _: unknown,
      { userId, searchTerm }: { userId: string; searchTerm: string }
    ) => {
      const posts = await prisma.post.findMany({
        where: {
          isDeleted: false,
          ...(searchTerm &&
            searchTerm.trim() !== "" && {
              OR: [
                {
                  title: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  content: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  tags: {
                    has: searchTerm,
                  },
                },
              ],
            }),
        },
        include: {
          reactions: true,
          comments: {
            include: {
              reactions: true,
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
          },
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

    getMyPosts: async (
      _: unknown,
      { userId, searchTerm }: { userId: string; searchTerm: string }
    ) => {
      const posts = await prisma.post.findMany({
        where: {
          isDeleted: false,
          userId: userId,
          ...(searchTerm &&
            searchTerm.trim() !== "" && {
              OR: [
                {
                  title: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  content: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  tags: {
                    has: searchTerm,
                  },
                },
              ],
            }),
        },
        include: {
          reactions: true,
          comments: {
            include: {
              reactions: true,
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
          },
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
          attachedWorkoutPlan?: string;
        };
      }
    ) => {
      const { userId, title, content, image, tags, attachedWorkoutPlan } =
        input;

      console.log("image", image);

      const post = await prisma.post.create({
        data: {
          userId,
          title,
          content,
          image,
          tags,
          attachedWorkoutPlan,
        },
      });

      return post;
    },

    createComment: async (
      _: unknown,
      { input }: { input: { postId: string; userId: string; content: string } }
    ) => {
      const { postId, userId, content } = input;

      const comment = await prisma.postComment.create({
        data: {
          postId,
          userId,
          content,
        },
      });

      return comment;
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

    hitLikeComment: async (
      _: unknown,
      { userId, commentId }: { userId: string; commentId: string }
    ) => {
      const existingReaction = await prisma.reaction.findFirst({
        where: {
          postCommentId: commentId,
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
            postId: null,
            userId,
            type: ReactionType.LIKE,
            target: ReactionTarget.COMMENT,
            postCommentId: commentId,
          },
        });
      }

      return true;
    },

    hitDislikeComment: async (
      _: unknown,
      { userId, commentId }: { userId: string; commentId: string }
    ) => {
      const existingReaction = await prisma.reaction.findFirst({
        where: {
          postCommentId: commentId,
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
            postId: null,
            userId,
            type: ReactionType.DISLIKE,
            target: ReactionTarget.COMMENT,
            postCommentId: commentId,
          },
        });
      }

      return true;
    },

    saveWorkoutToMyPlans: async (
      _: unknown,
      { userId, workoutPlanId }: { userId: string; workoutPlanId: string }
    ) => {
      const existingWorkoutPlan = await prisma.plannedWorkout.findFirst({
        where: {
          id: workoutPlanId,
        },
        include: {
          days: {
            include: {
              plannedExercises: {
                include: {
                  plannedSets: true,
                },
              },
            },
          },
        },
      });

      if (existingWorkoutPlan) {
        await prisma.plannedWorkout.create({
          data: {
            user: {
              connect: { id: userId },
            },
            name: existingWorkoutPlan.name,
            schema: existingWorkoutPlan.schema || "",
            isActive: false,
            isPublic: false,
            isDefault: false,
            days: {
              create: existingWorkoutPlan.days.map((day: any) => ({
                user: {
                  connect: { id: userId },
                },
                name: day.name,
                plannedExercises: {
                  create: day.plannedExercises.map((plannedExercise: any) => ({
                    user: {
                      connect: { id: userId },
                    },
                    exercise: {
                      connect: { id: plannedExercise.exerciseId },
                    },
                    exerciseNumber: plannedExercise.exerciseNumber,
                    notes: plannedExercise.notes || "",
                    plannedSets: {
                      create: plannedExercise.plannedSets.map((set: any) => ({
                        setNumber: set.setNumber,
                        reps: set.reps,
                        restTime: set.restTime || null,
                      })),
                    },
                  })),
                },
              })),
            },
          },
          include: {
            days: {
              include: {
                plannedExercises: {
                  include: {
                    plannedSets: true,
                  },
                },
              },
            },
          },
        });
        return true;
      }
      return false;
    },

    deletePost: async (
      _: unknown,
      { postId }: { postId: string }
    ) => {
      await prisma.post.update({
        where: { id: postId },
        data: { isDeleted: true },
      });

      return true;
    },
  },

};

export default resolvers;
