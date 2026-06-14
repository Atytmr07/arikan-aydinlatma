"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface LoginState {
  error: string | null;
}

const COOKIE_NAME = "admin_session";
const ONE_WEEK = 60 * 60 * 24 * 7;

// Server Action for the login form. Compares against ADMIN_PASSWORD env var,
// sets the session cookie, and redirects to the panel.
export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "Sunucu yapılandırması eksik (ADMIN_PASSWORD)." };
  }

  if (password !== expected) {
    return { error: "Hatalı şifre." };
  }

  cookies().set(COOKIE_NAME, "true", {
    // Non-HttpOnly so the client useAdminAuth hook can read it for UX;
    // the authoritative gate is the middleware reading the same cookie.
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin/panel");
}

export async function logout(): Promise<void> {
  cookies().delete(COOKIE_NAME);
  redirect("/admin");
}
