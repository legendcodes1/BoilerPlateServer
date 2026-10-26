import type { Request, Response } from 'express';

// TODO: move to constants folder when it's created
export enum ERROR_MESSAGES {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  UNAUTHORIZED = "UNAUTHORIZED",
  CONFLICT = "CONFLICT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  RESOURCES_NOT_FOUND = "RESOURCE_NOT_FOUND"
}



export default function errorHandler(
  error: Error,
  req: Request,
  res: Response
) {
  switch (error.message) {
    case ERROR_MESSAGES.USER_NOT_FOUND:
      res.status(404).json({
        error: ERROR_MESSAGES.USER_NOT_FOUND
      })
      break
    default:
      res.status(500).json({
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      })
      break;
  }
}