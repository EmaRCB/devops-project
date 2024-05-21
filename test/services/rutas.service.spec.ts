import { RutasModelo } from "../../src/services/rutas.service";
import { prismaMock } from "../mock/client-mock";

const RutaService = new RutasModelo();

let rutaArray:any;
beforeEach(()  => {
    rutaArray =[
        { id: 1, nombre_ruta: 'Itzaes', long_empresa: '233', lat_empresa: '223', long_destino: '424', lat_destino: '234', fecha_recorrido: new Date(), fecha_creacion: new Date(), exitoso: true, descripcion_problema: 'descripcion', comentarios: 'comentarios', id_asignacion: 0},
        { id: 2, nombre_ruta: 'Paseo Montejo', long_empresa: '533', lat_empresa: '234', long_destino: '192', lat_destino: '093', fecha_recorrido: new Date(), fecha_creacion: new Date(), exitoso: true, descripcion_problema: 'descripcion', comentarios: 'comentarios', id_asignacion: 1},
    ];
})

test('El metodo getRutas llama a prisma una vez', async () =>{
    prismaMock.rutas.findMany.mockResolvedValue(rutaArray);
    let mock = jest.spyOn(RutaService, 'obtenerRutas')
    await RutaService.obtenerRutas();
    expect(mock).toHaveBeenCalledTimes(1);
});

test('El metodo getRutas devuelve todas las rutas de la base de datos', async () =>{
    prismaMock.rutas.findMany.mockResolvedValue(rutaArray);
    await expect(RutaService.obtenerRutas()).resolves.toBe(rutaArray);
});

test('El metodo getRuta llama a prisma una vez', async () =>{
    prismaMock.rutas.findMany.mockResolvedValue(rutaArray);
    let mock = jest.spyOn(RutaService, 'obtenerRutas')
    await RutaService.obtenerRutas();
    expect(mock).toHaveBeenCalledTimes(1);
});

test('El metodo getRuta llama a prisma con el id que se llamo al metodo', async () =>{
    prismaMock.rutas.findUnique.mockResolvedValue(rutaArray[0]);
    await RutaService.obtenerRutasPorId(1);
    expect(prismaMock.rutas.findUnique).toHaveBeenCalledWith({where:{ id: rutaArray[0]['id']}});
});

test('El metodo getRuta devuelve unicamente un objeto que prisma devuelve', async () =>{
    prismaMock.rutas.findUnique.mockResolvedValue(rutaArray[0]);
    let mock = jest.spyOn(RutaService, 'obtenerRutasPorId')
    await expect(RutaService.obtenerRutasPorId(1)).resolves.toBe(rutaArray[0])
});

test('El metodo getRuta devuelve unicamente un objeto que prisma devuelve', async () =>{
    prismaMock.rutas.findUnique.mockResolvedValue(rutaArray[0]);
    await expect(RutaService.obtenerRutasPorId(1)).resolves.toBe(rutaArray[0])
});

test('El metodo createRuta devuelve crea la nueva ruta y la devuelve', async () =>{
    let newRuta =
    { id: 1, nombre_ruta: 'Itzaes', long_empresa: '233', lat_empresa: '223', long_destino: '424', lat_destino: '234', fecha_recorrido: new Date(), fecha_creacion: new Date(), exitoso: true, descripcion_problema: 'descripcion', comentarios: 'comentarios', id_asignacion: 0}
    prismaMock.rutas.create.mockResolvedValue(newRuta);

    const newRutaData = {
        id: 1,
        nombre_ruta: 'Itzaes',
        long_empresa: '233',
        lat_empresa: '223',
        long_destino: '424',
        lat_destino: '234',
        fecha_recorrido: new Date().toISOString(),
        fecha_creacion: new Date().toISOString(),
        exitoso: true,
        descripcion_problema: 'descripcion',
        comentarios: 'comentarios',
        id_asignacion: 0
    };

    await expect(RutaService.crearRutas(newRutaData)).resolves.toEqual(newRutaData);
});

test('El metodo updateRuta devuelve el objeto actualizado', async () =>{
    let newRuta =
    { id: 1, nombre_ruta: 'Itzaes', long_empresa: '233', lat_empresa: '223', long_destino: '424', lat_destino: '234', fecha_recorrido: new Date(), fecha_creacion: new Date(), exitoso: true, descripcion_problema: 'descripcion', comentarios: 'comentarios', id_asignacion: 0}
    prismaMock.rutas.update.mockResolvedValue(newRuta);

    const rutaAct = {
        id: 1,
        nombre_ruta: 'Av. Itzaes',
        long_empresa: '233',
        lat_empresa: '223',
        long_destino: '292',
        lat_destino: '234',
        fecha_recorrido: new Date().toISOString(),
        fecha_creacion: new Date().toISOString(),
        exitoso: false,
        descripcion_problema: 'descripcion',
        comentarios: 'comentarios',
        id_asignacion: 0
    };

    await expect(RutaService.actualizarRuta(1, rutaAct)).resolves.toEqual(rutaAct);
});

test('El metodo deleteRuta elimina el objeto y lo devuelve', async () =>{
    let ruta = {
        id: 1,
        nombre_ruta: 'Av. Itzaes',
        long_empresa: '233',
        lat_empresa: '223',
        long_destino: '292',
        lat_destino: '234',
        fecha_recorrido: new Date(),
        fecha_creacion: new Date(),
        exitoso: false,
        descripcion_problema: 'descripcion',
        comentarios: 'comentarios',
        id_asignacion: 0
    }
    prismaMock.rutas.delete.mockResolvedValue(ruta);

    await expect(RutaService.eliminarRuta(1)).resolves.toEqual(ruta);
});