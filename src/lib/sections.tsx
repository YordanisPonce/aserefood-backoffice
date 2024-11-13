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
    path: "/dashboard",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Categorias",
    path: "/categories",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Productos",
    path: "/products",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Zona",
    path: "/zone",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Inventario",
    path: "/inventory",
    icon: <InboxIcon />, // icon for exmaple
  },
  {
    name: "Usuarios",
    path: "/users",
    icon: <InboxIcon />, // icon for exmaple
  },
];
