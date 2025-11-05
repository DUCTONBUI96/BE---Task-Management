import prisma from "../config/prisma";

export const getAllTask = async () => {
  return await prisma.task.findMany({
    include: {
      project: {
        select: {
          id: true,
          name: true,
        },
      },
      status: true,
      priority: true,
      taskTags: {
        include: {
          tag: true,
        },
      },
      assignments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const GetTaskByProjectId = async (project_id: number) => {
  return await prisma.task.findMany({
    where: {
      projectId: project_id,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const GetDetailTask = async (id: number) => {
  return await prisma.task.findUnique({
    where: { id },
    include: {
      project: true,
      status: true,
      priority: true,
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      taskTags: {
        include: {
          tag: true,
        },
      },
      assignments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const CreateTask = async (
  project_id: number,
  name: string,
  description: string,
  deadline: Date,
  status_id: number,
  priority_id: number
) => {
  return await prisma.task.create({
    data: {
      projectId: project_id,
      name,
      description,
      deadline,
      statusId: status_id,
      priorityId: priority_id,
    },
  });
};

export const UpdateTask = async (
  id: number,
  name: string,
  description: string,
  deadline: Date,
  priorityId: number,
  statusId: number
) => {
  const task = await prisma.task.update({
    where: { id },
    data: {
      name,
      description,
      deadline,
      priorityId,
      statusId,
    },
  });

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  return task;
};

export const AssignTaskToUser = async (userId: string, taskId: number) => {
  return await prisma.userTask.create({
    data: {
      userId,
      taskId,
    },
  });
};

export const UpdateTaskStatus = async (taskId: number, statusId: number) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: {
      statusId,
    },
  });
};

export const UpdateTaskPriority = async (taskId: number, priorityId: number) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: {
      priorityId,
    },
  });
};

export const UpdateTaskTags = async (taskId: number, tagIds: number[]) => {
  // Xóa tag cũ
  await prisma.taskTag.deleteMany({
    where: {
      taskId,
    },
  });

  // Thêm tag mới
  if (tagIds.length > 0) {
    await prisma.taskTag.createMany({
      data: tagIds.map((tagId) => ({
        taskId,
        tagId,
      })),
    });
  }

  return { taskId, tagIds };
};
