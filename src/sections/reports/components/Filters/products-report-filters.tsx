'use client'
import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField } from '@mui/material';
import useReportsFilters from './hooks/useReportsFilters';

const ProductsReportFilters = () => {
  const { handleChangeFilters, filters } = useReportsFilters();

  const handleDateChange = (key: string, newValue?: Date | null) => {
    handleChangeFilters({ [key]: newValue ? newValue.toISOString() : undefined });
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleChangeFilters({ quantity: value ? value.toString() : undefined });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" alignItems="center" gap={2}>
        <DatePicker
          label="A partir del"
          value={filters.startDate ? dayjs(filters.startDate) : null}
          onChange={(newValue) => handleDateChange('startDate', newValue?.toDate())}
        />
        <DatePicker
          label="Hasta"
          value={filters.endDate ? dayjs(filters.endDate) : null}
          onChange={(newValue) => handleDateChange('endDate', newValue?.toDate())}
        />
        <TextField
          label="Cantidad de Productos  "
          value={filters.quantity ?? ''}
          onChange={handleQuantityChange}
          type="number"
          inputProps={{ min: 1 }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ProductsReportFilters;
