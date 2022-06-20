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
    CMS_ENDPOINT: process.env.CMS_ENDPOINT,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
  },
};

module.exports = nextConfig;
