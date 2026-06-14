"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UseAdminAuthReturn {
  isAuthenticated: boolean;
  logout: () => void;
}

// Client-side guard that reads the non-HttpOnly `admin_session` cookie.
// The authoritative check lives in middleware; this is a UX convenience.
export function useAdminAuth(): UseAdminAuthReturn {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasSession = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("admin_session=true"));
    setIsAuthenticated(hasSession);
  }, []);

  const logout = useCallback(() => {
    document.cookie =
      "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
    router.push("/admin");
    router.refresh();
  }, [router]);

  return { isAuthenticated, logout };
}
