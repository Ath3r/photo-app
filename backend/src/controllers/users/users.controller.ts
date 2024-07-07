import { Request, Response, NextFunction } from "express";
import { sendError, sendSuccess } from "../../response";
import { StatusCodes } from "http-status-codes";
import userService from "../../services/user.service";
import { RequestWithUser } from "../../types";
import permissions from "../../utils/permissions";

export default {
  getAllUsers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await userService.getAll();
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await userService.createUser(req.body);
      if (data) {
        return sendSuccess(res, data, StatusCodes.CREATED);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await userService.updateUser(parseInt(req.params.id), req.body);
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await userService.deleteUser(parseInt(req.params.id));
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const [data, error] = await userService.getProfile(((req as RequestWithUser).user.id));
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await userService.updateProfile(parseInt(req.params.id), req.body);
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  getAllUserPermissions: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      sendSuccess(res, permissions, StatusCodes.OK)
    } catch (error) {
      return next(error);
    }
  },
};