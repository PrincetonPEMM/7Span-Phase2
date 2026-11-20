import { IS_PRODUCTION, absoluteUrl } from "@/utils/seo";

export default function robots() {
  return {
    rules: IS_PRODUCTION
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
