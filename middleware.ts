import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "mn"],

  defaultLocale: "mn",
});

export const config = {
  matcher: ["/", "/(mn|en)/:path*"],
};
