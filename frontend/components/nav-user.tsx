"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useLogout from "@/hooks/useLogout";
import { SkeletonUser } from "./nav-user-skeleton";
import { useFetchUserAuth } from "@/hooks/useFetchUserAuth";
import Image from "next/image";
import DefaultUserIcon from "@/public/DefaultUserIcon.png";
import Link from "next/link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { isPending, onSubmit } = useLogout();

  const { data: meAuth, isLoading } = useFetchUserAuth();
  console.log(meAuth);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isLoading ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <SkeletonUser />
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    <Image
                      src={
                        meAuth?.photoUrl &&
                        meAuth?.photoUrl !== "default.png" &&
                        !meAuth?.photoUrl.includes("undefined")
                          ? meAuth.photoUrl
                          : DefaultUserIcon
                      }
                      alt={meAuth?.name || ""}
                      width={32}
                      height={32}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]/sidebar:hidden">
                  <span className="truncate font-semibold">{meAuth?.name}</span>
                  <span className="truncate text-xs">{meAuth?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]/sidebar:hidden" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              {isLoading ? (
                <SkeletonUser />
              ) : (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      <Image
                        src={
                          meAuth?.photoUrl &&
                          meAuth?.photoUrl !== "default.png" &&
                          !meAuth?.photoUrl.includes("undefined")
                            ? meAuth.photoUrl
                            : DefaultUserIcon
                        }
                        alt={meAuth?.name || ""}
                        width={32}
                        height={32}
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {meAuth?.name}
                    </span>
                    <span className="truncate text-xs">{meAuth?.email}</span>
                  </div>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <BadgeCheck />
                <Link href="/admin/profile">My Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={onSubmit}
              disabled={isPending}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
