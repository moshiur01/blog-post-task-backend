/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  blogPostRelationalFields,
  blogPostRelationalFieldsMapper,
  blogPostSearchableFields,
} from './blogPost.constrain';
import { IBlogPostFilterRequest } from './blogPost.interface';

const createBlogPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({ data });

  return result;
};

const getAllBlogPost = async (
  filters: IBlogPostFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Post[] | null>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //partial match
  if (searchTerm) {
    andConditions.push({
      OR: blogPostSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  //exact match
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (blogPostRelationalFields.includes(key)) {
          return {
            [blogPostRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.PostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.post.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options?.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },

    include: {
      user: true,
      category: true,
      comments: true,
    },
  });

  const total = await prisma.post.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBlogPost = async (id: string): Promise<Post | null> => {
  const result = prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      category: true,
      comments: true,
    },
  });
  return result;
};

const updateBlogPost = async (
  id: string,
  payload: Partial<Post>
): Promise<Post | null> => {
  const blogPost = await getSingleBlogPost(id);
  if (!blogPost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog Post data not found');
  }

  const result = prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBlogPost = async (id: string): Promise<Post | null> => {
  const blogPost = await getSingleBlogPost(id);
  if (!blogPost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog Post data not found');
  }

  const DeleteBlogPostData = await prisma.$transaction(
    async transactionClient => {
      await transactionClient.comment.deleteMany({
        where: {
          postId: id,
        },
      });

      const result = prisma.post.delete({
        where: {
          id,
        },
      });

      return result;
    }
  );

  return DeleteBlogPostData;
};

export const BlogPostService = {
  createBlogPost,
  getAllBlogPost,
  getSingleBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
