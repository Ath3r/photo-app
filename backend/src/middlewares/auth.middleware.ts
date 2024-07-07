import { Permission, RequestWithUser, User, UserJwt } from '../types';
import { AppConfig } from '../utils/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import { sendError } from '../response';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../utils/log';

export const isAuthenticated = (
  permissionType = ''
) =>  async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      !req.headers.authorization || (
        req.headers?.authorization || ''
      ).split(' ').length < 2
    ) {
      return sendError(res, 'Invalid token', StatusCodes.UNAUTHORIZED);
    }
    const token = (req.headers.authorization || '').split(' ')[1]as string;
    (req as RequestWithUser).token = token;
    const user = jwt.verify(token, AppConfig.JWT_SECRET as string) as UserJwt;
    if (!user) {
      return sendError(res, 'Invalid token', StatusCodes.UNAUTHORIZED);
    }
    const dbUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: {
          select: {
            id: true,
            permissions: {
              select: {
                type: true,
                description: true,
              }
            }
          }
        },
      }
    });
    if (!dbUser) {
      return sendError(res, 'Invalid token', StatusCodes.UNAUTHORIZED);
    }
    (req as RequestWithUser).user = dbUser as User;
    if (!permissionType) {
      return next()
    }
    const canAccess = dbUser?.role?.permissions.some((permission: Permission) => {
      return permission.type === permissionType;
    });
    if (!canAccess) {
      return sendError(res, 'You are not authorized to access this route', StatusCodes.UNAUTHORIZED);
    }
    next()
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};