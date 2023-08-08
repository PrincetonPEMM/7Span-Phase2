import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let research_posts_data = null
  try {
    research_posts_data = await client.request(
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
      {research_posts_data &&
      <div>
        <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
          {research_posts_data?.title ?? ""}
        </h3>
        <div dangerouslySetInnerHTML={{ __html: research_posts_data?.description }} />
      </div>
      }
    </div>
  );
};

export default page;
