export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  lastnames: string;
  role: string;
  isActive: boolean;
  phoneNumber: string;
}

export interface CreateUserDTO {
  name: string,
  lastnames: string,
  email: string,
  role: string,
  username: string,
  phoneNumber: string,
  password: string
}