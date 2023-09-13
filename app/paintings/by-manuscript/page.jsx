import React from "react";
import PaintingbyMSIndex from "@/app/components/PaintingbyMSIndex";
import { pagePerLimitForPainting } from "@/utils/constant";

export const dynamic = "force-dynamic";

const Page = async () => {
  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-manuscript?page=1&perPage=${pagePerLimitForPainting}`
    );
    data = await response.json();
    console.log(data, "data");
  } catch (error) {
    console.log("Error", error);
  }
  return <PaintingbyMSIndex list={data} />;
};

export default Page;
