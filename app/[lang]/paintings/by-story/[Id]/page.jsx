import React from "react";
import PaintingByStoryDetail from "@/app/components/PaintingByStoryDetail";
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
