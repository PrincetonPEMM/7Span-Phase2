import React from "react";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import MasonryComp from "@/app/components/MasonryComp";

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
      <h1 className="text-3xl lg:text-5xl font-header">News & Updates</h1>
      <MasonryComp
        cards={data}
        keyword={"news"}
        redirect={`news-and-update/`}
      />
    </div>
  );
}
