export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  lastnames: string;
  role: string;
  isConfirmed: boolean;
  isActive: boolean;
  phoneNumber: string;
}

export interface CreateUser {
  name: string;
  lastnames: string;
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateUser {
  name: string;
  lastnames: string;
  email: string;
  username: string;
  phoneNumber: string;
}
export interface CreateUserDTO {
  name: string;
  lastnames: string;
  email: string;
  role: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateUserDTO {
  name: string;
  lastnames: string;
  email: string;
  role: string;
  username: string;
  phoneNumber: string;
}

export enum Role {
  Customer = "customer",
  Admin = "admin",
}
