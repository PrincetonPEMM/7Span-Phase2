import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";
import MasonryComp from "@/app/components/MasonryComp";

export const dynamic = "force-dynamic";

const Page = async () => {
  let data = null;

  try {
    data = await client.request(
      readItems("events_and_workshops", {
        fields: ["*.*.*"],
      })
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container font-body  py-4 lg:py-7">
      <h3 className="text-3xl text-primary-500 font-bold lg:text-5xl">
        Event and Workshop
      </h3>
      <MasonryComp
        cards={data}
        keyword={"workshop"}
        redirect={`event-and-workshop/`}
      />
    </div>
  );
};

export default Page;
