export const dynamic = 'force-dynamic'

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";
import { render } from "react-dom";

const page = async () => {

  const arabic_stories_data = await client.request(
    readItems("arabic_stories", {
      fields: ["*.*.*"],
      // fields: ["title", "date_created", { authors: ["name"] }],
    })
  );

  return (
    <div className="container font-body space-y-4 py-12">
      <div>
        <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
          {arabic_stories_data?.title ?? ""}
        </h3>
        <div dangerouslySetInnerHTML={{ __html: arabic_stories_data?.description }} />
      </div>
    </div>
  );
};

export default page;
