/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "media.graphassets.com",
      "via.placeholder.com",
      "avatars.dicebear.com",
    ],
  },
  env: {
    CMS_API_TOKEN: process.env.CMS_API_TOKEN,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  },
};

module.exports = nextConfig;
