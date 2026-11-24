import { i18n } from "@/i18n";
import { absoluteUrl } from "@/utils/seo";
import {
  DYNAMIC_PAGE_KEYS,
  getDynamicRoutes,
  getLanguageCodes,
  STATIC_ROUTES,
} from "@/utils/seoData";

// Sub-sitemap name -> key of getDynamicRoutes(), or "static" for fixed pages.
const SITEMAP_SOURCES = {
  pages: "static",
  stories: "stories",
  manuscripts: "manuscripts",
  paintings: "paintings",
  research: "research",
  people: "people",
  news: "news",
  events: "events",
};

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// The default language lists every page. Other languages only list the pages
// the CMS marks as translated for them, since the rest fall back to English.
const getLanguage = async (code) => {
  const languages = await getLanguageCodes();
  return languages.find((l) => l.code === code);
};

const isAllowed = (language, key) =>
  language.code === i18n.defaultLocale ||
  (language.translated_pages ?? []).includes(key);

// Sub-sitemaps that have at least one page for this language.
export const getSitemapNames = (language) =>
  Object.entries(SITEMAP_SOURCES)
    .filter(
      ([, source]) =>
        source === "static" || isAllowed(language, DYNAMIC_PAGE_KEYS[source]),
    )
    .map(([name]) => name);

export const getAllSitemapParams = async () => {
  const languages = await getLanguageCodes();
  return languages.flatMap((language) =>
    getSitemapNames(language).map((name) => ({
      lang: language.code,
      name: `${name}.xml`,
    })),
  );
};

const indexXml = (locations) => {
  const lastmod = new Date().toISOString();
  const items = locations
    .map(
      (loc) =>
        `  <sitemap>\n    <loc>${escapeXml(
          loc,
        )}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
};

// Main sitemap: lists every language's by-type sitemap directly. Search
// engines don't allow a sitemap index inside another sitemap index, so this
// must not point to the per-language indexes (/{lang}/sitemap.xml).
export const buildMainIndexXml = async () => {
  const params = await getAllSitemapParams();
  return indexXml(
    params.map(({ lang, name }) => absoluteUrl(`/${lang}/sitemaps/${name}`)),
  );
};

// Language sitemap: one entry per content type available in that language.
export const buildLanguageIndexXml = async (code) => {
  const language = await getLanguage(code);
  if (!language) return null;
  return indexXml(
    getSitemapNames(language).map((name) =>
      absoluteUrl(`/${code}/sitemaps/${name}.xml`),
    ),
  );
};

export const buildUrlSetXml = async (code, name) => {
  const language = await getLanguage(code);
  const source = SITEMAP_SOURCES[name];
  if (!language || !source || !getSitemapNames(language).includes(name)) {
    return null;
  }

  let entries;
  if (source === "static") {
    entries = STATIC_ROUTES.filter(
      ({ path }) =>
        language.code === i18n.defaultLocale ||
        isAllowed(language, path || "/"),
    );
  } else {
    // CMS sitemap settings win; otherwise the defaults below apply.
    const defaultPriority =
      source === "stories" || source === "manuscripts" ? 0.8 : 0.6;
    entries = (await getDynamicRoutes())[source].map(
      ({ path, changeFrequency, priority }) => ({
        path,
        changeFrequency: changeFrequency || "monthly",
        priority: priority || defaultPriority,
      }),
    );
  }

  const urls = entries
    .map(
      ({ path, changeFrequency, priority }) =>
        `  <url>\n    <loc>${escapeXml(
          absoluteUrl(`/${code}${path}`),
        )}</loc>\n    <changefreq>${changeFrequency}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

export const xmlResponse = (body) =>
  new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
