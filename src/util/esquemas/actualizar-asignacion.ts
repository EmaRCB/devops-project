import { z } from "zod";

export const ActualizarAsignacionEsquema = z.object({
  body: z.object({
    idAsignacion: z.number(),
    idVehiculo: z.number(),
    idConductor: z.number(),
  }),
});
