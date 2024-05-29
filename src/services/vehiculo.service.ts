import {PrismaClient} from '@prisma/client';
import client from "../util/database_client";

export class VehiculoService {

    async getAll(){
        return client.vehiculos.findMany();
    }

    async getOne(id:number){
        return client.vehiculos.findUnique({
            where: {
                id: id
            }
        });
    }

    async createVehiculo(placa: string, marca: string, modelo: string, VIN: string, fecha_compra: string, costo: number,
                         url_foto: string){
        return await client.vehiculos.create({
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
        return client.vehiculos.update({
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
        return client.vehiculos.delete({
            where:{
                id:id
            }
        })
    }

    async findPlaca(placa: string){
        return client.vehiculos.findUnique({
            where:{
                placa:placa
            }
        })
    }

    async findVIN(vin: string){
        return client.vehiculos.findUnique({
            where:{
                VIN:vin
            }
        })
    }
}