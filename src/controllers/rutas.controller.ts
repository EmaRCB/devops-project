import { string, boolean, number } from "zod";
import { RutasModelo } from "../services/rutas.service";
let rutasModelo: RutasModelo;

export class RutasController {
    constructor() { rutasModelo = new RutasModelo() }

    async getRutas(req: any, res: any, next: any) {
        try {
            const rutas = await rutasModelo.obtenerRutas();
            res.status(200).json({
                code: 200,
                message: 'Rutas obtenidas exitosamente',
                data: rutas,
            });
        } catch (error) {
            console.log("este es el error: " + error);
            res.status(500).json({ status: 500, message: error });
        }

    }

    async getRuta(req: any, res: any, next: any) {
        try {
            let id = parseInt(req.params.id);
            let ruta = await rutasModelo.obtenerRutasPorId(id);
            res.status(200).json({ status: 200, data: ruta, message: 'ruta encontrada' });
        } catch (error) {
            res.status(500).json({ status: 500, message: error });
        }
    }

    async createRuta(req: any, res: any, next: any) {
        try {
            const datosRutas = {
                nombre_ruta: req.body.nombre_ruta,
                long_empresa: req.body.long_empresa,
                lat_empresa: req.body.lat_empresa,
                long_destino: req.body.long_destino,
                lat_destino: req.body.lat_destino,
                fecha_recorrido: req.body.fecha_recorrido,
                fecha_creacion: req.body.fecha_creacion,
                exitoso: req.body.exitoso,
                descripcion_problema: req.body.descripcion_problema,
                comentarios: req.body.comentarios,
                id: req.body.id,
                id_asignacion: req.body.id_asignacion
            };

            let ruta = await rutasModelo.crearRutas(datosRutas);

            res.status(200).json({ status: 200, data: ruta, message: 'ruta creado' });
        } catch (error) {
            res.status(500).json({ status: 500, message: error });
        }
    }

    async updateRuta(req: any, res: any, next: any) {
        try {
            const datosRutas = {
                nombre_ruta: req.body.nombre_ruta,
                long_empresa: req.body.long_empresa,
                lat_empresa: req.body.lat_empresa,
                long_destino: req.body.long_destino,
                lat_destino: req.body.lat_destino,
                fecha_recorrido: req.body.fecha_recorrido,
                fecha_creacion: req.body.fecha_creacion,
                exitoso: req.body.exitoso,
                descripcion_problema: req.body.descripcion_problema,
                comentarios: req.body.comentarios,
                id: req.body.id,
                id_asignacion: req.body.id_asignacion
            };

            let id = parseInt(req.params.id);
            let ruta = await rutasModelo.obtenerRutasPorId(id);
            ruta = await rutasModelo.actualizarRuta(id, datosRutas);
            res.status(200).json({ status: 200, data: ruta, message: 'ruta actualizada' });
        } catch (error) {
            res.status(500).json({ status: 500, message: error });
        }
    }

    async deleteRuta(req: any, res: any, next: any) {
        try {
            let id = parseInt(req.params.id);
            let ruta = await rutasModelo.obtenerRutasPorId(id);
            ruta = await rutasModelo.eliminarRuta(id);

            res.status(200).json({ status: 200, data: ruta, message: 'ruta eliminada' });
        } catch (error) {
            res.status(500).json({ status: 500, message: error });
        }
    }




}
