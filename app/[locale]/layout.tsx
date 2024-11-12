import { Inter } from "next/font/google";
import "./globals.css";
import { cn, getSimilarColorWithOpacity, hexToHsl } from "@/lib/utils";
import DefaultLayout from "@/components/layouts";
import Providers from "@/store";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { getConfig } from "@/sdk/queries/auth";
import ConfigProvider from "@/components/layouts/config";
import { Metadata } from "next/types";
import { getMessages } from "next-intl/server";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Ensure this is defined correctly
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getConfig();
  const { pdomain, name, description, uiOptions } = config || {};

  return {
    metadataBase: new URL(pdomain || "https://www.erxes.io"),
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      images: [
        {
          url: uiOptions?.bgImage,
          width: 600,
          height: 600,
          alt: name,
        },
      ],
      url: pdomain,
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
    <html lang={locale || "mn"} suppressHydrationWarning>
      <head>
        <link rel="icon" href={uiOptions?.favIcon || "/default-favicon.ico"} />
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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable // Correctly use the CSS variable here
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <ConfigProvider config={config}>
              <DefaultLayout>{children}</DefaultLayout>
            </ConfigProvider>
          </Providers>
          <Toaster richColors closeButton />
          <SpeedInsights /> {/* Ensure this is correctly placed */}
        </NextIntlClientProvider>{" "}
        {/* Make sure this tag is properly closed */}
      </body>
    </html>
  );
}
