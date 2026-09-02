import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Public, indexable routes. Redirects (/new, /first-time, /conference),
// internal tools (/evangelism), and gated areas (/admin, /login) are omitted.
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/locations", priority: 0.9, changeFrequency: "monthly" },
  { path: "/who-we-are", priority: 0.8, changeFrequency: "monthly" },
  { path: "/who-we-are/what-to-expect", priority: 0.8, changeFrequency: "monthly" },
  { path: "/who-we-are/our-beliefs", priority: 0.7, changeFrequency: "yearly" },
  { path: "/next-steps", priority: 0.8, changeFrequency: "monthly" },
  { path: "/learn-to-pray", priority: 0.7, changeFrequency: "monthly" },
  { path: "/read-your-bible", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/media", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/songs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/worship", priority: 0.6, changeFrequency: "monthly" },
  { path: "/worship/albums", priority: 0.5, changeFrequency: "monthly" },
  { path: "/worship/saltworship", priority: 0.5, changeFrequency: "monthly" },
  { path: "/worship/switch-music", priority: 0.5, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/giving", priority: 0.6, changeFrequency: "yearly" },
  { path: "/giving/ways", priority: 0.5, changeFrequency: "yearly" },
  { path: "/giving/faq", priority: 0.5, changeFrequency: "yearly" },
  { path: "/join", priority: 0.5, changeFrequency: "monthly" },
  { path: "/shop", priority: 0.4, changeFrequency: "monthly" },
  { path: "/events/spirit-of-faith", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
