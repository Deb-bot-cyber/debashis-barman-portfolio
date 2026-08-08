import { MetadataRoute } from "next";
import { readDb } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://debashisbarman.com";

  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const db = readDb();
    if (db.blogs && Array.isArray(db.blogs)) {
      blogUrls = db.blogs.map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.date || Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (e) {
    // fallback if DB read fails
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
