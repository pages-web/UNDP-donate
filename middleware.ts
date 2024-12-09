// import createMiddleware from "next-intl/middleware";
// import { locales, localePrefix } from "./navigation";

// export default createMiddleware({
//   defaultLocale: "mn",
//   localePrefix,
//   locales,
//   localeDetection: false,
// });

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/", "/(mn|en)/:path*"],
// };
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing, {
  localeDetection: false,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(mn|en)/:path*"],
};
