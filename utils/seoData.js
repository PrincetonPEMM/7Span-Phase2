import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";

const CMS = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const PER_PAGE = 500;

export const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/stories", priority: 0.9, changeFrequency: "weekly" },
  { path: "/manuscripts", priority: 0.9, changeFrequency: "weekly" },
  { path: "/paintings", priority: 0.9, changeFrequency: "weekly" },
  { path: "/paintings/by-story", priority: 0.7, changeFrequency: "weekly" },
  {
    path: "/paintings/by-manuscript",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  { path: "/about/mission", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/people", priority: 0.6, changeFrequency: "monthly" },
  {
    path: "/about/events-and-workshops",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { path: "/about/news-and-updates", priority: 0.6, changeFrequency: "weekly" },
  {
    path: "/about/connect/contact-us",
    priority: 0.4,
    changeFrequency: "yearly",
  },
  {
    path: "/about/connect/using-the-site",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  {
    path: "/research/research-and-lessons",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/research/teaching-with-pemm",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/research/arabic-manuscripts",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/research/arabic-stories",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { path: "/research/bibliography", priority: 0.6, changeFrequency: "monthly" },
  { path: "/research/incipit-tool", priority: 0.6, changeFrequency: "monthly" },
  { path: "/research/macomber", priority: 0.6, changeFrequency: "monthly" },
  { path: "/research/maps", priority: 0.6, changeFrequency: "monthly" },
  { path: "/research/repositories", priority: 0.6, changeFrequency: "monthly" },
  { path: "/research/spellings", priority: 0.6, changeFrequency: "monthly" },
];

const safe = async (label, fn) => {
  try {
    return await fn();
  } catch (error) {
    console.log(`SEO data: failed to load ${label}`, error);
    return [];
  }
};

const directusItems = (collection, fields) =>
  client.request(readItems(collection, { fields, limit: -1, sort: "id" }));

// The stories / manuscripts / paintings endpoints are paginated custom APIs.
const pagedApi = async (endpoint) => {
  const rows = [];
  let page = 1;
  let total = Infinity;
  while (rows.length < total) {
    const res = await fetch(
      `${CMS}${endpoint}?page=${page}&perPage=${PER_PAGE}`,
    );
    const json = await res.json();
    if (!json?.data?.length) break;
    rows.push(...json.data);
    total = json.total ?? rows.length;
    page += 1;
  }
  return rows;
};

// Sitemap settings entered in the CMS `seo` collection, keyed by the value
// used in the page URL. Only entries that have an SEO record are returned; if
// the request fails (e.g. no public permission) the map is simply empty.
const cmsSitemapSettings = async (collection, keyField) => {
  const rows = await safe(`${collection} seo`, () =>
    client.request(
      readItems(collection, {
        fields: [
          keyField,
          "seo.no_index",
          "seo.sitemap_priority",
          "seo.sitemap_change_frequency",
        ],
        filter: { seo: { _nnull: true } },
        limit: -1,
      }),
    ),
  );
  return new Map(
    rows
      .filter(
        (r) => r?.seo && r[keyField] !== undefined && r[keyField] !== null,
      )
      .map((r) => [
        String(r[keyField]),
        {
          noIndex: Boolean(r.seo.no_index),
          priority: r.seo.sitemap_priority || undefined,
          changeFrequency: r.seo.sitemap_change_frequency || undefined,
        },
      ]),
  );
};

// Adds the CMS sitemap settings to each route and drops routes the CMS marks
// as no_index, so hidden pages are not listed in the sitemap or llms.txt.
const withCmsSettings = (routes, settings) =>
  routes
    .map(({ key, ...route }) => ({ ...route, ...settings.get(String(key)) }))
    .filter((route) => !route.noIndex);

// Every dynamic public route. `id` is the value used in the page URL.
export const getDynamicRoutes = async () => {
  const [events, news, research, people, stories, manuscripts, paintings] =
    await Promise.all([
      safe("events", () =>
        directusItems("events_and_workshops", ["id", "title"]),
      ),
      safe("news", () => directusItems("news_and_updates", ["id", "title"])),
      safe("research", () =>
        directusItems("research_and_lessons", ["id", "title"]),
      ),
      safe("people", () =>
        directusItems("about_people_detail", [
          "id",
          "slug",
          "first_name",
          "last_name",
        ]),
      ),
      safe("stories", () => pagedApi("stories")),
      safe("manuscripts", () => pagedApi("manuscripts")),
      safe("paintings", () => pagedApi("paintings")),
    ]);

  const [
    eventsSeo,
    newsSeo,
    researchSeo,
    peopleSeo,
    storiesSeo,
    manuscriptsSeo,
    paintingsSeo,
  ] = await Promise.all([
    cmsSitemapSettings("events_and_workshops", "id"),
    cmsSitemapSettings("news_and_updates", "id"),
    cmsSitemapSettings("research_and_lessons", "id"),
    cmsSitemapSettings("about_people_detail", "slug"),
    cmsSitemapSettings("canonical_stories", "canonical_story_id"),
    cmsSitemapSettings("manuscripts", "web_page_address"),
    cmsSitemapSettings("paintings", "painting_unique_id"),
  ]);

  return {
    events: withCmsSettings(
      events.map((r) => ({
        key: r.id,
        path: `/about/events-and-workshops/${r.id}`,
        title: r.title,
      })),
      eventsSeo,
    ),
    news: withCmsSettings(
      news.map((r) => ({
        key: r.id,
        path: `/about/news-and-updates/${r.id}`,
        title: r.title,
      })),
      newsSeo,
    ),
    research: withCmsSettings(
      research.map((r) => ({
        key: r.id,
        path: `/research/research-and-lessons/${r.id}`,
        title: r.title,
      })),
      researchSeo,
    ),
    people: withCmsSettings(
      people
        .filter((r) => r.slug)
        .map((r) => ({
          key: r.slug,
          path: `/about/people/${r.slug}`,
          title: `${r.first_name ?? ""} ${r.last_name ?? ""}`.trim(),
        })),
      peopleSeo,
    ),
    stories: withCmsSettings(
      stories
        .filter((r) => r.canonical_story_id)
        .map((r) => ({
          key: r.canonical_story_id,
          path: `/stories/${r.canonical_story_id}`,
          title: r.canonical_story_title,
        })),
      storiesSeo,
    ),
    manuscripts: withCmsSettings(
      manuscripts
        .filter((r) => r.web_page_address)
        .map((r) => ({
          key: r.web_page_address,
          path: `/manuscripts/${r.web_page_address}`,
          title: r.manuscript_full_name,
        })),
      manuscriptsSeo,
    ),
    paintings: withCmsSettings(
      paintings
        .filter((r) => r.web_page_address && r.painting_unique_id)
        .map((r) => ({
          key: r.painting_unique_id,
          path: `/paintings/${r.web_page_address}_${r.painting_unique_id}`,
          title: r.pemm_short_title,
        })),
      paintingsSeo,
    ),
  };
};

// Same language fallback the detail pages use: translated content only when
// the language lists that page in `translated_pages`.
export const getContentLanguage = async (lang, translatedPageKey) => {
  const languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] }),
  );
  const selected = languages.find((l) => l.code === lang);
  return selected?.translated_pages?.includes(translatedPageKey)
    ? lang
    : i18n.defaultLocale;
};

