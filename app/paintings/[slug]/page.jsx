import React from "react";
import PaintingDetail from "../../components/PaintingDetail";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { slug } = params;

  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/${slug}`
    );

    data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }

  return (
    <div>
      <PaintingDetail data={data[0]} />
    </div>
  );
};

export default Page;
