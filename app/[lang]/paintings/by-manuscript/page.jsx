import React from "react";
import { pagePerLimitForPainting } from "@/utils/constant";
import PaintingbyMSIndex from "../../components/PaintingbyMSIndex";

export const dynamic = "force-dynamic";

const Page = async () => {
  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-manuscript?page=1&perPage=${pagePerLimitForPainting}`
    );
    data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/filters`
  );
  const filters = await res.json();

  return <PaintingbyMSIndex list={data} {...filters} />;
};

export default Page;
