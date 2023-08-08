import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let arabic_stories_data = null
  try {
    arabic_stories_data = await client.request(
      readItems("research_posts", {
        fields: ["*.*.*"]
      })
    );
  }
  catch (e) {
    console.log(e);
  }
  
  return (
    <div className="container font-body space-y-4 py-12">
      {arabic_stories_data &&
      <div>
        <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
          {arabic_stories_data?.title ?? ""}
        </h3>
        <div dangerouslySetInnerHTML={{ __html: arabic_stories_data?.description }} />
      </div>
      }
    </div>
  );
};

export default page;
