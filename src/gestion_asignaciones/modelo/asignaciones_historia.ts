import { client } from "../../util/database_client";
import { DatosInvalidos } from "../../util/errores";
import { asignacionesModelo, DatosAsignacion } from "./asignaciones";

export class HistorialAsignacionesModelo {
  async Crear(asignacion: DatosAsignacion) {
    try {
      await client.historial_asignaciones.create({
        data: {
          id_asignacion: asignacion.idAsignacion,
          id_conductor: asignacion.idConductor,
          id_vehiculo: asignacion.idVehiculo,
        },
      });
    } catch (error) {
      throw new DatosInvalidos(
        "Error al crear un nuevo registro en el historial"
      );
    }
  }
}

export const historialAsignacionesModelo = new HistorialAsignacionesModelo();
