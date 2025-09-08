import middlewareAuth from "@/utils/auth/middlewareAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // چک لاگین کاربر
  const user = await middlewareAuth(req);

  // اگر مسیر auth است و کاربر لاگین است، ریدایرکت به خانه
  if (pathname.startsWith("/auth") && user) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // مسیرهای user
  if (pathname.startsWith("/user")) {
    if (!user) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
    if (user.role !== "customer") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // مسیرهای admin
  if (pathname.startsWith("/admin")) {
    if (!user) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
    if (user.role !== "admin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/user/:path*"],
};
