import { NextFunction, Request, Response } from "express";
import {
  asignacionesModelo,
  AsignacionesModelo,
  CrearAsignacion,
  DatosAsignacion,
} from "../modelo/asignaciones";
import { DatosInvalidos } from "../../util/errores";
import {
  historialAsignacionesModelo,
  HistorialAsignacionesModelo,
} from "../modelo/asignaciones_historia";

export class ControladorAsignaciones {
  constructor(
    private readonly asignacionesModelo: AsignacionesModelo,
    private readonly historialModelo: HistorialAsignacionesModelo
  ) {}

  async CrearNuevaAsignacion(req: Request, res: Response, next: NextFunction) {
    try {
      const datos: CrearAsignacion = req.body as CrearAsignacion;
      const resultado = await this.asignacionesModelo.Crear(datos);
      await this.historialModelo.Crear({
        idAsignacion: resultado.id,
        idConductor: resultado.conductor.id,
        idVehiculo: resultado.vehiculo.id,
      });

      const datosMapeados = {
        id: resultado.id,
        conductor: {
          id: resultado.conductor.id,
          nombre: resultado.conductor.nombres,
        },
        vehiculo: {
          id: resultado.vehiculo.id,
          placa: resultado.vehiculo.placa,
        },
        ruta: { ...resultado.rutas[0] },
      };
      res.send({
        code: 200,
        message: "Asignacion obtenida",
        data: datosMapeados,
      });
    } catch (error) {
      next(error);
    }
  }

  async ActualizarAsignacion(req: Request, res: Response, next: NextFunction) {
    try {
      const datos: DatosAsignacion = req.body as DatosAsignacion;
      const resultado = await this.asignacionesModelo.Actualizar(datos);
      await this.historialModelo.Crear({
        idAsignacion: resultado.id,
        idConductor: resultado.conductor.id,
        idVehiculo: resultado.vehiculo.id,
      });
      const datosMapeados = {
        id: resultado.id,
        conductor: {
          id: resultado.conductor.id,
          nombre: resultado.conductor.nombres,
        },
        vehiculo: {
          id: resultado.vehiculo.id,
          placa: resultado.vehiculo.placa,
        },
        ruta: { ...resultado.rutas[0] },
      };
      res.send({
        code: 200,
        message: "Asignacion obtenida",
        data: datosMapeados,
      });
    } catch (error) {
      next(error);
    }
  }

  async EliminarAsignacion(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.asignacionesModelo.Desactivar(parseInt(id));

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async ObtenerAsignacion(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resultado = await this.asignacionesModelo.ObtenerPorID(
        parseInt(id)
      );

      const datosMapeados = {
        id: resultado.id,
        conductor: {
          id: resultado.conductor.id,
          nombre: resultado.conductor.nombres,
        },
        vehiculo: {
          id: resultado.vehiculo.id,
          placa: resultado.vehiculo.placa,
        },
        ruta: { ...resultado.rutas[0] },
      };
      res.send({
        code: 200,
        message: "Asignacion obtenida",
        data: datosMapeados,
      });
    } catch (error) {
      next(error);
    }
  }

  async ObtenerAsignaciones(_: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await this.asignacionesModelo.ObtenerTodos();

      const datosMapeados = resultado.map((asignacion) => {
        return {
          id: asignacion.id,
          conductor: {
            id: asignacion.conductor.id,
            nombre: asignacion.conductor.nombres,
          },
          vehiculo: {
            id: asignacion.vehiculo.id,
            placa: asignacion.vehiculo.placa,
          },
          ruta: { ...asignacion.rutas[0] },
        };
      });
      res.send({
        code: 200,
        message: "Asignaciones obtenidas",
        data: datosMapeados,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const controladorAsignaciones = new ControladorAsignaciones(
  asignacionesModelo,
  historialAsignacionesModelo
);
