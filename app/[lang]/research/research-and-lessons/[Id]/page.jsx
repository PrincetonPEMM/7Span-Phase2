export const dynamic = "force-dynamic";
import DetailPage from "@/app/[lang]/components/DetailPage";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const Page = async ({ params }) => {
  const { Id } = await params;
  let data = null;

  try {
    data = await client.request(
      readItems("research_and_lessons", {
        fields: ["*.*.*"],
        filter: { id: Id },
      })
    );
    data = data[0];
  } catch (e) {
    console.log(e);
  }
  return data ? (
    <div className="reaserch-page list-disc">
      <DetailPage
        image={data?.image_link}
        title={data?.title}
        author={data?.author}
        date={data?.date}
        intro={data?.intro}
        description={data?.description}
      />
    </div>
  ) : (
    <div className="flex items-center py-36 justify-center w-full text-2xl text-primary-500 font-bold">
      <h1>Records Not Found</h1>
    </div>
  );
};

export default Page;
