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
    NEXT_PUBLIC_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6IlVORFAiLCJjcmVhdGVkQXQiOiIyMDI0LTExLTI0VDA5OjIyOjI2LjYwN1oiLCJ1c2VyR3JvdXBJZCI6IjRFSHlkVERBaXMyTGRRblpuIiwiZXhwaXJlRGF0ZSI6IjIwMjQtMTItMjZUMTA6MzE6NTUuNjk1WiIsIm5vRXhwaXJlIjp0cnVlLCJhbGxvd0FsbFBlcm1pc3Npb24iOnRydWUsIl9pZCI6Im1jb0F3bnV3SUJtdnNLXy1LQnVmRSIsIl9fdiI6MH0sImlhdCI6MTczMjYxNzE0OX0.0k3sUMlyki3WNITFIDcK7V8OmZHnnszMXPlrODZNFAU",
  },
};
export default withNextIntl(nextConfig);
