import { NextFunction, Request, Response } from "express";
import { client } from "../util/database_client";
import nodemailer from "nodemailer";
import {
  adminService,
  LoginDatos,
} from "../services/administradores.service";
import jwt from "../util/jwt";
require("dotenv").config();

//Esto solo lo hice para mandar el JSON como lo especificaron en el Trello
function jsonResponse(code: number, message: string, data: any) {
  return {
    code: code,
    message: message,
    data: data,
  };
}

function GenerarCodigoInvitacion() {
  const caracteresPermitidos =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < 6; i++) {
    codigo += caracteresPermitidos.charAt(
      Math.floor(Math.random() * caracteresPermitidos.length)
    );
  }
  return codigo;
}

async function EnviarCodigoInvitacion(
  correo: string,
  codigoInvitacion: string
) {
  try {
    const transportador = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transportador.sendMail({
      from: "Empresa Castul",
      to: correo,
      subject: "Codigo de invitacion",
      text: `¡Gracias por registrarte en nuestra aplicación! Tu código de invitación es: ${codigoInvitacion}`,
    });

    console.log("Correo electronico enviado: ", info.response);
  } catch (error) {
    console.error("Error al enviar correo electrónico:", error);
    throw new Error("Error al enviar correo electrónico");
  }
}

async function PreRegistro(req: any, res: any) {
  const { correo, contrasenia } = req.body;

  try {
    const existeUsuario = await client.administradores.findFirst({
      where: {
        correo: correo,
      },
    });

    if (existeUsuario) {
      const response = jsonResponse(400, "El correo ya esta en uso", null);
      return res.status(400).json(response);
    }

    const codigoInvitacion = GenerarCodigoInvitacion();

    // Guardar el código de invitación en la base de datos
    const nuevaInvitacion = await client.invitaciones.create({
      data: {
        codigo_invitacion: codigoInvitacion,
      },
    });

    await EnviarCodigoInvitacion(correo, codigoInvitacion);

    const response = jsonResponse(
      200,
      "Codigo de invitacion enviado correctamente",
      { correo }
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en el pre-registro", error);
    const response = jsonResponse(500, "Error interno del servidor", null);
    res.status(500).json(response);
  }
}

async function RegistrarAdministrador(req: any, res: any) {
  const { correo, contrasenia, codigoInvitacion } = req.body;

  try {
    //Verificar si es valido el codigo de invitacion
    const invitacion = await client.invitaciones.findFirst({
      where: {
        codigo_invitacion: codigoInvitacion,
        usado: false,
      },
    });

    if (!invitacion) {
      const response = jsonResponse(400, "Código de invitación inválido", null);
      return res.status(400).json(response);
    }

    //Registro al admin en la base de datos
    const nuevoAdministrador = await client.administradores.create({
      data: {
        correo,
        contrasenia,
        invitacion: {
          connect: {
            id: invitacion.id,
          },
        },
      },
    });

    //Marcar el codigo como utilizado
    await client.invitaciones.update({
      where: {
        id: invitacion.id,
      },
      data: {
        usado: true,
      },
    });

    const response = jsonResponse(
      201,
      "Administrador registrado correctamente",
      nuevoAdministrador
    );
    res.status(201).json(response);
  } catch (error) {
    console.error("Error al registrar al administrador", error);
    const response = jsonResponse(500, "Error interno del servidor", null);
    res.status(500).json(response);
  }
}

async function EliminarAdministrador(req: any, res: any) {
  try {
    const { id } = req.params;

    const adminExiste = await client.administradores.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!adminExiste) {
      const response = jsonResponse(
        404,
        "El administrador indicado no existe",
        id
      );
      return res.status(404).json(response);
    }

    await client.administradores.delete({
      where: {
        id: parseInt(id),
      },
    });

    const response = jsonResponse(
      200,
      "El administrador indicado ha sido eliminado",
      id
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al eliminar al administrador", error);
    const response = jsonResponse(500, "Error interno del servidor", null);
    res.status(500).json(response);
  }
}

async function ActualizarAdministrador(req: any, res: any) {
  try {
    const { id } = req.params;
    const { correo, contrasenia } = req.body;

    const adminExiste = await client.administradores.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!adminExiste) {
      const response = jsonResponse(
        404,
        "El administador proporcionado no existe",
        null
      );
      return res.status(404).json(response);
    }

    const adminActualizado = await client.administradores.update({
      where: {
        id: parseInt(id),
      },
      data: {
        correo,
        contrasenia,
      },
    });

    const response = jsonResponse(
      200,
      "El administrador se ha actualizado correctamente",
      adminActualizado
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al actualizar el administrador");
    const response = jsonResponse(500, "Error interno del servidor", null);
    res.status(500).json(response);
  }
}

async function ObtenerAdministradores(req: any, res: any) {
  try {
    const administradores = await client.administradores.findMany();

    res.status(200).json(administradores);
  } catch (error) {
    console.error("Error al obtener a los administradores", error);
    const response = jsonResponse(500, "Error interno del servidor", null);
    res.status(500).json(response);
  }
}

export async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const datos: LoginDatos = req.body as LoginDatos;
    const result = await adminService.ConfirmarCuenta(datos);
    const token = await jwt.GenerateToken({ data: result });

    res.send({
      code: 200,
      message: "Login satisfactorio",
      data: { access: token },
    });
  } catch (error) {
    next(error);
  }
}

async function ObtenerAdministrador(req: any, res: any) {
  try {
    const { id } = req.params;

    const administrador = await client.administradores.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!administrador) {
      const response = jsonResponse(
        404,
        "El administrador especificado no existe",
        null
      );
      return res.status(404).json(response);
    } else {
      res.status(200).json(administrador);
    }
  } catch (error) {
    console.error("Error al obtener al adminsitrador", error);
    const response = jsonResponse(500, "Error interno del servidor", null);
    res.status(500).json(response);
  }
}

export {
  PreRegistro,
  RegistrarAdministrador,
  EliminarAdministrador,
  ActualizarAdministrador,
  ObtenerAdministrador,
  ObtenerAdministradores,
};
