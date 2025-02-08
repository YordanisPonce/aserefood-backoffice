"use client";
import UserDetails from "../components/UserDetails";
import { useContext } from "react";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export default function UserDetailsContainer() {
  const { entityId } = useContext(ModalContext);

  return <UserDetails userId={entityId} />;
}
