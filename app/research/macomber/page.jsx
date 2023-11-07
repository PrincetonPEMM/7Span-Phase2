export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let macomber_handlist_data = null;

  try {
    macomber_handlist_data = await client.request(
      readItems("macomber_handlist")
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container">
      <div className="font-body space-y-4 py-12 mx-auto lg:w-3/4">
        {macomber_handlist_data && (
          <div>
            <h2 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
              {macomber_handlist_data?.title}
            </h2>
            <p className="pt-4 pb-6">{macomber_handlist_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: macomber_handlist_data?.description,
              }}
              className="space-y-p descriptions-left font-body"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
