import React from "react";
import PaintingByStoryIndex from "@/app/components/PaintingByStoryIndex";
import { pagePerLimitForPainting } from "@/utils/constant";

export const dynamic = "force-dynamic";

const Page = async () => {
  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-story?page=1&perPage=${pagePerLimitForPainting}`
    );
    data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }
  return <PaintingByStoryIndex list={data} />;
};

export default Page;
