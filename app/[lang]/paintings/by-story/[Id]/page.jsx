import ErrorPage from "@/app/[lang]/components/ErrorPage";
import PaintingByStoryDetail from "@/app/[lang]/components/PaintingByStoryDetail";
import { pagePerLimitForPainting } from "@/utils/constant";
import { buildDetailMetadata, pick } from "@/utils/seo";
import { getCmsSeo } from "@/utils/seoData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { Id, lang } = await params;
  let header = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-story/${Id}?page=1&perPage=${pagePerLimitForPainting}`,
    );
    if (response.ok) header = (await response.json())?.canonicalStoryData;
  } catch (error) {
    console.log("Error", error);
  }

  const seo = Id
    ? await getCmsSeo(
        "canonical_stories",
        { canonical_story_id: { _eq: Id } },
        lang,
      )
    : {};

  return buildDetailMetadata({
    title: pick(seo.title, header?.canonical_story_title),
    description: seo.description,
    path: `/paintings/by-story/${Id}`,
    lang,
    image: seo.image,
    noIndex: seo.noIndex,
    noFollow: seo.noFollow,
  });
}

const Page = async ({ params }) => {
  const { Id, lang } = await params;

  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-story/${Id}?page=1&perPage=${pagePerLimitForPainting}`,
    );

    data = await response.json();
    if (response?.status === 404) {
      return <ErrorPage error={data.error} title={data.title} />;
    }
  } catch (error) {
    console.log("Error", error);
  }

  return (
    <div>
      <PaintingByStoryDetail list={data} Id={Id} lang={lang} />
    </div>
  );
};

export default Page;
