import { buildUrlSetXml, getAllSitemapParams, xmlResponse } from "@/utils/sitemapXml";

// Rebuilt at most once an hour, so entries added, edited or deleted in
// Directus show up without a redeploy.
export const revalidate = 3600;
export const dynamicParams = false;

export const generateStaticParams = () => getAllSitemapParams();

export async function GET(request, { params }) {
  const { lang, name } = await params;
  const xml = await buildUrlSetXml(lang, name.replace(/\.xml$/, ""));
  if (!xml) return new Response("Not found", { status: 404 });
  return xmlResponse(xml);
}
