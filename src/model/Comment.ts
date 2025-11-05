import prisma from "../config/prisma";

export const getCommentsByTask = async (taskId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      taskId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return comments.map((c: { id: number; content: string; user: { name: string }; createdAt: Date; updatedAt: Date }) => ({
    id: c.id,
    content: c.content,
    user: c.user.name,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  }));
};

export const addComment = async (taskId: number, userId: string, content: string) => {
  return await prisma.comment.create({
    data: {
      taskId,
      userId,
      content,
    },
  });
};

export const updateComment = async (commentId: number, content: string) => {
  return await prisma.comment.update({
    where: { id: commentId },
    data: {
      content,
    },
  });
};

export const deleteComment = async (commentId: number) => {
  return await prisma.comment.delete({
    where: { id: commentId },
  });
};
