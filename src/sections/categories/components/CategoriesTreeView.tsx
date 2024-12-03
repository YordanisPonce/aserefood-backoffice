"use client";
import TreeItemsList, {
  DataTree,
} from "@/components/common/tree-items-list/TreeItemsList";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Category } from "@/lib/types/category";
import { Pagination } from "@/lib/types/pagination";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  categories: Category[];
  pagination: Pagination;
}

export default function CategoriesTreeView({ categories }: Props) {
  const { handleOpenModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    router.replace(pathname);
  }, []);
  const onEdit = (item: DataTree) => {
    handleOpenModal(modalTypes.categories.form.name, item.id);
  };
  const onCreate = (item: DataTree) => {
    handleOpenModal(modalTypes.subcategories.form.name, item.id);
  };
  const onViewDetails = (item: DataTree) => {};
  const onDelete = (item: DataTree) => {};

  const transformData = (items: Category[]): DataTree[] => {
    return items.map((item) => ({
      id: item.id.toString(),
      label: item.name,
      children: transformData(item.children),
    }));
  };

  return (
    <TreeItemsList
      data={transformData(categories)}
      onViewDetails={onViewDetails}
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    />
  );
}
