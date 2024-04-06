import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users data fetched successfully',
    data: result,
  });
});

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await UserService.getUserByEmail(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data fetched successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  getUserByEmail,
};
