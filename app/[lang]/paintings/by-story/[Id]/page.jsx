import ErrorPage from "@/app/[lang]/components/ErrorPage";
import PaintingByStoryDetail from "@/app/[lang]/components/PaintingByStoryDetail";
import { pagePerLimitForPainting } from "@/utils/constant";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { Id } = params;

  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-story/${Id}?page=1&perPage=${pagePerLimitForPainting}`
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
      <PaintingByStoryDetail list={data} Id={Id} />
    </div>
  );
};

export default Page;
