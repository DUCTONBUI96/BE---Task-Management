import prisma from "../config/prisma";

export const getAllRole = async () => {
  return await prisma.role.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

export const getRolebyId = async (id: number) => {
  return await prisma.role.findUnique({
    where: { id },
  });
};

export const CreateRole = async (name: string, description: string) => {
  return await prisma.role.create({
    data: {
      name,
      description,
    },
  });
};

export const DeleteRole = async (id: number) => {
  const role = await prisma.role.delete({
    where: { id },
  });
  
  if (!role) {
    throw new Error(`Role with id ${id} not found or already deleted`);
  }
  
  return role;
};