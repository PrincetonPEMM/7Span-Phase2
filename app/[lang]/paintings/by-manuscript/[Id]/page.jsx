import ErrorPage from "@/app/[lang]/components/ErrorPage";
import PaintingByMSDetail from "@/app/[lang]/components/PaintingByMSDetail";
import { pagePerLimitForPainting } from "@/utils/constant";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { Id, lang } = await params;

  let data = null;

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_DIRECTUS_URL
      }paintings/by-manuscript/${Id}?page=${1}&perPage=${pagePerLimitForPainting}&filters[search]=${""}`
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
      <PaintingByMSDetail list={data} Id={Id} lang={lang} />
    </div>
  );
};

export default Page;
