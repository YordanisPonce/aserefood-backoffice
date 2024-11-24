import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  ContentPasteSearch as ContentPasteSearchIcon,
  BorderColor as BorderColorIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState } from "react";

interface MenuProps {
  onEdit?: VoidFunction;
  onDelete?: VoidFunction;
  onViewDetails?: VoidFunction;
}

const TableMenu = ({ onDelete, onEdit, onViewDetails }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {onViewDetails && (
          <MenuItem
            onClick={() => {
              handleClose();
              onViewDetails();
            }}
          >
            <ContentPasteSearchIcon sx={{ mr: 2 }} /> Ver detalles
          </MenuItem>
        )}

        {onEdit && (
          <MenuItem
            onClick={() => {
              handleClose();
              onEdit();
            }}
          >
            <BorderColorIcon sx={{ mr: 2 }} />
            Editar
          </MenuItem>
        )}

        {onDelete && (
          <MenuItem
            onClick={() => {
              handleClose();
              onDelete();
            }}
            sx={{ color: "error.main" }}
          >
            <DeleteIcon sx={{ mr: 2 }} />
            Eliminar
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default TableMenu;
