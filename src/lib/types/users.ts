import { SerializableFile } from "../utils/fileTransformers";
import { SearchParams } from "./pagination";

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  lastnames: string;
  role: string;
  isConfirmed: boolean;
  isActive: boolean;
  phoneNumber: string;
  image: string;
}

export interface CreateUser {
  name: string;
  lastnames: string;
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  image: File | null;
}

export interface UpdateUser {
  name: string;
  lastnames: string;
  email: string;
  username: string;
  phoneNumber: string;
  image: File | null;
}
export interface CreateUserDTO {
  name: string;
  lastnames: string;
  email: string;
  role: string;
  username: string;
  phoneNumber: string;
  password: string;
  image: string | null;
}

export interface UpdateUserDTO {
  name: string;
  lastnames: string;
  email: string;
  role: string;
  username: string;
  phoneNumber: string;
  image: string | null;
}

export enum Role {
  Customer = "customer",
  Admin = "admin",
}

// filters

export interface UsersFilters extends SearchParams {
  role?: Role;
  isActive?: boolean;
}
