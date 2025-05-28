import * as React from "react";
import {
  ChartArea,
  GalleryVerticalEnd,
  Settings2,
  Database,
  DollarSign,
} from "lucide-react";

import { NavMain } from "../components/nav-main";
import { NavDashboard } from "@/components/nav-dashboard";
import { NavUser } from "@/components/nav-user";
import { HeadBar } from "@/components/head-bar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  headbar: {
    name: "Flamingo",
    logo: GalleryVerticalEnd,
    plan: "CMS",
    url: "/admin",
  },
  dashboard: {
    name: "Dashboard",
    url: "/admin",
    icon: ChartArea,
  },
  navMain: [
    {
      title: "Master Data",
      url: "#",
      icon: Database,
      items: [
        {
          title: "Genres",
          url: "/admin/genres",
        },
        {
          title: "Movies",
          url: "/admin/movies",
        },
        {
          title: "Theaters",
          url: "/admin/theaters",
        },
        {
          title: "Customers",
          url: "/admin/customers",
        },
      ],
    },
    {
      title: "Transactions",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Wallet",
          url: "/admin/wallet-transactions",
        },
        {
          title: "Ticket",
          url: "/admin/ticket-transactions",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeadBar headbar={data.headbar} />
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard item={data.dashboard} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
