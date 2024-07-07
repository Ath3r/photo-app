import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { sendError } from '../response';

const validatorMiddleware = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    req.body = value;
    if (error) {
      sendError(res, error.message, 400);
    } else {
      next();
    }
  };
};

export { validatorMiddleware };