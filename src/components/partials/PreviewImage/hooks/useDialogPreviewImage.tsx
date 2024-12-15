"use client";
import { useState } from "react";

export default function useDialogPreviewImage() {
  const [openFullView, setOpenFullView] = useState(false);
  const handleOpenDialog = () => setOpenFullView(true);
  const handleCloseDialog = () => setOpenFullView(false);
  return { openFullView, handleCloseDialog, handleOpenDialog };
}
