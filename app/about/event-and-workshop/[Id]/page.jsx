import DetailPage from "@/app/components/DetailPage";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";
export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { Id } = params;
  let data = null;
  try {
    data = await client.request(
      readItems("events_and_workshops", {
        fields: ["*.*.*"],
        filter: { id: Id },
      })
    );
    data = data[0];
  } catch (e) {
    console.log(e);
  }

  return data ? (
    <DetailPage
      image={data?.image_link}
      title={data?.title}
      author={data?.author}
      date={data?.date}
      intro={data?.intro}
      description={data?.description}
    />
  ) : (
    <div className="flex items-center py-36 justify-center w-full text-2xl text-primary-500 font-bold">
      <h1>Records Not Found</h1>
    </div>
  );
};

export default Page;
