import { z } from "zod";

export const LoginDatos = z.object({
  body: z.object({
    email: z.string().trim().min(1, "Email invalido"),
    contrasenia: z.string().trim().min(1, "Contraseña invalido"),
  }),
});
