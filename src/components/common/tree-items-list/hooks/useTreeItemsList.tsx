"use client";
import { useEffect, useState } from "react";
import { DataTree } from "../TreeItemsList";

interface Props {
  data: DataTree[];
}

export default function useTreeItemsList({ data }: Props) {
  const [items, setItems] = useState(data);
  useEffect(() => {
    setItems(data);
  }, [data]);
  return { items };
}
