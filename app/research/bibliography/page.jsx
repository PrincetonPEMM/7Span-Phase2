export const dynamic = 'force-dynamic'

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let bibliography_data = null
  try {
    bibliography_data = await client.request(
      readItems("bibliography")
    );
  }
  catch (e) {
    console.log(e);
  }
  
  return (
    <div className="container font-body space-y-4 py-12">
      {bibliography_data &&
      <div>
        <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
          {bibliography_data?.title ?? ""}
        </h3>
        <p class="py-6">{ bibliography_data?.intro }</p>
        <div dangerouslySetInnerHTML={{ __html: bibliography_data?.description }} />
      </div>
      }
    </div>
  );
};

export default page;
