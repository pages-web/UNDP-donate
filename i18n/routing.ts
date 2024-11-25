import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["mn", "en"],

  defaultLocale: "mn", // Change the default language to English
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
