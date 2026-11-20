import { i18n } from "@/i18n";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pemm.princeton.edu"
).replace(/\/$/, "");

// Only the production build is indexed and tracked. Local, dev and staging
// are not (NEXT_PUBLIC_MODE comes from the .env.* files).
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_MODE === "Prod";

export const DEFAULT_OG_IMAGE =
  "https://cms.ethiopicmary.com/assets/3000720b-978c-481d-804d-2eb653217467";

const DESCRIPTION_LIMIT = 160;

export const stripHtml = (value) =>
  String(value ?? "")
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/(https?:\/\/|www\.)\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const truncate = (value, limit = DESCRIPTION_LIMIT) => {
  const text = stripHtml(value);
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit - 1);
  return `${cut
    .slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length)
    .trim()}…`;
};

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  String(value).trim() === "" ||
  String(value).toLowerCase() === "null";

// First non-empty value wins. The CMS SEO value goes first so it is the
// primary value, and the entry's own title/description is the fallback.
export const pick = (...values) => values.find((v) => !isEmpty(v));

// Many paintings illustrate the same story, so the story title alone repeats
// across hundreds of pages. Adding the manuscript and folio (or scan) makes
// each painting page's title distinct without touching the CMS data.
export const buildPaintingTitle = (painting) => {
  const story = pick(
    painting?.canonical_story_title,
    painting?.pemm_short_title,
  );
  const location = [
    pick(painting?.web_page_address),
    pick(painting?.painting_folio)
      ? `fol. ${painting.painting_folio}`
      : pick(painting?.painting_scan)
      ? `scan ${painting.painting_scan}`
      : undefined,
  ]
    .filter(Boolean)
    .join(", ");
  return [story, location].filter(Boolean).join(" – ");
};

// First episode description of the painting, without its "1. " numbering.
export const paintingEpisodeText = (painting) => {
  const first = Array.isArray(painting?.episode_descriptions)
    ? painting.episode_descriptions[0]
    : undefined;
  return first ? String(first).replace(/^\d+\.\s*/, "") : undefined;
};

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

export const getAllowedLocale = (lang) =>
  i18n.locales.includes(lang) ? lang : i18n.defaultLocale;

// Builds the Next.js metadata object for a detail page. `description` is
// optional: when empty the parent layout's description is kept.
export const buildDetailMetadata = ({
  title,
  description,
  path,
  lang,
  image,
  noIndex = false,
  noFollow = false,
}) => {
  const cleanTitle = stripHtml(title);
  const cleanDescription = description ? truncate(description) : "";
  const url = absoluteUrl(`/${getAllowedLocale(lang)}${path}`);
  const images = [image || DEFAULT_OG_IMAGE];

  return {
    ...(cleanTitle && { title: cleanTitle }),
    ...(cleanDescription && { description: cleanDescription }),
    // Only set robots when the CMS asks to hide the page; otherwise the
    // layout's value (index in production, noindex elsewhere) applies.
    ...((noIndex || noFollow) && {
      robots: {
        index: IS_PRODUCTION && !noIndex,
        follow: IS_PRODUCTION && !noFollow,
      },
    }),
    alternates: { canonical: url },
    openGraph: {
      ...(cleanTitle && { title: cleanTitle }),
      ...(cleanDescription && { description: cleanDescription }),
      url,
      siteName: "PEMM",
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      ...(cleanTitle && { title: cleanTitle }),
      ...(cleanDescription && { description: cleanDescription }),
      images,
    },
  };
};
