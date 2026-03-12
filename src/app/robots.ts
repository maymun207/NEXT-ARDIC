import type { MetadataRoute } from "next";

// The site URL is read from the NEXT_PUBLIC_SITE_URL environment variable.
// Set this in your .env.local and in your Vercel project settings.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
