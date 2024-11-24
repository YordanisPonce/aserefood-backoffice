import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { InventoryEntry } from "@/lib/types/inventory";
import { Pagination } from "@/lib/types/pagination";
import { Provider } from "@/lib/types/provider";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type ProviderListProps = {
  providers: Provider[];
  pagination: Pagination;
};

export const ProviderList: FunctionComponent<ProviderListProps> = ({
  providers,
  pagination,
}) => {
  const colDef: GridColDef<InventoryEntry>[] = [
    {
      field: "name",
      headerName: "Nombre",
      sortable: false,
      flex: 1,
    },
  ];

  return (
    <RootDataGrid
      columns={colDef}
      data={providers}
      pagination={pagination}
      disableSelection
    />
  );
};
