import { getConfig } from "../../sdk/queries/auth";
import React from "react";
import { Metadata } from "next";
import TsahimWrapper from "../../app/[locale]/components/titles/TsahimWrapper";

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getConfig();

  return {
    title: config.name + " - Хандив өгөх",
    openGraph: {
      title: config.name + " - Хандив өгөх",
    },
  };
}

export default async function Home() {
  return <TsahimWrapper />;
}
