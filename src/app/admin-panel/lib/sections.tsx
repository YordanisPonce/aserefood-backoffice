import { ReactNode } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
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
    name: "Categories",
    path: "/admin-panel/categories",
    icon: <InboxIcon />, // icon for exmaple
  },
];
