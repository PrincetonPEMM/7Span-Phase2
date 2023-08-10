import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {

  let arabic_manuscripts_data = null

  try {
    arabic_manuscripts_data = await client.request(
      readItems("arabic_manuscripts")
    );
    console.log(arabic_manuscripts_data);
  }
  catch (e) {
    console.log(e);
  }

  return (
    <div className="container font-body space-y-4 py-12 max-w-screen-2xl mr-auto">
      {arabic_manuscripts_data && 
        <div>
          <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
          {arabic_manuscripts_data?.title }
          </h3>
          <p class="py-6">{ arabic_manuscripts_data?.intro }</p>
          <div dangerouslySetInnerHTML={{ __html: arabic_manuscripts_data?.description }} />
        </div>
      }
    </div>
  );
};

export default page;
