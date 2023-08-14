export const dynamic = 'force-dynamic'

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {

  let macomber_handlist_data = null

  try {
    macomber_handlist_data = await client.request(
      readItems("macomber_handlist")
    );
  }
  catch (e) {
    console.log(e);
  }

  return (
    <div className="container font-body space-y-4 py-12 max-w-screen-2xl mr-auto">
      {macomber_handlist_data && 
        <div>
          <h3 className="text-3xl lg:text-5xl text-primary-500 font-bold ">
          {macomber_handlist_data?.title }
          </h3>
          <p class="py-6">{ macomber_handlist_data?.intro }</p>
          <div dangerouslySetInnerHTML={{ __html: macomber_handlist_data?.description }} />
        </div>
      }
    </div>
  );
};

export default page;
