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
      <div className="space-y-4">
        <h2 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
          Research & Lessons
        </h2>
        <MasonryComp
          cards={data}
          keyword={"research_post"}
          value1={"Research Post"}
          value2={"Lesson Plan"}
          redirect={`research-and-lessons/`}
        />
      </div>
    </div>
  );
};

export default Page;
