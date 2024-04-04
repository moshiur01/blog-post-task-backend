import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PostCommentService } from './postComment.service';

const createPostComment = catchAsync(async (req: Request, res: Response) => {
  const result = await PostCommentService.createPostComment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post comment created successfully',
    data: result,
  });
});

const getSingleBlogPostComments = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const result = await PostCommentService.getSingleBlogPostComments(
      options,
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single post comment data fetched successfully',
      data: result,
    });
  }
);

const deletePostComment = catchAsync(async (req: Request, res: Response) => {
  const result = await PostCommentService.deleteBlogPostComment(
    req?.params?.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post comment data deleted successfully',
    data: result,
  });
});

export const PostCommentController = {
  createPostComment,
  getSingleBlogPostComments,
  deletePostComment,
};
