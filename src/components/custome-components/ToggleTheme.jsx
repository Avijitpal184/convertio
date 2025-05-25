"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <div onClick={toggleTheme}>
      <Button className="w-8 h-8 rounded-full" variant="outline">
        {!mounted ? (
          <Moon className="opacity-50 animate-pulse" />
        ) : resolvedTheme === "light" ? (
          <Moon />
        ) : (
          <Sun />
        )}
      </Button>
    </div>
  );
}
