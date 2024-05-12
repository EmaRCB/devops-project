import {VehiculoExcepciones} from "../../exceptions/vehiculo-excepciones";

export const manejadorExcepcionesVehiculo = (err: Error, req: any, res: any, next: any) => {
    if (err instanceof VehiculoExcepciones) {
        res.status(err.getStatusCode())
            .send({ code: err.getStatusCode(), message: err.getMessage()});
    } else {
        next(err);
    }
};