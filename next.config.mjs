import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**.erxes.io",
      },
      {
        protocol: "https",
        hostname: "erxes.io",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_MAIN_API_DOMAIN: "https://undp-donate.app.erxes.io/gateway",
    NEXT_PUBLIC_WS_DOMAIN: "https://undp-donate.app.erxes.io/api/graphql",
    NEXT_PUBLIC_POS_TOKEN: "pqq44YdohUqP3nnwNYSprf6bGvVG91mP",
  },
};
export default withNextIntl(nextConfig);
