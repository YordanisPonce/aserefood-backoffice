export class UserDTO {
  id: string;
  username: string;
  email: string;
  name: string;
  lastnames: string;
  role: string;
  isActive: boolean;
  phoneNumber: string;
  constructor(
    id: string,
    username: string,
    email: string,
    name: string,
    lastnames: string,
    role: string,
    isActive: boolean,
    phoneNumber: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.lastnames = lastnames;
    this.role = role;
    this.isActive = isActive;
    this.phoneNumber = phoneNumber;
  }
}
