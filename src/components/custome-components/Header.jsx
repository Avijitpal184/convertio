"use client";

import React, { Suspense } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import ToggleTheme from "./ToggleTheme";
import ShareBtn from "./ShareBtn";
import { usePathname, useSearchParams } from "next/navigation";

function HeaderContent() {
  const [fullUrl, setFullUrl] = React.useState("");
  const searchParams = useSearchParams();
  const pathName = usePathname();

  React.useEffect(() => {
    const params = `${
      searchParams.toString() ? "?" + searchParams.toString() : ""
    }`;
    setFullUrl(`${window.location.origin}${pathName}${params}`);
  }, [pathName, searchParams]);

  return (
    <div className="flex items-center h-full justify-between">
      <SidebarTrigger />
      <div className="flex items-center gap-3">
        <ShareBtn fullUrl={fullUrl} />
        <ToggleTheme />
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 px-4 z-50 w-full h-14 backdrop-blur py-1 bg-background/95 supports-[backdrop-filter]:bg-background/90">
      <Suspense fallback={<div className="h-14" />}>
        <HeaderContent />
      </Suspense>
    </header>
  );
}
