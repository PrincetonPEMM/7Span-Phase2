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
    <div className="container-fluid">
      <div className="font-body space-y-4 py-12 mr-auto bg-background-500">
        {macomber_handlist_data && (
          <div>
            <h3 className="text-3xl text-primary-500 font-bold  lg:text-5xl">
              {macomber_handlist_data?.title}
            </h3>
            <p class="py-6">{macomber_handlist_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: macomber_handlist_data?.description,
              }}
              className="space-y-p"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
