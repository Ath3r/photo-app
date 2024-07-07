import { sendError } from '../response';
import { ResourceNotFoundException } from '../exceptions';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const notFoundMiddleware = (_req: Request, _res: Response, _next: NextFunction) => {
  const error = new ResourceNotFoundException('Resource not found');
  return sendError(_res, error.message, StatusCodes.NOT_FOUND);
};