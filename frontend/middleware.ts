import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const secretToken = req.cookies.get("secretToken")?.value;
  const { pathname } = req.nextUrl;

  // ADMIN AREA
  if (pathname.startsWith("/admin/auth") && secretToken) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/auth") &&
    !secretToken
  ) {
    return NextResponse.redirect(new URL("/admin/auth/login", req.url));
  }

  // CUSTOMER AREA
  if (pathname === "/auth/sign-in" && secretToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    (pathname.startsWith("/my-ticket") ||
      pathname.startsWith("/my-wallet") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/my-ticket") ||
      pathname.startsWith("/transaction-ticket")) &&
    !secretToken
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin/auth/:path*", "/auth/sign-in", "/:path*"],
};
