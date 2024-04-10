import { Request, Response } from 'express';
import { ConductorModelo } from '../Modelo/ConductorModelo';


export class ConductorControlador {
    private conductorModelo: ConductorModelo;

    constructor() {
        this.conductorModelo = new ConductorModelo();
    }

    async crearConductor(req: Request, res: Response) {
        try {
            const conductorCreado = await this.conductorModelo.crearConductor(req.body);
            res.status(201).json({
                code: 201,
                message: 'Conductor creado exitosamente',
                data: conductorCreado,
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al crear el conductor',
                data: errorMessage,
            });
        }
    }

    async obtenerConductores(req: Request, res: Response) {
        try {
            const conductores = await this.conductorModelo.obtenerConductores();
            res.status(200).json({
                code: 200,
                message: 'Conductores obtenidos exitosamente',
                data: conductores,
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al obtener los conductores',
                data: errorMessage,
            });
        }
    }

    async obtenerConductorPorId(req: Request, res: Response) {
        try {
            const conductor = await this.conductorModelo.obtenerConductorPorId(parseInt(req.params.id));
            if (conductor) {
                res.status(200).json({
                    code: 200,
                    message: 'Conductor obtenido exitosamente',
                    data: conductor,
                });
            } else {
                res.status(404).json({
                    code: 404,
                    message: 'Conductor no encontrado',
                    data: {},
                });
            }
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al obtener el conductor',
                data: errorMessage,
            });
        }
    }

    async actualizarConductor(req: Request, res: Response) {
        try {
            const conductorActualizado = await this.conductorModelo.actualizarConductor(parseInt(req.params.id), req.body);
            res.status(200).json({
                code: 200,
                message: 'Conductor actualizado exitosamente',
                data: conductorActualizado,
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al actualizar el conductor',
                data: errorMessage,
            });
        }
    }

    async eliminarConductor(req: Request, res: Response) {
        try {
            await this.conductorModelo.eliminarConductor(parseInt(req.params.id));
            res.status(200).json({
                code: 200,
                message: 'Conductor eliminado exitosamente',
                data: {},
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al eliminar el conductor',
                data: errorMessage,
            });
        }
    }
}
