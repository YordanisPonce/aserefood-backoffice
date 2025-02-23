export enum ErrorMessages {
  UNAUTHORIZED = "No cuenta con la autorización necesaria para acceder a dicha funcionalidad, por favor vuelva a logearse",
  OK = "Operación completada con éxito",
  UNEXPECTED = "Ocurrió un error inesperado. Vuelva a intentarlo más tarde"
}

export interface ApiError {
  status: number;
  message: string;
}

export class UnauthorizedClientError extends Error {
  constructor(messege: string) {
    super(messege);
  }
}
