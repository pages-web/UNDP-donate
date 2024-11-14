import { Button } from "./components/ui/button";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="h-[40vw] flex items-center justify-center flex-col">
      <h2 className="text-4xl font-semibold">404</h2>
      <p className="text-neutral-500 pt-2 pb-1"> {t("Энлдсонгүй")} </p>
      <Button asChild variant="link">
        <Link href="/"> {t("Эхлэуцах")} </Link>
      </Button>
    </div>
  );
}
