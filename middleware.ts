import { middlewareAuth } from "@/utils/middlewareAuth";
import { NextResponse } from "next/server";
//import { middlewareAuth } from "./utils/middlewareAuth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("🛡️ Middleware running - path:", req.nextUrl.pathname);

  console.log("✅ access_token:", req.cookies.get("access_token")?.value);

  if (pathname ==="/auth")  {
    const user = await middlewareAuth(req);
    if (user) return NextResponse.redirect(new URL(`/`, req.url));
  }

  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL(`/signin`, req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/auth"],
};
