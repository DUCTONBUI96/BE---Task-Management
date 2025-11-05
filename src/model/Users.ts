import prisma from "../config/prisma";

export const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const CreateUser = async (name: string, email: string, passwordhash: string) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      passwordhash,
    },
  });
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  
  if (!user) {
    throw new Error(`User with id ${id} not found or already deleted`);
  }
  
  return user;
};

