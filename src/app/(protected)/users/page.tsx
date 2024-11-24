import React from "react";
import { UsersList } from "@/sections/users/UsersList";
import { getUsers } from "@/lib/services/user";
import { SearchParams } from "@/lib/types/pagination";

type UsersPageProps = {
  searchParams: SearchParams;
};

export default async function UserManagementPage({
  searchParams,
}: UsersPageProps) {
  const { data, page, total, pageSize } = await getUsers(searchParams);

  return <UsersList pagination={{ page, total, pageSize }} users={data} />;
}
