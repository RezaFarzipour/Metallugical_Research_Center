import middlewareAuth from "@/utils/auth/middlewareAuth";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  // console.log(req.url, req.nextUrl.pathname);
  if (pathname.startsWith("/user")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/auth", url));
    if (user && user.role !== "customer")
      return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/auth", url));
    if (user && user.role !== "admin")
      return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
