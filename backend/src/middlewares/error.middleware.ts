import { NextFunction, Request, Response } from 'express';
import { ApiException } from '../exceptions';
import { sendError } from '../response';
import { logger } from '../utils/log';

const errorMiddleware = (
  err: ApiException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.stack)
  sendError(res, err.message, err.status);
}

export { errorMiddleware };