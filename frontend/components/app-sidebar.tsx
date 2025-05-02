"use client";

import type * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Frame,
  Map,
  PieChart,
  Settings2,
  ChevronRight,
  Users,
  LayoutDashboard,
  DollarSign,
  Database,
  Ticket,
} from "lucide-react";

import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// This is sample data.
const data = {
  teams: [
    {
      name: "Flamingo",
      logo: Ticket,
      plan: "Admin CMS",
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Master Data",
      url: "/admin/genres",
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
      url: "/admin/wallets",
      icon: DollarSign,
      items: [
        {
          title: "Wallets",
          url: "/admin/transaction-wallets",
        },
        {
          title: "Tickets",
          url: "/admin/transaction-tickets",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="group/sidebar" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]/sidebar:opacity-0">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.adminNav.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={pathname.startsWith(item.url)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {item.items.length === 0 ? (
                      <Link href={item.url} passHref>
                        <SidebarMenuButton data-active={pathname === item.url}>
                          {item.icon && (
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span className="group-data-[collapsible=icon]/sidebar:hidden">
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                      </Link>
                    ) : (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            data-active={pathname === item.url}
                          >
                            {item.icon && (
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                            )}
                            <span className="group-data-[collapsible=icon]/sidebar:hidden">
                              {item.title}
                            </span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]/sidebar:hidden" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="group-data-[collapsible=icon]/sidebar:hidden">
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
