import React from "react";
// interface example
// ***Temporary here****
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

export default function useUsers() {
  // Data example
  const users: User[] = [
    {
      id: "1",
      username: "johndoe",
      email: "john@example.com",
      name: "John",
      lastnames: "Doe",
      role: "Admin",
      isActive: true,
      phoneNumber: "+1234567890",
    },
    {
      id: "2",
      username: "janedoe",
      email: "jane@example.com",
      name: "Jane",
      lastnames: "Doe",
      role: "User",
      isActive: true,
      phoneNumber: "+0987654321",
    },
  ];
  return { users };
}
