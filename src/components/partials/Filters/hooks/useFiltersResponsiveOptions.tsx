import { useMediaQuery } from "@mui/material";
import { Theme } from "@mui/system";
import React, { useState } from "react";

export default function useFiltersResponsiveOptions() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    if (isMobile) {
      setIsDrawerOpen(false);
    } else {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;
  return { isMobile, handleClick, handleClose, isDrawerOpen, anchorEl, id, open };
}
