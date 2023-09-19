"use client";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Masonry from "react-masonry-css";
import React from "react";
import Card from "@/app/components/Card";
import { breakpointColumnsForMasonry } from "@/utils/constant";

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
          <Masonry
            breakpointCols={breakpointColumnsForMasonry}
            className="my-masonry-grid "
            columnClassName="my-masonry-grid_column mesonry "
          >
            {data.map((card, index) => (
              <Card
                key={card.id + index}
                title={card.title}
                category={card.category}
                description={card.description}
                author={card.author}
                intro={card.intro}
              />
            ))}
          </Masonry>
        </div>
      )}
    </div>
  );
};

export default Page;
