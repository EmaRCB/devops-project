import { client } from "../util/database_client";
import { ConflictoDatos } from "../util/errores";

export type LoginDatos = {
  email: string;
  contrasenia: string;
};

class AdministradoresService {
  async ConfirmarCuenta(data: LoginDatos) {
    const admin = await client.administradores.findFirst({
      where: { contrasenia: data.contrasenia, correo: data.email },
      select: { id: true },
    });

    if (!admin)
      throw new ConflictoDatos("Los datos proporcionados son invalidos");

    return admin.id;
  }
}

export const adminService = new AdministradoresService();
