export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const Page = async ({ params }) => {
  const { Id } = params;
  let data = null;

  try {
    data = await client.request(
      readItems("research_and_lessons", {
        fields: ["*.*.*"],
        filter: { id: Id },
      })
    );
    data = data[0];
    console.log(data, "data");
  } catch (e) {
    console.log(e);
  }

  console.log(data, "data-data");

  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 md:py-12 mx-auto lg:w-3/4">
        <div>
          <h3 className="text-3xl text-primary-500 font-bold lg:text-5xl">
            List of Research and manuscript lessons
          </h3>
          <p classname="py-4">{data?.intro}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
            className="space-y-p"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
