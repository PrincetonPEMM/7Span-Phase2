export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";
import MasonryComp from "@/app/components/MasonryComp";

const Page = async () => {
  let data = null;
  try {
    data = await client.request(
      readItems("research_and_lessons", {
        fields: ["*.*.*"],
      })
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container font-body  py-4 lg:py-7">
      {data && (
        <div className="space-y-4">
          <h3 className="text-3xl text-primary-500 font-bold lg:text-5xl">
            Research & Lessons
          </h3>
          <MasonryComp
            cards={data}
            keyword={"Research Post"}
            redirect={`research-and-lessons/`}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
