"use client"
import { useState } from "react";

export default function useUsersFiltersOptions() {
  const [roles] = useState(["Admin", "Super Admin"]);
  const [isActiveOptions] = useState(["Activada", "No Activada"]);
  return { roles, isActiveOptions };
}
