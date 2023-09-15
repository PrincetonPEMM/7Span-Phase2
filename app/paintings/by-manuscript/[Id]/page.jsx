import React from "react";
import PaintingByMSDetail from "@/app/components/PaintingByMSDetail";
import { pagePerLimitForPainting } from "@/utils/constant";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { Id } = params;

  let data = null;

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_DIRECTUS_URL
      }paintings/by-manuscript/${Id}?page=${1}&perPage=${pagePerLimitForPainting}&filters[search]=${""}`
    );

    data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }

  return (
    <div>
      <PaintingByMSDetail list={data} Id={Id} />
    </div>
  );
};

export default Page;
