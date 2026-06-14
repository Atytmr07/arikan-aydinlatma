"use client";

import { useEffect, useState } from "react";

// Returns true once the window has scrolled past `threshold` px.
// Used by both navbars for the transparent → blurred-bg transition.
export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
