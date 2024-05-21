import {VehiculoService} from "../../src/services/vehiculo.service";
import { prismaMock } from "../mock/client-mock";

const vehiculoService = new VehiculoService();

let vehiculoArray:any;
beforeEach(()  => {
    vehiculoArray =[
        { id: 1, placa: 'ABC123', marca: 'Toyota', modelo: 'Corolla', VIN: '123', fecha_compra: new Date(), costo: 25000, url_foto: 'example.com', fecha_registro: new Date() },
        { id: 2, placa: 'XYZ789', marca: 'Honda', modelo: 'Civic', VIN: '456', fecha_compra: new Date(), costo: 30000, url_foto: 'example.org', fecha_registro: new Date() },
    ];
})

test('El metodo getVehiculos llama a prisma una vez', async () =>{
    prismaMock.vehiculos.findMany.mockResolvedValue(vehiculoArray);
    let mock = jest.spyOn(vehiculoService, 'getAll')
    await vehiculoService.getAll();
    expect(mock).toHaveBeenCalledTimes(1);
});

test('El metodo getVehiculos devuelve todos los vehiculos de la base de datos', async () =>{
    prismaMock.vehiculos.findMany.mockResolvedValue(vehiculoArray);
    await expect(vehiculoService.getAll()).resolves.toBe(vehiculoArray);
});

test('El metodo getVehiculo llama a prisma una vez', async () =>{
    prismaMock.vehiculos.findMany.mockResolvedValue(vehiculoArray);
    let mock = jest.spyOn(vehiculoService, 'getAll')
    await vehiculoService.getAll();
    expect(mock).toHaveBeenCalledTimes(1);
});

test('El metodo getVehiculo llama a prisma con el id que se llamo al metodo', async () =>{
    prismaMock.vehiculos.findUnique.mockResolvedValue(vehiculoArray[0]);
    await vehiculoService.getOne(1);
    expect(prismaMock.vehiculos.findUnique).toHaveBeenCalledWith({where:{ id: vehiculoArray[0]['id']}});
});

test('El metodo getVehiculo devuelve unicamente un objeto que prisma devuelve', async () =>{
    prismaMock.vehiculos.findUnique.mockResolvedValue(vehiculoArray[0]);
    let mock = jest.spyOn(vehiculoService, 'getOne')
    await expect(vehiculoService.getOne(1)).resolves.toBe(vehiculoArray[0])
});

test('El metodo getVehiculo devuelve unicamente un objeto que prisma devuelve', async () =>{
    prismaMock.vehiculos.findUnique.mockResolvedValue(vehiculoArray[0]);
    await expect(vehiculoService.getOne(1)).resolves.toBe(vehiculoArray[0])
});

test('El metodo createVehiculo devuelve crea el nuevo vehiculo y lo devuelve', async () =>{
    let newVehiculo =
        {
            id: 1,
            placa: 'ABC123',
            marca: 'Toyota',
            modelo: 'Corolla',
            VIN: '123',
            fecha_compra: new Date(),
            costo: 25000,
            url_foto: 'example.com',
            fecha_registro: new Date()
        }
    prismaMock.vehiculos.create.mockResolvedValue(newVehiculo);
    await expect(vehiculoService.createVehiculo(
        'ABC123', 'Toyota',
        'Corolla', '123', new Date().toISOString(),25000, 'example.com')
    ).resolves.toEqual(newVehiculo);
});

test('El metodo updateVehiculo devuelve el objeto actualizado', async () =>{
    let newVehiculo =
        {
            id: 1,
            placa: 'ABC123',
            marca: 'Toyota',
            modelo: 'Corolla',
            VIN: '123',
            fecha_compra: new Date(),
            costo: 25000,
            url_foto: 'example.com',
            fecha_registro: new Date()
        }
    prismaMock.vehiculos.update.mockResolvedValue(newVehiculo);
    await expect(vehiculoService.updateVehiculos(
        1, 'AXY123', 'Toyota',
        'Corolla', '123',25000, 'example.com')
    ).resolves.toEqual(newVehiculo);
});

test('El metodo deleteVehiculo elimina el objeto y lo devuelve', async () =>{
    let vehiculo =
        {
            id: 1,
            placa: 'ABC123',
            marca: 'Toyota',
            modelo: 'Corolla',
            VIN: '123',
            fecha_compra: new Date(),
            costo: 25000,
            url_foto: 'example.com',
            fecha_registro: new Date()
        }
    prismaMock.vehiculos.delete.mockResolvedValue(vehiculo);
    await expect(vehiculoService.deleteVehiculo(1)
    ).resolves.toEqual(vehiculo);
});