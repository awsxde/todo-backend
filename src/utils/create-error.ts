import { logger } from "./logger.utils";

export const createError = (message: string, statusCode: number) => {
  logger.error(`Error: ${message} | StatusCode: ${statusCode}`);
  return { message, statusCode };
};
