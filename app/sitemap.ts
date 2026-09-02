import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    ["", "/privacy"].map((suffix) => ({
      url: new URL(`/${locale}${suffix}`, siteUrl).toString(),
      lastModified: new Date(),
    })),
  );
}
