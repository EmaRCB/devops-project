import { z } from "zod";

export const CrearAsignacionEsquema = z.object({
  body: z.object({
    idVehiculo: z.number(),
    idConductor: z.number(),
  }),
});
