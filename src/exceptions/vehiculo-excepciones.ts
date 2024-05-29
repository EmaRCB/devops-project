export class VehiculoExcepciones extends Error {
    public statusCode!: number;
    constructor(message: string) {
        super(message);
    }

    getStatusCode(){
        return this.statusCode;
    }

    getMessage(){
        return this.message;
    }
}

export class valorDuplicado extends VehiculoExcepciones{
    statusCode = 400;
    constructor(message:string) {
        super(message);
    }
}

export class idNotFound extends VehiculoExcepciones{
    statusCode = 404;
    constructor(message:string) {
        super(message);
    }
}