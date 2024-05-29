import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export class RutasModelo {
    async crearRutas(datosRutas: {
        nombre_ruta: string;
        long_empresa: string;
        lat_empresa: string;
        long_destino: string;
        lat_destino: string;
        fecha_recorrido: string;
        fecha_creacion: string;
        exitoso: boolean;
        descripcion_problema: string;
        comentarios: string;
        id: number;
        id_asignacion: number;        
    }) {

        //cada vehiculo solo puede recorrer la ruta una vez al día
        const rutaAsignada = await prisma.rutas.findFirst({
            where: {
              id_asignacion: datosRutas.id_asignacion,
              fecha_recorrido: datosRutas.fecha_recorrido,
            },
          });
      
          if (rutaAsignada) {
            throw new Error('El vehiculo ya recorrió esta ruta');
          }
      
        
    
        // Si pasa las validaciones se crea la ruta

        return await prisma.rutas.create({
            data: {
                nombre_ruta: datosRutas.nombre_ruta,
                long_empresa: datosRutas.long_empresa,
                lat_empresa: datosRutas.lat_empresa,
                long_destino: datosRutas.long_destino,
                lat_destino: datosRutas.lat_destino,
                fecha_recorrido: new Date(datosRutas.fecha_recorrido),
                fecha_creacion: new Date(datosRutas.fecha_creacion),
                exitoso: datosRutas.exitoso,
                descripcion_problema: datosRutas.descripcion_problema,
                comentarios: datosRutas.comentarios,
                id: datosRutas.id,
                id_asignacion: datosRutas.id_asignacion,
            },
        });
    }

    async obtenerRutas() {
        return await prisma.rutas.findMany();
    }

    async obtenerRutasPorId(id: number) {
        return await prisma.rutas.findUnique({
            where: { id },
        });
    }

    async actualizarRuta(id: number, datosRutas: {
        nombre_ruta?: string;
        long_empresa?: string;
        lat_empresa?: string;
        long_destino?: string;
        lat_destino?: string;
        fecha_recorrido?: string;
        fecha_creacion?: string;
        exitoso?: boolean;
        descripcion_problema?: string;
        comentarios?: string;
        id?: number;
        id_asignacion?: number;     
    }) {
        // Validación para que cada vehiculo recorra la ruta una vez al día
        if (datosRutas.id_asignacion) {
            const rutaAsignada = await prisma.rutas.findFirst({
                where: {
                    id_asignacion: datosRutas.id_asignacion,
                  fecha_recorrido: datosRutas.fecha_recorrido,
                },
              });
          
              if (rutaAsignada) {
                throw new Error('El vehiculo ya recorrió esta ruta');
              }
        }
    
        // Si pasa las validaciones, actualizar el conductor
        return await prisma.rutas.update({
            where: { id },
            data: {
                nombre_ruta: datosRutas.nombre_ruta,
                long_empresa: datosRutas.long_empresa,
                lat_empresa: datosRutas.lat_empresa,
                long_destino: datosRutas.long_destino,
                lat_destino: datosRutas.lat_destino,
                fecha_recorrido: datosRutas.fecha_recorrido ? new Date(datosRutas.fecha_recorrido) : undefined,
                fecha_creacion: datosRutas.fecha_creacion ? new Date(datosRutas.fecha_creacion) : undefined,
                exitoso: datosRutas.exitoso,
                descripcion_problema: datosRutas.descripcion_problema,
                comentarios: datosRutas.comentarios,
                id: datosRutas.id,
                id_asignacion: datosRutas.id_asignacion,
            },
        });
    }

    async eliminarRuta(id: number) {
        return await prisma.rutas.delete({
            where: { id },
        });
    }
}