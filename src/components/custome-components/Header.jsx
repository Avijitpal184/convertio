"use client";
import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import ToggleTheme from "./ToggleTheme";
import ShareBtn from "./ShareBtn";
import { usePathname, useSearchParams } from "next/navigation";

export default function Header() {
  const [fullUrl, setFullUrl] = useState("");
  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    const params = `${
      searchParams.toString() ? "?" + searchParams.toString() : ""
    }`;
    setFullUrl(`${window.location.origin}${pathName}${params}`);
  }, [pathName, searchParams]);

  return (
    <header className="sticky top-0 px-4 z-50 w-full h-14 backdrop-blur py-1 bg-background/95 supports-[backdrop-filter]:bg-background/90">
      <div className="flex items-center h-full justify-between">
        <SidebarTrigger />

        <div className="flex items-center gap-3">
          <ShareBtn fullUrl={fullUrl} />

          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
