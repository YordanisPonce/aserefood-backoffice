import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { Pagination } from "@/lib/types/pagination";
import { Province } from "@/lib/types/province";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type ProvincesListProps = {
  providers: Province[];
  pagination: Pagination;
};

export const ProvincesList: FunctionComponent<ProvincesListProps> = ({
  providers,
  pagination,
}) => {
  const colDef: GridColDef<Province>[] = [
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
