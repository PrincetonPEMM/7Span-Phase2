export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let arabic_manuscripts_data = null;

  try {
    arabic_manuscripts_data = await client.request(
      readItems("arabic_manuscripts")
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container">
      <div className="font-body space-y-4 py-12 max-w-screen-2xl mx-auto lg:w-3/4">
        {arabic_manuscripts_data && (
          <div>
            <h3 className="text-3xl text-primary-500 font-bold  lg:text-5xl">
              {arabic_manuscripts_data?.title}
            </h3>
            <p className="py-6">{arabic_manuscripts_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: arabic_manuscripts_data?.description,
              }}
              className="space-y-p"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
