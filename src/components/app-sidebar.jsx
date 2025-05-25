"use client";

import * as React from "react";
import { GiCardExchange } from "react-icons/gi";
import { RiToolsFill } from "react-icons/ri";


import { NavMain } from "@/components/nav-main";
import { NavLogo } from "@/components/nav-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { FileImage } from "lucide-react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Convert",
      url: "/",
      icon: GiCardExchange,
    },
    {
      title: "Compress",
      url: "/compress-image",
      icon: FileImage,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
