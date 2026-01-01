import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n } from "./i18n";

function getLocale(request) {
  const allCookies = request.cookies.getAll();
  const langCookie = allCookies.filter((item) => item.name === "lang")[0] || {};

  const locales = i18n.locales;
  const requestedLocale = langCookie?.value;

  // If no cookie or empty value, return default locale
  if (!requestedLocale || requestedLocale.trim() === "") {
    return i18n.defaultLocale;
  }

  try {
    const locale = matchLocale([requestedLocale], locales, i18n.defaultLocale);
    return locale;
  } catch (error) {
    // If matchLocale throws an error (e.g., invalid locale format), return default
    return i18n.defaultLocale;
  }
}

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

// export function middleware(request) {
//   const pathname = request.nextUrl.pathname;
//   const allCookies = request.cookies.getAll();
//   const langCookie = allCookies.filter((item) => item.name === "lang")[0] || {};
//   // let langCode = "en-us";
//   request.nextUrl.pathname = "/en-us";
//   console.log(request.nextUrl.pathname, "request.nextUrl.pathname");

//   if (Object?.keys(langCookie).length)
//     request.nextUrl.pathname += `/${langCookie.value}`; //langCode = langCookie.value;

//   let path = pathname.split("/");
//   path[1] = langCookie.value;
//   path = path.join("/");

//   // console.log(langCode, "langCode");
//   //${pathname.startsWith("/") ? "" : "/"}${pathname}
//   // return NextResponse.redirect(new URL(`/${langCode}`, request.url));
//   // return NextResponse.redirect(request.nextUrl);
//   return NextResponse.next();
// }

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
