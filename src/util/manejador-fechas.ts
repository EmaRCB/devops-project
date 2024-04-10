export function ObtenerInicioDia(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay.toISOString();
}

// Función para obtener la fecha con la hora de 23:59
export function ObtenerFinDia(date: Date) {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.toISOString();
}
