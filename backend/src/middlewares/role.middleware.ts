
import { NextFunction, Response, Request } from 'express';

export const canAccess = (role: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.User.role === role) {
      next();
    } else {
      next(
        new Error('You are not authorized to access this route')
      )
    }
  };
}