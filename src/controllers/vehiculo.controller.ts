import {VehiculoService} from "../services/vehiculo.service";

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
            res.status(500).json({status: 500, message: error});
        }
    }

    async getVehiculo(req:any, res:any, next:any){
        try {
            let id = parseInt(req.params.id);
            let vehiculo = await vehiculoService.getOne(id);
            res.status(200).json({status: 200, data: vehiculo, message: 'vehiculo encontrados'});
        }catch (error){
            res.status(500).json({status: 500, message: error});
        }
    }

    async createVehiculo(req:any, res:any, next:any){
        try {
            let fecha_compra = new Date().toISOString();
            let vehiculo = await vehiculoService.createVehiculo(req.body.placa, req.body.marca,
                req.body.modelo, req.body.VIN, fecha_compra, req.body.costo, req.body.url_foto);
            res.status(200).json({status: 200, data: vehiculo, message: 'vehiculo creado'});
        }catch (error){
            res.status(500).json({status: 500, message: error});
        }
    }

    async updateVehiculo(req:any, res:any, next:any){
        try {
            let id = parseInt(req.params.id);
            let vehiculo = await vehiculoService.getOne(id);
            vehiculo = await vehiculoService.updateVehiculos(id, req.body.placa, req.body.marca,
                req.body.modelo, req.body.VIN, req.body.costo, req.body.url_foto);
            res.status(200).json({status: 200, data: vehiculo, message: 'vehiculo actualizado'});
        }catch (error){
            res.status(500).json({status: 500, message: error});
        }
    }

    async deleteVehiculo(req:any, res:any, next:any){
        try {
            let id = parseInt(req.params.id);
            let vehiculo = await vehiculoService.getOne(id);
            vehiculo = await vehiculoService.deleteVehiculo(id)
            res.status(200).json({status: 200, data: vehiculo, message: 'vehiculo eliminado'});
        }catch (error){
            res.status(500).json({status: 500, message: error});
        }
    }
    buildRequest(status:number, data:any, message:string){
        return {
            status: status,
            'message': message,
            'data': data,
        };
    }
}
