"use client";

import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import RHFInputWithLabel from "./RHFInputWithLabel";
import RHFAutocompleteFetcher from "./RHFAutocompleteFetcher";
import { getAllProducts } from "@/lib/services/products";
interface RHFListProps<T extends Record<string, unknown>> {
  name: string;
  titleList: string;
  titleButton: string;
  noDataText: string;
  propertyMap: Record<keyof T, string>;
}

export default function RHFList<T extends Record<string, unknown>>({
  name,
  titleList,
  noDataText,
  titleButton,
  propertyMap,
}: RHFListProps<T>) {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  console.log(errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  function bodyItemRendering(field: Record<"id", string>, index: number) {
    const renderingComponents: Array<ReactNode> = new Array<ReactNode>();

    for (const key in field) {
      if (field.hasOwnProperty(key)) {
        const property = field[key as keyof typeof field];
        if (typeof property === "number")
          renderingComponents.push(
            <RHFInputWithLabel
              key={key}
              name={name + "." + index + "." + key}
              label={key in propertyMap ? propertyMap[key] : ""}
              type="number"
            />
          );
        else if (typeof property === "object")
          renderingComponents.push(
            <RHFAutocompleteFetcher
              key={key}
              fullWidth
              name={name + "." + index + "." + key}
              label={key in propertyMap ? propertyMap[key] : ""}
              onFetch={getAllProducts}
              getOptionLabel={(opt) => opt.name}
              getOptionKey={(opt) => opt.id}
              size="small"
            />
          );
      }
    }

    return renderingComponents;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" gutterBottom>
          {titleList}
        </Typography>
        {(errors[name]?.message || errors[name]?.root) && (
          <Typography color="error" variant="caption">
            {String(errors[name]?.message || errors[name]?.root?.message)}
          </Typography>
        )}
      </Box>
      <Divider />
      <Box
        sx={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: 2,
          marginBottom: 2,
        }}
      >
        {fields.length > 0
          ? fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{ display: "flex", alignItems: "end", mb: 2, gap: 2 }}
              >
                {bodyItemRendering(field, index)}
                <IconButton onClick={() => remove(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          : noDataText}
      </Box>

      <Button
        onClick={() => {
          append({ product: null, amount: 1 });
        }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        {titleButton}
      </Button>
    </Box>
  );
}
