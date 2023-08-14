export const dynamic = 'force-dynamic'

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let repositories_data = null
  try {
    repositories_data = await client.request(
      readItems("repositories")
    );
  }
  catch (e) {
    console.log(e);
  }

  return (
    <div className="bg-background-500">
      <div className="container font-body space-y-4 py-12">
        {repositories_data && 
          <div>
            <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
              {repositories_data?.title ?? ""}
            </h3>
            <p class="py-6">{ repositories_data?.intro }</p>
            <div dangerouslySetInnerHTML={{ __html: repositories_data?.description }} />
          </div>
        }
      </div>
    </div>
  );
};

export default page;
