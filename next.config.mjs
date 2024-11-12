import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    NEXT_PUBLIC_MAIN_API_DOMAIN:
      "https://educated-space-donate.app.erxes.io/gateway",
    NEXT_PUBLIC_WS_DOMAIN: "educated-space-donate.app.erxes.io/api/graphql",
    NEXT_PUBLIC_POS_TOKEN: "fd8rErKbZVcL2eCRVRgEVSTHZsUTeIUT",
  },
};
export default withNextIntl(nextConfig);
