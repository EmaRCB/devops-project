import { Request, Response } from 'express';
import { RutasModelo } from '../modelo/RutasModelo';


export class RutasControlador {
    private rutasModelo: RutasModelo;

    constructor() {
        this.rutasModelo = new RutasModelo();
    }

    async crearRuta(req: Request, res: Response) {
        try {
            const rutaCreada = await this.rutasModelo.crearRutas(req.body);
            res.status(201).json({
                code: 201,
                message: 'Ruta creada exitosamente',
                data: rutaCreada,
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al crear la ruta',
                data: errorMessage,
            });
        }
    }

    async obtenerRutas(req: Request, res: Response) {
        try {
            const rutas = await this.rutasModelo.obtenerRutas();
            res.status(200).json({
                code: 200,
                message: 'Rutas obtenidas exitosamente',
                data: rutas,
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al obtener las rutas',
                data: errorMessage,
            });
        }
    }

    async obtenerRutasPorId(req: Request, res: Response) {
        try {
            const ruta = await this.rutasModelo.obtenerRutasPorId(parseInt(req.params.id));
            if (ruta) {
                res.status(200).json({
                    code: 200,
                    message: 'Ruta obtenida exitosamente',
                    data: ruta,
                });
            } else {
                res.status(404).json({
                    code: 404,
                    message: 'Ruta no encontrada',
                    data: {},
                });
            }
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al obtener la Ruta',
                data: errorMessage,
            });
        }
    }

    async actualizarRuta(req: Request, res: Response) {
        try {
            const rutaActualizada = await this.rutasModelo.actualizarRuta(parseInt(req.params.id), req.body);
            res.status(200).json({
                code: 200,
                message: 'Ruta actualizada exitosamente',
                data: rutaActualizada,
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al actualizar la ruta',
                data: errorMessage,
            });
        }
    }

    async eliminarRuta(req: Request, res: Response) {
        try {
            await this.rutasModelo.eliminarRuta(parseInt(req.params.id));
            res.status(200).json({
                code: 200,
                message: 'Ruta eliminada exitosamente',
                data: {},
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({
                code: 500,
                message: 'Error al eliminar la Ruta',
                data: errorMessage,
            });
        }
    }
}