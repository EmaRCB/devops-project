export class VehiculoExcepciones extends Error {
    public statusCode!: number;
    constructor(message: string, statusCode:number) {
        super(message);
        this.statusCode = statusCode;
    }

    getStatusCode(){
        return this.statusCode;
    }

    getMessage(){
        return this.message;
    }
}

export class PlacaDuplicada extends VehiculoExcepciones{
    constructor(message:string, statusCode:number) {
        super(message, statusCode);
    }
}