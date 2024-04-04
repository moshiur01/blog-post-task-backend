import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const getAllUser = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany({});
  return result;
};

export const UserService = {
  createUser,
  getAllUser,
};
