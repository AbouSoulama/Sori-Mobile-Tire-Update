import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/get-a-quote", priority: 0.9, changeFrequency: "monthly" },
  { path: "/schedule-appointment", priority: 0.9, changeFrequency: "monthly" },
  { path: "/puncture-repair", priority: 0.8, changeFrequency: "monthly" },
  { path: "/wheel-repair", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tire-purchase-assistance", priority: 0.8, changeFrequency: "monthly" },
  { path: "/other", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service-area", priority: 0.8, changeFrequency: "monthly" },
  { path: "/emergency", priority: 0.95, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));
}
