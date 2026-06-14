import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Guards the admin panel and admin API. Unauthenticated panel requests are
// redirected to the login screen; API requests get a 401.
export function middleware(req: NextRequest) {
  const isAuthed = req.cookies.get("admin_session")?.value === "true";
  const { pathname } = req.nextUrl;

  if (!isAuthed) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
    }
    const loginUrl = new URL("/admin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/panel/:path*", "/api/admin/:path*"],
};
