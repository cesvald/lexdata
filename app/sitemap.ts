import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: ahora, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/preguntas-frecuentes`, lastModified: ahora, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/eliminar-datos`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
  ];
}
