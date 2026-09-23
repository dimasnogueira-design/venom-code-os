import type { MetadataRoute } from "next";
import { workCases } from "@/lib/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://venomcode.com.br", changeFrequency: "monthly", priority: 1 },
    { url: "https://venomcode.com.br/work", changeFrequency: "monthly", priority: .9 },
    ...workCases.map(({ slug }) => ({ url: `https://venomcode.com.br/work/${slug}`, changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