export const getLanguageCodes = async () => {
  try {
    const languages = await client.request(
      readItems("languages", { fields: ["code", "translated_pages"] }),
    );
    return languages;
  } catch (error) {
    console.log("SEO data: failed to load languages", error);
    return i18n.locales.map((code) => ({ code, translated_pages: [] }));
  }
};

// translated_pages key used by the app for each dynamic group.
export const DYNAMIC_PAGE_KEYS = {
  stories: "/stories/id",
  manuscripts: "/manuscripts/id",
  paintings: "/paintings/id",
  research: "/research/research-and-lessons/id",
  people: "/about/people/id",
  news: "/about/news-and-updates/id",
  events: "/about/events-and-workshops/id",
};

// SEO entered in the CMS lives in the shared `seo` collection (with one
// `seo_translations` row per language), linked from each content collection
// through its `seo` field. Returns the values for `lang`, falling back to the
// default locale, or an empty object when nothing is set or the request fails.
export const getCmsSeo = async (collection, filter, lang) => {
  try {
    const [item] = await client.request(
      readItems(collection, {
        fields: [
          "seo.og_image",
          "seo.no_index",
          "seo.no_follow",
          "seo.translations.languages_code",
          "seo.translations.title",
          "seo.translations.meta_description",
        ],
        filter,
        limit: 1,
      }),
    );
    const seo = item?.seo;
    if (!seo) return {};

    const translations = Array.isArray(seo.translations)
      ? seo.translations
      : [];
    const translation =
      translations.find((t) => t.languages_code === lang) ||
      translations.find((t) => t.languages_code === i18n.defaultLocale);

    return {
      title: translation?.title,
      description: translation?.meta_description,
      image: seo.og_image ? `${CMS}assets/${seo.og_image}` : undefined,
      noIndex: Boolean(seo.no_index),
      noFollow: Boolean(seo.no_follow),
    };
  } catch (error) {
    console.log("SEO fetch failed", collection, error?.message);
    return {};
  }
};
