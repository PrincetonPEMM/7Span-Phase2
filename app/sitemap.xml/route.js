import { buildMainIndexXml, xmlResponse } from "@/utils/sitemapXml";

export const revalidate = 3600;

// Main sitemap: an index that points to one sub-sitemap per language.
export async function GET() {
  return xmlResponse(await buildMainIndexXml());
}
