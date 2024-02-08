import Manuscript from "@/app/components/ManuscriptPage";
import { pagePerLimit } from "@/utils/constant";

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
      <Manuscript Id={Id} data={data} table={tableData} />
    </>
  );
};

export default Page;
