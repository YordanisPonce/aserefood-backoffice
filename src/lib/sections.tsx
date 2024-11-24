import { ReactNode } from "react";
import {
  MoveToInbox as InboxIcon,
  Inventory2Rounded as Inventory2RoundedIcon,
  PublicRounded as PublicRoundedIcon,
  FmdGoodRounded as FmdGoodRoundedIcon,
  CategoryRounded as CategoryRoundedIcon,
  ShoppingCartRounded as ShoppingCartRoundedIcon,
  PeopleAltRounded as PeopleAltRoundedIcon,
  HomeWorkRounded as HomeWorkRoundedIcon,
} from "@mui/icons-material";
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
    icon: <InboxIcon />,
  },
  {
    name: "Categorías",
    path: routes.categories.path,
    icon: <CategoryRoundedIcon />,
  },
  {
    name: "Productos",
    path: routes.products.path,
    icon: <ShoppingCartRoundedIcon />,
  },
  {
    name: "Proveedores",
    path: routes.providers.path,
    icon: <HomeWorkRoundedIcon />,
  },
  {
    name: "Zonas",
    path: routes.zones.path,
    icon: <PublicRoundedIcon />,
  },
  {
    name: "Inventario",
    path: routes.inventory.path,
    icon: <Inventory2RoundedIcon />,
  },
  {
    name: "Municipios",
    path: routes.municipalities.path,
    icon: <FmdGoodRoundedIcon />,
  },
  {
    name: "Provincias",
    path: routes.provinces.path,
    icon: <FmdGoodRoundedIcon />,
  },
  {
    name: "Usuarios",
    path: routes.users.path,
    icon: <PeopleAltRoundedIcon />,
  },
];
