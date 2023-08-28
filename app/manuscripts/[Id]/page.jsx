import Manuscript from "@/app/components/ManuscriptPage";


export const dynamic = "force-dynamic";

const page = async ({ params }) => {

	const { Id } = params;
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/${Id}`
	);
	const data = await response.json();

	return <>
		<Manuscript Id={Id} data={data} />
	</>
};

export default page;
