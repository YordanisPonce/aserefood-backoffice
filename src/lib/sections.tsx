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
  CalendarMonth as CalendarMonthIcon,
  LocalShipping as LocalShippingIcon,
  ShoppingBasket as ShoppingBasketIcon,
  SettingsSuggest as SettingsSuggestIcon,
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
    name: "Órdenes de Compra",
    path: routes.orders.path,
    icon: <ShoppingBasketIcon />,
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
    name: "Combos de Productos",
    path: routes.productCombos.path,
    icon: <ShoppingCartRoundedIcon />,
  },
  {
    name: "Promociones",
    path: routes.promotions.path,
    icon: <CalendarMonthIcon />,
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
    name: "Métodos de Entrega",
    path: routes.deliveryMethods.path,
    icon: <LocalShippingIcon />,
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
  {
    name: "Configuración de WhatsApp",
    path: routes.whatsappConf.path,
    icon: <SettingsSuggestIcon />,
  },
];
