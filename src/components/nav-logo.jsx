"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export function NavLogo({ teams }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/" className="hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
              <Image src="/assets/logo.png" alt="logo" width={32} height={32} />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-bold text-xl ">Convertio</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
