"use client";
import TreeItemsList, {
  DataTree,
} from "@/components/common/tree-items-list/TreeItemsList";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Category } from "@/lib/types/category";
import { Pagination } from "@/lib/types/pagination";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

interface Props {
  categories: Category[];
  pagination: Pagination;
}

export default function CategoriesTreeView({ categories, pagination }: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    router.replace(pathname);
  }, [router, pathname]);
  const onEdit = (item: DataTree) => {
    handleOpenModal(modalTypes.categories.form.name, item.id);
  };
  const onCreate = (item: DataTree) => {
    handleOpenModal(modalTypes.subcategories.form.name, item.id);
  };
  const onViewDetails = (item: DataTree) => {
    handleOpenModal(modalTypes.categories.details.name, item.id);
  };
  const onDelete = (item: DataTree) => {
    handleOpenModal(modalTypes.categories.delete.name, item.id);
  };

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
      pagination={pagination}
      onViewDetails={onViewDetails}
      onDelete={onDelete}
      onEdit={onEdit}
      onCreate={onCreate}
    />
  );
}
