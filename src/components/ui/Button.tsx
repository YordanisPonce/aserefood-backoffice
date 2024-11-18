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
  borderRadius?: string | number; 
  size?: "small" | "medium" | "large"; 
}

export default function Button({
  children,
  type = undefined,
  color = "primary",
  fullWidth = false,
  variant = "text",
  action = () => {},
  borderRadius = 1, 
  size = "medium", 
}: Props) {
  
  const padding = size === "small" ? 0.5 : size === "large" ? 1.5 : 1;
  const fontSize = size === "small" ? "0.75rem" : size === "large" ? "1.25rem" : "1rem";

  return (
    <BtnMUI
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      sx={{
        py: padding,
        px: padding * 2,
        borderRadius: borderRadius, // Aplicar borde redondeado
        fontSize: fontSize, // Ajustar tamaño de fuente
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
