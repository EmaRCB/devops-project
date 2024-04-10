import {Prisma} from '@prisma/client';
export class Vehiculo {
    private id?: number;
    placa: string;
    marca: string;
    modelo: string;
    VIN: string;
    fecha_compra: Date;
    costo: number;
    url_foto: string;
    private fecha_registro?: Date;

    constructor(data: any) {
        this.id = data.id;
        this.placa = data.placa;
        this.marca = data.marca;
        this.modelo = data.modelo;
        this.VIN = data.VIN;
        this.fecha_compra = data.fecha_compra;
        this.costo = data.costo;
        this.url_foto = data.url_foto;
        this.fecha_registro = data.fecha_registro || new Date();
    }
}