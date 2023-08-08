import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {

  const arabic_manuscripts_data = await client.request(
    readItems("arabic_manuscripts", {
      fields: ["*.*.*"],
      // fields: ["title", "date_created", { authors: ["name"] }],
    })
  );

  console.log(arabic_manuscripts_data);

  return (
    <div className="container font-body space-y-4 py-12 max-w-screen-2xl mr-auto">
      <div>
        <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
        {arabic_manuscripts_data?.title }
        </h3>
        <div dangerouslySetInnerHTML={{ __html: arabic_manuscripts_data?.description }} />
      </div>
    </div>
  );
};

export default page;
