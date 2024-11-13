import { ReactNode } from "react";
import { MoveToInbox as InboxIcon } from "@mui/icons-material";
interface Section {
  name: string;
  path: string;
  icon: ReactNode;
  subSections?: Section[];
}

export const sections: Section[] = [
  {
    name: "DashBoard",
    path: "/admin-panel/dashboard",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Categorias",
    path: "/admin-panel/categories",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Productos",
    path: "/admin-panel/products",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Zona",
    path: "/admin-panel/zone",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Inventario",
    path: "/admin-panel/inventory",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Usuarios",
    path: "/admin-panel/users",
    icon: <InboxIcon />, // icon for exmaple
  },
];
