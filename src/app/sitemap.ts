import type { MetadataRoute } from "next";

// Read the canonical base URL from the environment variable.
// Set NEXT_PUBLIC_SITE_URL in your .env.local (e.g., https://yourdomain.com).
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          tr: `${BASE_URL}/tr`,
        },
      },
    },
    {
      url: `${BASE_URL}/tr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          tr: `${BASE_URL}/tr`,
        },
      },
    },
  ];
}
