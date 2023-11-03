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
      <div className="font-body space-y-4 py-8 md:py-12 lg:w-3/4 mx-auto">
        {arabic_manuscripts_data && (
          <div>
            <h2 className="text-3xl text-primary-500 font-bold lg:text-4xl">
              {arabic_manuscripts_data?.title}
            </h2>
            <p className="py-6">{arabic_manuscripts_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: arabic_manuscripts_data?.description,
              }}
              className="descriptions-left"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
