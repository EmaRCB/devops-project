import {VehiculoService} from "../services/vehiculo.service";
import {idNotFound, valorDuplicado} from "../exceptions/vehiculo-excepciones";

let vehiculoService:VehiculoService;
export class vehiculoController {

    constructor() {
        vehiculoService = new VehiculoService();
    }
    async getVehiculos(req:any, res:any, next:any){
        try {
            let vehiculos = await vehiculoService.getAll();
            res.status(200).json({status: 200, data: vehiculos, message: 'vehiculos encontrados'});
        }catch (error){
            next(error)
        }
    }

    async getVehiculo(req:any, res:any, next:any){
        try {
            let id = parseInt(req.params.id);
            let vehiculo = await vehiculoService.getOne(id);
            if(vehiculo === null){
                throw new idNotFound('El id no existe')
            }
            res.status(200).json({status: 200, data: vehiculo, message: 'vehiculo encontrados'});
        }catch (error){
            next(error)
        }
    }

    async createVehiculo(req:any, res:any, next:any){
        try {
            let fecha_compra = new Date().toISOString();
            let placaExiste = await vehiculoService.findPlaca(req.body.placa);
            if(placaExiste){
                throw new valorDuplicado('La placa esta duplicada');
            }
            let vinExiste = await vehiculoService.findVIN(req.body.VIN);
            if(vinExiste){
                throw new valorDuplicado('El VIN esta duplicado');
            }
            let vehiculo = await vehiculoService.createVehiculo(req.body.placa, req.body.marca,
                req.body.modelo, req.body.VIN, fecha_compra, parseInt(req.body.costo), req.body.url_foto);
            res.status(200).json({status: 200, data: vehiculo, message: 'vehiculo creado'});
        }catch (error){
            next(error);
        }
    }

    async updateVehiculo(req:any, res:any, next:any){
        try {
            let id = parseInt(req.params.id);
            let vehiculo = await vehiculoService.getOne(id);
            if(vehiculo === null){
                throw new idNotFound('El id no existe')
            }
            vehiculo = await vehiculoService.updateVehiculos(id, req.body.placa, req.body.marca,
                req.body.modelo, req.body.VIN, req.body.costo, req.body.url_foto);
            res.status(200).json({status: 200, data: vehiculo, message: 'vehiculo actualizado'});
        }catch (error){
            next(error);
        }
    }

    async deleteVehiculo(req:any, res:any, next:any){
        try {
            let id = parseInt(req.params.id);
            let vehiculo = await vehiculoService.getOne(id);
            if(vehiculo === null){
                throw new idNotFound('El id no existe')
            }
            vehiculo = await vehiculoService.deleteVehiculo(id)
            res.status(200).json({status: 200, data: vehiculo, message: 'vehiculo eliminado'});
        }catch (error){
            next(error);
        }
    }
    /*buildRequest(status:number, data:any, message:string){
        return {
            status: status,
            'message': message,
            'data': data,
        };
    }*/
}
