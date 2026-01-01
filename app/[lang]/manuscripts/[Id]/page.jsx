import { pagePerLimit } from "@/utils/constant";
import ErrorPage from "../../components/ErrorPage";
import Manuscript from "../../components/ManuscriptPage";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { Id, lang } = await params;
  let data = null;
  let tableData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/${Id}`
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
      }manuscripts/stories/${Id}?page=${1}&perPage=${pagePerLimit}`
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
