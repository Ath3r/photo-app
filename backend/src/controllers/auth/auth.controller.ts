import { Request, Response, NextFunction } from "express";
import { sendError, sendSuccess } from "../../response";
import { StatusCodes } from "http-status-codes";
import authService from '../../services/auth.service';

export default {
  signup : async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await authService.signup(req.body);
      if (data) {
        return sendSuccess(res, data, StatusCodes.CREATED);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [data, error] = await authService.login(req.body);
      if (data) {
        return sendSuccess(res, data, StatusCodes.OK);
      }
      return sendError(res, error as string, StatusCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  }
};