import Manuscript from "@/app/components/ManuscriptPage";
import { pagePerLimit } from "@/utils/constant";


export const dynamic = "force-dynamic";

const Page = async ({ params }) => {

	const { Id } = params;
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/${Id}`
	);
	const data = await response.json();

  const tableRes = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/stories/${Id}?page=${1}&perPage=${pagePerLimit}`
  )
  const tableData = await tableRes.json()

	return <>
		<Manuscript Id={Id} data={data} table={tableData} />
	</>
};

export default Page;
