import { asignacionesModelo } from "../src/services/asignaciones.service";
import client from "../src/util/database_client";
import { prismaMock } from "./mock/client-mock";

describe("Asignaciones Prueba Service", () => {
  beforeEach(() => {
    prismaMock.asignaciones.create.mockResolvedValue({
      id: 0,
      id_conductor: 0,
      id_vehiculo: 0,
      activo: true,
    });

    prismaMock.asignaciones.delete.mockResolvedValue({
      id: 0,
      id_conductor: 0,
      id_vehiculo: 0,
      activo: true,
    });

    prismaMock.asignaciones.update.mockResolvedValue({
      id: 0,
      id_conductor: 0,
      id_vehiculo: 0,
      activo: true,
    });

    prismaMock.asignaciones.findMany.mockResolvedValue([
      {
        id: 0,
        id_conductor: 0,
        id_vehiculo: 0,
        activo: true,
      },
      {
        id: 1,
        id_conductor: 1,
        id_vehiculo: 1,
        activo: true,
      },
    ]);
  });

  test("Servicio Crear se llama ", async () => {
    const mockCrear = jest.spyOn(asignacionesModelo, "Crear");
    await asignacionesModelo.Crear({ idConductor: 0, idVehiculo: 0 });
    expect(mockCrear).toHaveBeenCalledTimes(1);
    mockCrear.mockRestore();
  });

  test("Servicio Eliminar se llama ", async () => {
    const mockCrear = jest.spyOn(asignacionesModelo, "Desactivar");
    await asignacionesModelo.Desactivar(0);
    expect(mockCrear).toHaveBeenCalledTimes(1);
    mockCrear.mockRestore();
  });

  test("Servicio Actualizar se llama ", async () => {
    const mockCrear = jest.spyOn(asignacionesModelo, "Actualizar");
    await asignacionesModelo.Actualizar({
      idAsignacion: 0,
      idConductor: 0,
      idVehiculo: 0,
    });
    expect(mockCrear).toHaveBeenCalledTimes(1);
    mockCrear.mockRestore();
  });

  test("Servicio Obtener se llama ", async () => {
    const mockCrear = jest.spyOn(asignacionesModelo, "ObtenerTodos");
    await asignacionesModelo.ObtenerTodos();
    expect(mockCrear).toHaveBeenCalledTimes(1);
    mockCrear.mockRestore();
  });
});
