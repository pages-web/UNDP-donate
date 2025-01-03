import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getConfig } from "../../sdk/queries/auth";
import { Metadata } from "next/types";
import { Toaster } from "./components/ui/sonner";
import DefaultLayout from "./components/layouts";
import Providers from "../../store";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Montserrat from "next/font/local";
import ConfigProvider from "./components/layouts/config";
import React from "react";
import { cn, getSimilarColorWithOpacity, hexToHsl } from "../../lib/utils";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const montserrat = Montserrat({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getConfig();
  const { pdomain, name, description, uiOptions } = config || {};

  return {
    metadataBase: new URL(pdomain || "https://www.erxes.io"),
    title: name || "Default Title",
    description: description || "Default Description",
    openGraph: {
      title: name || "Default Title",
      description: description || "Default Description",
      images: [
        {
          url: uiOptions?.bgImage || "/default-image.jpg",
          width: 600,
          height: 600,
          alt: name || "Default Title",
        },
      ],
      url: pdomain || "https://www.erxes.io",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = await getMessages();
  const { config } = await getConfig();
  const { uiOptions } = config || {};
  const { colors } = uiOptions || {};

  return (
    <html lang={locale || "en"} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        {!!colors && (
          <style>{`
            :root {
              ${
                colors?.primary ? `--primary: ${hexToHsl(colors.primary)};` : ""
              }
              ${
                colors?.primary
                  ? `--accent: ${hexToHsl(
                      getSimilarColorWithOpacity(colors.primary, 0.2)
                    )};`
                  : ""
              }
              ${
                colors?.secondary
                  ? `--active: ${hexToHsl(colors.secondary)};`
                  : ""
              }
              ${
                colors?.third
                  ? `--background: ${hexToHsl(
                      colors.third
                    )}; --card: ${hexToHsl(colors.third)};`
                  : ""
              }
            }
          `}</style>
        )}
      </head>
      <body
        className={cn(
          `min-h-screen bg-background font-sans ${montserrat.variable} antialiased`
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextTopLoader color="#3165AC" shadow={false} height={2} />
          <Providers>
            <ConfigProvider config={config}>
              <DefaultLayout>{children}</DefaultLayout>
            </ConfigProvider>
          </Providers>
          <Toaster richColors closeButton />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
