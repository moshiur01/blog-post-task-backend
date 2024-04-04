import { Comment } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const createPostComment = async (data: Comment): Promise<Comment> => {
  const result = await prisma.comment.create({ data });
  return result;
};

const getSingleBlogPostComments = async (
  options: IPaginationOptions,
  postId: string
): Promise<IGenericResponse<Comment[] | null>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
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
      post: true,
      user: true,
    },
  });

  const total = await prisma.comment.count({
    where: {},
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

const deleteBlogPostComment = async (id: string): Promise<Comment | null> => {
  const singleBlogPostComment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if (!singleBlogPostComment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment data not found');
  }

  const result = prisma.comment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PostCommentService = {
  createPostComment,
  getSingleBlogPostComments,
  deleteBlogPostComment,
};
