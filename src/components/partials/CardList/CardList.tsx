"use client";
import React, { ReactNode } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

interface Props<T> {
  items: T[];
  CardComponent: React.ComponentType<{ data: T }>;
  filters?: ReactNode;
  onAddCard?: () => void;
}

export default function CardList<T>({
  items,
  CardComponent,
  filters,
  onAddCard,
}: Props<T>) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mb: 2,
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {filters}
        {onAddCard && (
          <Tooltip title="Añadir">
            <IconButton color="primary">
              <Add />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {items.length > 0 ? (
        <Box
          className="card-list"
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {items.map((item, index) => (
            <CardComponent key={index} data={item} />
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No hay elementos disponibles</Typography>
      )}
    </Box>
  );
}
