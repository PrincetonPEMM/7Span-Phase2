import { buildMainIndexXml, xmlResponse } from "@/utils/sitemapXml";

export const revalidate = 3600;

// Main sitemap: an index of every language's by-type sitemaps (one level only).
export async function GET() {
  return xmlResponse(await buildMainIndexXml());
}
