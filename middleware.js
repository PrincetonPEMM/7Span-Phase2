import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  let cookie = request.cookies.get("nextjs");
  const allCookies = request.cookies.getAll();
  console.log(allCookies, "allCookies", cookie);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
