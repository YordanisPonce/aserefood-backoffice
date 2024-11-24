import { ReactNode } from "react";
import { MoveToInbox as InboxIcon } from "@mui/icons-material";
import { routes } from "@/lib/config/routes";
interface Section {
  name: string;
  path: string;
  icon: ReactNode;
  subSections?: Section[];
}

export const sections: Section[] = [
  {
    name: "Dashboard",
    path: routes.dashboard.path,
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Categorias",
    path: routes.categories.path,
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Productos",
    path: routes.products.path,
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Proveedores",
    path: routes.providers.path,
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Zonas",
    path: routes.zones.path,
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Inventario",
    path: routes.inventory.path,
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Municipios",
    path: routes.municipalities.path,
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Provincias",
    path: routes.provinces.path,
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Usuarios",
    path: routes.users.path,
    icon: <InboxIcon />, // icon for exmaple
  },
];
