import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorPersonalizado } from "../errores";
import { logger } from "../../logger";

export const ManejadorError = (
  err: ErrorRequestHandler,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof ErrorPersonalizado) {
    logger.error(`${err.code} - ${err.name} - ${err.message}`);
    res
      .status(err.code)
      .send({ code: err.code, message: err.message, data: err.message });
    return;
  }

  logger.error(`${err.name}`);
  res.status(500).send({
    code: 500,
    message: "Error del servidor",
    data: "Sucedio algo en el servidor",
  });
};
