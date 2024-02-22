import React from "react";
import { pagePerLimitForPainting } from "@/utils/constant";
import PaintingByStoryIndex from "../../components/PaintingByStoryIndex";

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
  return (
    <div>
      <PaintingByStoryIndex list={data} />
    </div>
  );
};

export default Page;
