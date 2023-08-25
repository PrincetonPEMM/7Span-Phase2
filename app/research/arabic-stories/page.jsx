export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let arabic_stories_data = null;
  try {
    arabic_stories_data = await client.request(readItems("arabic_stories"));
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 md:py-12 lg:w-3/4 mx-auto">
        {arabic_stories_data && (
          <div>
            <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
              {arabic_stories_data?.title ?? ""}
            </h3>
            <p class="py-6">{arabic_stories_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: arabic_stories_data?.description,
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
