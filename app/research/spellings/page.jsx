export const dynamic = "force-dynamic";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let interchangeable_spellings_data = null;
  try {
    interchangeable_spellings_data = await client.request(
      readItems("interchangeable_spellings")
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 md:py-12 mx-auto lg:w-3/4">
        {interchangeable_spellings_data && (
          <div>
            <h1 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
              {interchangeable_spellings_data?.title ?? ""}
            </h1>
            <p className="pt-4 pb-6">{interchangeable_spellings_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: interchangeable_spellings_data?.description,
              }}
              className="interchangable-table overflow-auto table-wrap"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
