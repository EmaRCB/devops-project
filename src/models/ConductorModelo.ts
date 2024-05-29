import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ConductorModelo {
    async crearConductor(datosConductor: {
        CURP: string;
        nombres: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
        fechaNacimiento: string;
        direccion: string;
        salario: number;
        numeroLicencia: number;
    }) {

        // Validación para el curp que tiene que ser único
        const curpExistente = await prisma.conductores.findUnique({
            where: {
                CURP: datosConductor.CURP
            }
        });
        if (curpExistente) {
            throw new Error('El CURP ya está registrado.');
        }

        // Validación para la licencia que también tiene que ser única
        const licenciaExistente = await prisma.conductores.findUnique({
            where: {
                numero_licencia: datosConductor.numeroLicencia
            }
        });
        if (licenciaExistente) {
            throw new Error('El número de licencia ya está registrado.');
        }

        // Si pasa las validaciones se crea el conductor
        return await prisma.conductores.create({
            data: {
                CURP: datosConductor.CURP,
                nombres: datosConductor.nombres,
                apellido_paterno: datosConductor.apellidoPaterno,
                apellido_materno: datosConductor.apellidoMaterno,
                fecha_nacimiento: new Date(datosConductor.fechaNacimiento),
                direccion: datosConductor.direccion,
                salario: datosConductor.salario,
                numero_licencia: datosConductor.numeroLicencia,
                fecha_registro: new Date()
            },
        });
    }

    async obtenerConductores() {
        return await prisma.conductores.findMany();
    }

    async eliminarConductor(id: number) {
        return await prisma.conductores.delete({
            where: { id },
        });
    }

    async obtenerConductorPorId(id: number) {
        return await prisma.conductores.findUnique({
            where: { id },
        });
    }

    async actualizarConductor(id: number, datosConductor: {
        CURP?: string;
        nombres?: string;
        apellidoPaterno?: string;
        apellidoMaterno?: string;
        fechaNacimiento?: string;
        direccion?: string;
        salario?: number;
        numeroLicencia?: number;
    }) {
        // Validación para el curp que tiene que ser único 
        if (datosConductor.CURP) {
            const curpExistente = await prisma.conductores.findFirst({
                where: {
                    CURP: datosConductor.CURP,
                    NOT: {
                        id: id
                    }
                }
            });
            if (curpExistente) {
                throw new Error('El CURP proporcionado ya está registrado para otro conductor.');
            }
        }

        // Validación para la licencia que también tiene que ser única
        if (datosConductor.numeroLicencia) {
            const licenciaExistente = await prisma.conductores.findFirst({
                where: {
                    numero_licencia: datosConductor.numeroLicencia,
                    NOT: {
                        id: id
                    }
                }
            });
            if (licenciaExistente) {
                throw new Error('El número de licencia proporcionado ya está registrado para otro conductor.');
            }
        }

        // Si pasa las validaciones, actualizar el conductor
        return await prisma.conductores.update({
            where: { id },
            data: {
                CURP: datosConductor.CURP,
                nombres: datosConductor.nombres,
                apellido_paterno: datosConductor.apellidoPaterno,
                apellido_materno: datosConductor.apellidoMaterno,
                fecha_nacimiento: datosConductor.fechaNacimiento ? new Date(datosConductor.fechaNacimiento) : undefined,
                direccion: datosConductor.direccion,
                salario: datosConductor.salario,
                numero_licencia: datosConductor.numeroLicencia,
            },
        });
    }


}
