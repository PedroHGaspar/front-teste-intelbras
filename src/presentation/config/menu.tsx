import { HomeIcon } from "@components/icons/home";
import { BuildingIcon } from "@components/icons/building";
import { SidebarResource } from "../components/core/sidebar/types";

export const MENU_RESOURCES_CONFIGS: SidebarResource[] = [
  {
    id: "inicio",
    title: "Início",
    item: <HomeIcon customSize="2.3rem" />,
    path: "/",
  },
  {
    id: "centrals",
    title: "Centrais",
    item: <BuildingIcon customSize="2.3rem" />,
    path: "/centrals",
  },
];
