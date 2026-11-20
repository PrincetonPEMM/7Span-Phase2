import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import ErrorPage from "../../components/ErrorPage";
import StoryDetail from "../../components/StoryDetail";
import { buildDetailMetadata, pick } from "@/utils/seo";
import { getContentLanguage, getCmsSeo } from "@/utils/seoData";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const { Id, lang } = await params;
  let data = null;
  try {
    const language = await getContentLanguage(lang, "/stories/id");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories/${Id}?language=${language}`,
    );
    if (response.ok) data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }

  const seo = data?.id
    ? await getCmsSeo("canonical_stories", { id: { _eq: data?.id } }, lang)
    : {};

  return buildDetailMetadata({
    title: pick(seo.title, data?.canonical_story_title),
    description: pick(seo.description, data?.summary_plot),
    path: `/stories/${Id}`,
    lang,
    image: seo.image,
    noIndex: seo.noIndex,
    noFollow: seo.noFollow,
  });
}

const Page = async ({ params }) => {
  const { Id, lang } = await params;
  let data = null;

  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] }),
  );

  const selectedLanguage = languages.filter((tt) => tt.code === lang)[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/stories/id")
      ? lang
      : i18n.defaultLocale;

  let localData = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${needToTranslateInThisLangauge}`,
  );

  localData = await localData.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories/${Id}?language=${needToTranslateInThisLangauge}`,
    );

    data = await response.json();
    if (response?.status === 404) {
      return <ErrorPage error={data.error} title={data.title} />;
    }
  } catch (error) {
    console.log("Error", error);
  }

  return (
    <main>
      <StoryDetail
        results={data}
        Id={Id}
        localData={localData}
        lang={needToTranslateInThisLangauge}
      />
    </main>
  );
};

export default Page;
