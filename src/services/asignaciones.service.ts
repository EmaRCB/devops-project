import client from "../util/database_client";
import { ConflictoDatos, ServidorError, DatosInvalidos } from "../util/errores";

export type CrearAsignacion = {
  idConductor: number;
  idVehiculo: number;
};

export type DatosAsignacion = {
  idAsignacion: number;
  idConductor: number;
  idVehiculo: number;
};

export class AsignacionesModelo {
  async Crear(asignacion: CrearAsignacion) {
    try {
      const existeConductor = await client.asignaciones.count({
        where: {
          id_conductor: asignacion.idConductor,
          activo: true,
        },
      });

      const existeVehiculo = await client.asignaciones.count({
        where: {
          id_vehiculo: asignacion.idVehiculo,
          activo: true,
        },
      });

      if (existeConductor >= 1)
        throw new ConflictoDatos(
          "No se pudo crear la asignacion, ya existe un vehiculo asignado a este conductor"
        );

      if (existeVehiculo >= 1)
        throw new ConflictoDatos(
          "No se pudo crear la asignacion, ya existe un conductor asignado a este vehiculo"
        );

      const asignacionCreada = await client.asignaciones.create({
        data: {
          id_conductor: asignacion.idConductor,
          id_vehiculo: asignacion.idVehiculo,
        },
        select: {
          id: true,
          conductor: {
            select: {
              id: true,
              nombres: true,
            },
          },
          vehiculo: {
            select: {
              id: true,
              placa: true,
            },
          },
          rutas: {
            where: {
              fecha_recorrido: {},
            },
            select: {
              id: true,
              nombre_ruta: true,
            },
          },
        },
      });

      return asignacionCreada;
    } catch (error) {
      throw new ServidorError("No se pudo procesar su peticion");
    }
  }

  async Actualizar(asignacion: DatosAsignacion) {
    try {
      const existeConductor = await client.asignaciones.count({
        where: {
          id_conductor: asignacion.idConductor,
          id: { not: asignacion.idAsignacion },
          activo: true,
        },
      });

      const existeVehiculo = await client.asignaciones.count({
        where: {
          id_vehiculo: asignacion.idVehiculo,
          id: { not: asignacion.idAsignacion },
          activo: true,
        },
      });

      if (existeConductor >= 1)
        throw new ConflictoDatos(
          "No se pudo actualizar la asignacion, ya existe un vehiculo asignado a este conductor"
        );

      if (existeVehiculo >= 1)
        throw new ConflictoDatos(
          "No se pudo actualizar la asignacion, ya existe un conductor asignado a este vehiculo"
        );

      const actualizado = await client.asignaciones.update({
        where: {
          id: asignacion.idAsignacion,
        },
        data: {
          id_conductor: asignacion.idConductor,
          id_vehiculo: asignacion.idVehiculo,
        },
        select: {
          id: true,
          conductor: {
            select: {
              id: true,
              nombres: true,
            },
          },
          vehiculo: {
            select: {
              id: true,
              placa: true,
            },
          },
          rutas: {
            where: {
              fecha_recorrido: {},
            },
            select: {
              id: true,
              nombre_ruta: true,
            },
          },
        },
      });

      return actualizado;
    } catch (error) {
      throw new ServidorError("No se pudo procesar su peticion");
    }
  }

  async Desactivar(id: number) {
    try {
      await client.asignaciones.update({
        where: {
          id: id,
        },
        data: {
          activo: false,
        },
      });
    } catch (error) {
      throw new ServidorError("No se pudo procesar la peticion");
    }
  }

  async ObtenerPorID(id: number) {
    const asignacion = await client.asignaciones.findFirst({
      where: {
        activo: true,
        id: id,
      },
      select: {
        id: true,
        conductor: {
          select: {
            id: true,
            nombres: true,
          },
        },
        vehiculo: {
          select: {
            id: true,
            placa: true,
          },
        },
        rutas: {
          where: {
            fecha_recorrido: {},
          },
          select: {
            id: true,
            nombre_ruta: true,
          },
        },
      },
    });

    if (asignacion === null)
      throw new DatosInvalidos(
        `No se encontro ninguna asignacion con ID: ${id}`
      );

    return asignacion;
  }

  async ObtenerTodos() {
    const asignaciones = await client.asignaciones.findMany({
      where: {
        activo: true,
      },
      select: {
        id: true,
        conductor: {
          select: {
            id: true,
            nombres: true,
          },
        },
        vehiculo: {
          select: {
            id: true,
            placa: true,
          },
        },
        rutas: {
          where: {
            fecha_recorrido: {},
          },
          select: {
            id: true,
            nombre_ruta: true,
          },
        },
      },
    });

    return asignaciones;
  }
}

export const asignacionesModelo = new AsignacionesModelo();
