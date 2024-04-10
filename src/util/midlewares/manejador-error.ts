import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorPersonalizado } from "../errores";

export const ManejadorError = (
  err: ErrorRequestHandler,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorPersonalizado) {
    res
      .status(err.code)
      .send({ code: err.code, message: err.message, data: err.message });
    return;
  }

  console.log(err);
  res.status(500).send({
    code: 500,
    message: "Error del servidor",
    data: "Sucedio algo en el servidor",
  });
};
