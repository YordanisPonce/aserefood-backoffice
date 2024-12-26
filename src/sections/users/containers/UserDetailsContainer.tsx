"use client";

import useModal from "@/components/partials/Modal/hooks/useModal";
import UserDetails from "../components/UserDetails";

export default function UserDetailsContainer() {
  const { entityId } = useModal();

  return <UserDetails userId={entityId} />;
}
