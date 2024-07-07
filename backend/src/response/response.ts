import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    timestamp: string;
    [key: string]: any;
  };
}

function sendResponse<T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data?: T,
  error?: string,
  metadata?: Record<string, any>
) {
  const response: ApiResponse<T> = {
    success,
    ...(data !== undefined && { data }),
    ...(error !== undefined && { error }),
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };

  return res.status(statusCode).json(response);
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  metadata?: Record<string, any>
) {
  return sendResponse(res, statusCode, true, data, undefined, metadata);
}

export function sendError(
  res: Response,
  error: string,
  statusCode: number = 400,
  metadata?: Record<string, any>
) {
  return sendResponse(res, statusCode, false, undefined, error, metadata);
}