import { i18n } from "@/i18n";
import { buildLanguageIndexXml, xmlResponse } from "@/utils/sitemapXml";

export const revalidate = 3600;
export const dynamicParams = false;

export const generateStaticParams = () =>
  i18n.locales.map((lang) => ({ lang }));

// Language sitemap: an index of the by-type sub-sitemaps for this language.
export async function GET(request, { params }) {
  const { lang } = await params;
  const xml = await buildLanguageIndexXml(lang);
  if (!xml) return new Response("Not found", { status: 404 });
  return xmlResponse(xml);
}
