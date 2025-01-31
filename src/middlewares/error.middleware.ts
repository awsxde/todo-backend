import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.utils";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`500 - ${err.message} - ${req.method} ${req.originalUrl}`);

  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
};
