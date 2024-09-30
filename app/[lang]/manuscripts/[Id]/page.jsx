import { pagePerLimit } from "@/utils/constant";
import ErrorPage from "../../components/ErrorPage";
import Manuscript from "../../components/ManuscriptPage";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { Id } = params;
  let data = null;
  let tableData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/${Id}`
    );
    data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }

  try {
    let tableRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_DIRECTUS_URL
      }manuscripts/stories/${Id}?page=${1}&perPage=${pagePerLimit}`
    );
    tableRes = await tableRes.json();
    if (tableRes?.status === 404) {
      return <ErrorPage error={tableRes.error} title={tableRes.title} />;
    }
  } catch (error) {
    console.log("Error", error);
  }

  return (
    <>
      <Manuscript Id={Id} data={data} table={tableData} />
    </>
  );
};

export default Page;
