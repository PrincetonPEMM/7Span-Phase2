import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let arabic_manuscripts_data = null;

  try {
    arabic_manuscripts_data = await client.request(
<<<<<<< HEAD
      readItems("arabic_manuscripts", {
        fields: ["*.*.*"],
      })
=======
      readItems("arabic_manuscripts")
>>>>>>> 1bc6df762de56ec1a62b5a07d07a4dfb1176b485
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container font-body space-y-4 py-12 max-w-screen-2xl mr-auto">
      {arabic_manuscripts_data && (
        <div>
          <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
            {arabic_manuscripts_data?.title}
          </h3>
<<<<<<< HEAD
          <div
            dangerouslySetInnerHTML={{
              __html: arabic_manuscripts_data?.description,
            }}
          />
=======
          <p class="py-6">{ arabic_manuscripts_data?.intro }</p>
          <div dangerouslySetInnerHTML={{ __html: arabic_manuscripts_data?.description }} />
>>>>>>> 1bc6df762de56ec1a62b5a07d07a4dfb1176b485
        </div>
      )}
    </div>
  );
};

export default page;
