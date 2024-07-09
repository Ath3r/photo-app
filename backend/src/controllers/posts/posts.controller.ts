import { Request, Response, NextFunction } from "express";
import { sendError, sendSuccess } from "../../response";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "../../types";
import postService from "../../services/post.service";

export default {
  getAllPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (
        req as RequestWithUser
      ).user;
      const canViewAllPosts = user?.role?.permissions.some(permission => {
        return permission.type === 'post:readAll';
      });
      const [data, error] = await postService.getAllPosts((
        req as RequestWithUser
      ).user.id, canViewAllPosts, (req.query as any));
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileData = req.file as Express.Multer.File;
      if (!fileData || fileData.size === 0) {
        return sendError(res, 'Image is required', StatusCodes.BAD_REQUEST);
      }
      const [data, error] = await postService.createPost({
        ...req.body,
        url: fileData.path,
      }, (
        req as RequestWithUser
      ).user.id);
      if (data) {
        return sendSuccess(res, data, StatusCodes.CREATED);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  updatePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await postService.updatePost(parseInt(req.params.id), req.body);
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  deletePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await postService.deletePost(parseInt(req.params.id));
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
};