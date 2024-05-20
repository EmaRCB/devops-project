import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";

// logger.js
export const LoggerMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  logger.info(`Ruta invocada: ${req.method} ${req.originalUrl}`);
  next();
};
