import {PrismaClient} from '@prisma/client';
import {any} from "zod";

let prismaInstance: PrismaClient | null = null;
export class VehiculoService {

    private prisma: PrismaClient;
    constructor() {
        if (!prismaInstance) {
            prismaInstance = new PrismaClient();
        }
        this.prisma = prismaInstance;
    }

    async getAll(){
        return this.prisma.vehiculos.findMany();
    }

    async getOne(id:number){
        return this.prisma.vehiculos.findUnique({
            where: {
                id: id
            }
        });
    }

    async createVehiculo(placa: string, marca: string, modelo: string, VIN: string, fecha_compra: string, costo: number,
                         url_foto: string){
        return await this.prisma.vehiculos.create({
            data: {
                placa: placa,
                marca: marca,
                modelo: modelo,
                VIN: VIN,
                fecha_compra: fecha_compra,
                costo: costo,
                url_foto: url_foto,
            },
        })
    }

    async updateVehiculos(id:number, placa: string, marca: string, modelo: string, VIN: string, costo: number,
                          url_foto: string){
        return this.prisma.vehiculos.update({
            where: {
                id: id,
            },
            data: {
                placa: placa,
                marca: marca,
                modelo: modelo,
                VIN: VIN,
                costo: costo,
                url_foto: url_foto,
            }
        });
    }

    async deleteVehiculo(id:number){
        return this.prisma.vehiculos.delete({
            where:{
                id:id
            }
        })
    }
}