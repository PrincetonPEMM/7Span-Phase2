export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let repositories_data = null;
  try {
    repositories_data = await client.request(readItems("repositories"));
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container-fluid">
      <div className="font-body space-y-4 py-8 bg-background-500  md:py-12">
        {repositories_data && (
          <div>
            <h3 className="text-3xl text-primary-500 font-bold lg:text-5xl">
              {repositories_data?.title ?? ""}
            </h3>
            <p class="py-6">{repositories_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: repositories_data?.description,
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
