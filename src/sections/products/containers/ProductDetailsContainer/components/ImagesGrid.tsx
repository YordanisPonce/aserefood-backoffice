"use client";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
interface Props {
  images: string[];
}
export default function ImagesGrid({ images }: Props) {
  return (
    <>
      <Typography variant="subtitle2" gutterBottom>
        Imagenes:
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "300px" }}>
        <Grid container sx={{ padding: 2 }} spacing={2}>
          {images.map((image, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
                  alt={`Product image ${index + 1}`}
                  sx={{
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
