import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import ErrorPage from "../../components/ErrorPage";
import PaintingDetail from "../../components/PaintingDetail";
import {
  buildDetailMetadata,
  buildPaintingTitle,
  paintingEpisodeText,
  pick,
} from "@/utils/seo";
import { getContentLanguage, getCmsSeo } from "@/utils/seoData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  let painting = null;
  try {
    const language = await getContentLanguage(lang, "/paintings/id");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/${slug}?language=${language}`,
    );
    if (response.ok) painting = (await response.json())?.[0];
  } catch (error) {
    console.log("Error", error);
  }

  const seo = painting?.painting_unique_id
    ? await getCmsSeo(
        "paintings",
        { painting_unique_id: { _eq: painting?.painting_unique_id } },
        lang,
      )
    : {};

  return buildDetailMetadata({
    title: pick(seo.title, buildPaintingTitle(painting)),
    description: pick(
      seo.description,
      painting?.episode_caption,
      paintingEpisodeText(painting),
    ),
    path: `/paintings/${slug}`,
    lang,
    image: seo.image || painting?.image_link,
    noIndex: seo.noIndex,
    noFollow: seo.noFollow,
  });
}

const Page = async ({ params }) => {
  const { slug, lang } = await params;

  let data = null;

  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] }),
  );
  const selectedLanguage = languages.filter((tt) => tt.code === lang)[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/paintings/id")
      ? lang
      : i18n.defaultLocale;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/${slug}?language=${needToTranslateInThisLangauge}`,
    );

    data = await response.json();
    if (response?.status === 404) {
      return <ErrorPage error={data.error} title={data.title} />;
    }
  } catch (error) {
    console.log("Error", error);
  }

  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${needToTranslateInThisLangauge}`,
  );
  const localData = await localStr.json();

  return (
    <main>
      <PaintingDetail
        data={data[0]}
        localData={localData}
        lang={needToTranslateInThisLangauge}
      />
    </main>
  );
};

export default Page;
