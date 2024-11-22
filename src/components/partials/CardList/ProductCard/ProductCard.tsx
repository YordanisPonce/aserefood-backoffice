"use client";

import { ProductDTO } from "@/lib/dto/ProductDTO";
import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  data: ProductDTO;
}

export default function ProductCard({ data: product }: Props) {
  return (
    <Card key={product.id} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{`${product.name}`}</Typography>
        <Typography color="text.secondary">
          {product.shortDescription}
        </Typography>
        <Typography variant="body2">
          Descripcion: {product.description}
        </Typography>
        <Typography variant="body2">Proveedores:</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {product.providers.map((provider) => (
            <Typography key={provider.id} variant="body2">
              {provider.name}
            </Typography>
          ))}
        </Box>
        <Typography variant="body2">
          Categoría: {product.categoryName}
        </Typography>
        <Typography variant="body2">
          Servicio: {product.isService ? "Disponible" : "No disponible"}{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" color="primary">
          <Edit />
        </IconButton>
        <IconButton size="small" color="error">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
