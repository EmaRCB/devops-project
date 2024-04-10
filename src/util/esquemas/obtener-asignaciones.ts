import { z } from "zod";

export const ObtenerAsignacionesEsquema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "El parámetro debe contener solo números"),
  }),
});
