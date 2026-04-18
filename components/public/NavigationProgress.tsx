"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 400, // slower trickle (default 200)
  minimum: 0.5,
  easing: "ease",
  speed: 500, // animation speed in ms (default 200) — this is what makes it smoother
});

export function NavigationProgress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]); // fires when navigation completes

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Only trigger for internal navigation
      const isInternal =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !target.getAttribute("target");

      if (isInternal && href !== pathname) {
        NProgress.start();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null; // purely side-effect component
}
