import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 640;

export function useSmallDevice() {
  const [isSmallDevice, setIsSmallDevice] = useState(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}PX)`);
    const onChange = () => {
      setIsSmallDevice(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsSmallDevice(window.innerWidth < MOBILE_BREAKPOINT);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isSmallDevice;
}
