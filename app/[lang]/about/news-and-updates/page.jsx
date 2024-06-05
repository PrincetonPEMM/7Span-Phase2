import React from "react";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import MasonryComp from "../../components/MasonryComp";

export const dynamic = "force-dynamic";

export default async function Page() {
  let data = null;

  try {
    data = await client.request(
      readItems("news_and_updates", {
        fields: ["*.*.*"],
      })
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container font-body py-4 lg:py-7">
      <h1 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
        News & Updates
      </h1>
      <div className="pt-5">
        <MasonryComp
          cards={data}
          keyword={"news"}
          value1={"News"}
          value2={"Updates"}
          redirect={`news-and-updates/`}
        />
      </div>
    </div>
  );
}
