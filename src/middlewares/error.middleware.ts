import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.utils";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`Error: ${message} | StatusCode: ${statusCode}`);

  res.status(statusCode).json({ message });
};
