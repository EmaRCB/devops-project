import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";

export const LoggerMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let message = `METHOD: ${req.method} URL:${req.originalUrl}`;

  message +=
    Object.keys(req.params).length > 0
      ? ` Params: ${JSON.stringify(req.params)}`
      : "";

  message +=
    Object.keys(req.body).length > 0
      ? ` Body: ${JSON.stringify(req.body)}`
      : "";

  logger.info('handled request', { req })
  next();
};
