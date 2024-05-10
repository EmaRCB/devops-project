import { NextFunction, Request, Response } from "express";
import { ConflictoDatos, TokenError } from "../errores";
import token from "../jwt";

type DecodedToken = {};

export const TokenValidador = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      throw new ConflictoDatos("Esta ruta requiere un token valido");

    const decoded = await token.DecodeToken<DecodedToken>(authorization);

    if (!decoded) throw new TokenError("El token enviado es invalido");

    next();
  } catch (error) {
    next(error);
  }
};
