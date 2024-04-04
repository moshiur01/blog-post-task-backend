import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogPostFilterableFields } from './blogPost.constrain';
import { BlogPostService } from './blogPost.service';

const createBlogPost = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogPostService.createBlogPost(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BLog Post Created',
    data: result,
  });
});

const getAllBlogPost = catchAsync(async (req: Request, res: Response) => {
  console.log(req?.query);
  const filters = pick(req.query, blogPostFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await BlogPostService.getAllBlogPost(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Posts data fetched successfully',
    data: result,
  });
});

const getSingleBlogPost = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogPostService.getSingleBlogPost(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Blog Post data fetched successfully',
    data: result,
  });
});

const updateBlogPost = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogPostService.updateBlogPost(
    req?.params?.id,
    req?.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Post data updated successfully',
    data: result,
  });
});

const deleteBlogPost = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogPostService.deleteBlogPost(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Post data deleted successfully',
    data: result,
  });
});

export const BlogPostController = {
  createBlogPost,
  getAllBlogPost,
  getSingleBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
