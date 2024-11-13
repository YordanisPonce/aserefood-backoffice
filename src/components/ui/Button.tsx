import React, { ReactNode } from "react";
import { Button as BtnMUI } from "@mui/material";

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  color?:
    | "primary"
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  fullWidth?: boolean;
  variant?: "text" | "contained" | "outlined";
  action?: (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => void;
}

export default function Button({
  children,
  type = undefined, 
  color = "primary",
  fullWidth = false,
  variant = "text",
  action= () => {},
}: Props) {
  return (
    <BtnMUI
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      sx={{
        mt: 3,
        mb: 2,
        py: 1.5,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
      color={color}
      onClick={action}
    >
      {children}
    </BtnMUI>
  );
}
