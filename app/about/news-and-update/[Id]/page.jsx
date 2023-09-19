export const dynamic = "force-dynamic";

import ComingSoon from "@/app/components/ComingSoon";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async ({ params }) => {
  const { Id } = params;
  let data = null;

  try {
    data = await client.request(
      readItems("news_and_updates", {
        fields: ["*.*.*"],
        filter: { id: Id },
      })
    );
    data = data[0];
  } catch (e) {
    console.log(e);
  }

  return (
    // <div className="container">
    //   <div className="font-body space-y-4 py-8 md:py-12 mx-auto lg:w-3/4">
    //     <div>
    //       <h3 className="text-3xl text-primary-500 font-bold lg:text-5xl">
    //         {data?.title ?? ""}
    //       </h3>
    //       <p className="py-6">{data?.intro}</p>
    //       <div
    //         dangerouslySetInnerHTML={{
    //           __html: data?.description,
    //         }}
    //         className="space-y-p"
    //       />
    //     </div>
    //   </div>
    // </div>
    <ComingSoon />
  );
};

export default page;
