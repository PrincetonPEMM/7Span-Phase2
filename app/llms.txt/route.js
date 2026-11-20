import { i18n } from "@/i18n";
import { absoluteUrl } from "@/utils/seo";
import { getDynamicRoutes, STATIC_ROUTES } from "@/utils/seoData";

export const revalidate = 3600;

const SECTIONS = [
  ["stories", "Stories"],
  ["manuscripts", "Manuscripts"],
  ["research", "Research and lessons"],
  ["people", "People"],
  ["news", "News and updates"],
  ["events", "Events and workshops"],
];

// Titles can contain line breaks or markdown brackets that would break a list.
const clean = (value) =>
  String(value ?? "").replace(/\s+/g, " ").replace(/[\[\]]/g, "").trim();

export async function GET() {
  const locale = i18n.defaultLocale;
  const url = (path) => absoluteUrl(`/${locale}${path}`);
  const dynamic = await getDynamicRoutes();

  const lines = [
    "# Princeton Ethiopian, Eritrean, and Egyptian Miracles of Mary Project (PEMM)",
    "",
    "> Beautifully illuminated African manuscripts and captivating stories about the Virgin Mary created in Ethiopia, Eritrea, and Egypt in the 1200s to the present.",
    "",
    "The site is available in English (en-us) and Amharic (am-et). Pages under /stories, /manuscripts and /paintings are the core catalogue; research, lessons and background are under /research and /about.",
    "",
    "## Main pages",
    "",
    ...STATIC_ROUTES.map(({ path }) => `- [${path || "Home"}](${url(path)})`),
    "",
    ...SECTIONS.flatMap(([key, heading]) => [
      `## ${heading}`,
      "",
      ...dynamic[key].map(
        ({ path, title }) => `- [${clean(title) || path}](${url(path)})`
      ),
      "",
    ]),
    "## Machine-readable",
    "",
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
