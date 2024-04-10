import { NextFunction, Request, Response } from "express";
import { Schema, ZodError } from "zod";
import { DatosInvalidos } from "../errores";

export const ValidadorEsquemas =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req);
      next();
    } catch (error) {
      const issueMessages = (error as ZodError).issues.map(
        (issue) => `${issue.message} ${issue.path[issue.path.length - 1]}`
      );

      const err = new DatosInvalidos(
        `Estos campos presentan errores, o no se encontraron:  ${issueMessages.join()}`
      );
      next(err);
    }
  };
