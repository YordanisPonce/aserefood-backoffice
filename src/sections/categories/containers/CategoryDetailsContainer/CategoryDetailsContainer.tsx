"use client";
import React from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  Box,
  Chip,
} from "@mui/material";
import { Category } from "@mui/icons-material";
import useCategory from "../../hooks/useCategory";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";

export default function CategoryDetailsContainer() {
  const { entityId: categoryId } = useModal();
  const { category, error, fetchCategory, loadingData } = useCategory({
    categoryId,
  });
  return (
    <>
      {!loadingData ? (
        category && error === undefined ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Category sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                <Typography variant="h4" component="h2">
                  {category.name}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" color="text.secondary" paragraph>
                {category.description}
              </Typography>

              <Box my={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Categoría Padre:
                </Typography>
                <Typography variant="body1">
                  {category.parentName || "Categoría Raíz"}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Subcategorías
              </Typography>
              {category.children.length > 0 ? (
                <List
                  dense
                  sx={{
                    maxHeight: 150,
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    mb: 2,
                  }}
                >
                  {category.children.map((child, index) => (
                    <ListItem key={index}>
                      <Typography variant="body1">{child.name}</Typography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Esta categoría no tiene subcategorías.
                </Typography>
              )}

              <Box mt={2} display="flex" justifyContent="flex-end">
                <Chip
                  label={`Total subcategorías: ${category.children.length}`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchCategory}
          />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
