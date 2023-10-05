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
      <h3 className="text-3xl text-primary-500 font-header  lg:text-5xl">
        Events & Workshops
      </h3>{" "}
      <div className="pt-5">
        <MasonryComp
          cards={data}
          keyword={"workshop"}
          value2={"Event"}
          value1={"Workshop"}
          redirect={`event-and-workshop/`}
        />
      </div>
    </div>
  );
};

export default Page;
