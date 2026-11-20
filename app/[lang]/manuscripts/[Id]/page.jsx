import { pagePerLimit } from "@/utils/constant";
import ErrorPage from "../../components/ErrorPage";
import Manuscript from "../../components/ManuscriptPage";
import { buildDetailMetadata, pick } from "@/utils/seo";
import { getCmsSeo } from "@/utils/seoData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { Id, lang } = await params;
  let data = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/${Id}`,
    );
    if (response.ok) data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }

  const seo = data?.id
    ? await getCmsSeo("manuscripts", { id: { _eq: data?.id } }, lang)
    : {};

  return buildDetailMetadata({
    title: pick(seo.title, data?.manuscript_full_name),
    description: seo.description,
    path: `/manuscripts/${Id}`,
    lang,
    image: seo.image,
    noIndex: seo.noIndex,
    noFollow: seo.noFollow,
  });
}

const Page = async ({ params }) => {
  const { Id, lang } = await params;
  let data = null;
  let tableData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/${Id}`,
    );
    data = await response.json();
    if (response?.status === 404) {
      return <ErrorPage error={data.error} title={data.title} />;
    }
  } catch (error) {
    console.log("Error", error);
  }

  try {
    const tableRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_DIRECTUS_URL
      }manuscripts/stories/${Id}?page=${1}&perPage=${pagePerLimit}`,
    );
    tableData = await tableRes.json();
  } catch (error) {
    console.log("Error", error);
  }

  return (
    <>
      <Manuscript Id={Id} data={data} table={tableData} lang={lang} />
    </>
  );
};

export default Page;
