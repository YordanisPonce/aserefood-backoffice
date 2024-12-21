"use client";
import { useState } from "react";

export default function useDialog() {
  const [open, setOpen] = useState(false);

  function handleOpenDialog() {
    setOpen(true);
  }

  function handleCloseDialog() {
    setOpen(false);
  }
  return { open, handleOpenDialog, handleCloseDialog };
}
