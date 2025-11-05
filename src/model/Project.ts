import prisma from "../config/prisma";

//GET
export const getProject = async () => {
  return await prisma.project.findMany({
    include: {
      tasks: {
        select: {
          id: true,
          name: true,
          statusId: true,
        },
      },
      _count: {
        select: {
          tasks: true,
          userRoles: true,
        },
      },
    },
  });
};

export const GetProjectById = async (id: number) => {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: true,
      userRoles: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          role: true,
        },
      },
    },
  });
};

export const GetAllMemberInProject = async (id: number) => {
  const members = await prisma.userRoleProject.findMany({
    where: {
      projectId: id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  return members.map((m: { user: { id: string; name: string; email: string }; role: { name: string } }) => ({
    user_id: m.user.id,
    user_name: m.user.name,
    email: m.user.email,
    role_name: m.role.name,
  }));
};

//POST
export const CreateProject = async (name: string, description: string) => {
  return await prisma.project.create({
    data: {
      name,
      description,
    },
  });
};

export const AddMember = async (UserId: string, RoleId: number, projectId: number) => {
  return await prisma.userRoleProject.create({
    data: {
      userId: UserId,
      roleId: RoleId,
      projectId: projectId,
    },
  });
};

//DELETE
export const deleteProject = async (id: number) => {
  const project = await prisma.project.delete({
    where: { id },
  });
  
  if (!project) {
    throw new Error(`Project with id ${id} not found or already deleted`);
  }
  
  return project;
};

export const deleteMember = async (projectId: number, userId: string) => {
  const member = await prisma.userRoleProject.deleteMany({
    where: {
      projectId,
      userId,
    },
  });
  
  if (member.count === 0) {
    throw new Error(`Member not found in project ${projectId}`);
  }
  
  return member;
};