export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let bibliography_data = null;
  try {
    bibliography_data = await client.request(readItems("bibliography"));
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 md:py-12 mx-auto lg:w-3/4">
        {bibliography_data && (
          <div>
            <h2 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
              {bibliography_data?.title ?? ""}
            </h2>
            <p className="pt-4 pb-6">{bibliography_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: bibliography_data?.description,
              }}
              className="space-y-p descriptions-left"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
