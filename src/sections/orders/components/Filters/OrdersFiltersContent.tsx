import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { OrdersFilters } from "@/lib/types/order";
import useAllDeliveryMethods from "@/sections/delivery-methods/hooks/useAllDeliveryMethods";
import useAllMunicipalities from "@/sections/municipalities/hooks/useAllMunicipalities";
import useAllUsers from "@/sections/users/hooks/useAllUsers";
import { Box, TextField } from "@mui/material";
import React from "react";

interface Props {
  filters: OrdersFilters;
  handleFilterChange: (filters: OrdersFilters) => void;
}

export default function OrdersFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    deliveryMethods,
    error: errorAllDeliveryMethods,
    isLoading: isLoadingAllDeliveryMethods,
    fetchDeliveryMethods,
  } = useAllDeliveryMethods();
  const {
    users,
    error: errorAllUsers,
    isLoading: isLoadingAllUsers,
    fetchUsers,
  } = useAllUsers();
  const {
    municipalities,
    error: errorAllMunicipalities,
    isLoading: isLoadingAllMunicipalities,
    fetchMunicipalities,
  } = useAllMunicipalities();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SelectInputFilterFetcher
        value={filters.deliveryMethodId}
        options={deliveryMethods}
        error={errorAllDeliveryMethods}
        isLoading={isLoadingAllDeliveryMethods}
        fetcher={fetchDeliveryMethods}
        label="Método de Entrega"
        onChange={(e) =>
          handleFilterChange({
            deliveryMethodId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
      <SelectInputFilterFetcher
        value={filters.municipalityId}
        options={municipalities}
        error={errorAllMunicipalities}
        isLoading={isLoadingAllMunicipalities}
        fetcher={fetchMunicipalities}
        label="Municipio"
        onChange={(e) =>
          handleFilterChange({
            municipalityId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
      <SelectInputFilterFetcher
        value={filters.userId}
        options={users}
        error={errorAllUsers}
        isLoading={isLoadingAllUsers}
        fetcher={fetchUsers}
        label="Usuario"
        onChange={(e) =>
          handleFilterChange({
            userId: e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />

      <TextField
        label="Código"
        value={filters.code ? filters.code : ""}
        onChange={(e) => {
          handleFilterChange({
            code: e.target.value === "" ? undefined : e.target.value,
          });
        }}
      />
    </Box>
  );
}
