"use client";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Masonry from "react-masonry-css";
import React from "react";
import Card from "@/app/components/Card";
import {
  breakpointColumnsForMasonry,
  breakpointTwoColumnsForMasonry,
} from "@/utils/constant";
import ComingSoon from "@/app/components/ComingSoon";
const page = async () => {
  let events_and_workshops = null;

  try {
    events_and_workshops = await client.request(
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
        {/* {events_and_workshops?.title ?? ""} */}
        Event and Workshop
      </h3>

      <Masonry
        breakpointCols={
          events_and_workshops?.lenght > 2
            ? breakpointColumnsForMasonry
            : breakpointTwoColumnsForMasonry
        }
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column mesonry "
      >
        {events_and_workshops?.map((card, index) => (
          <div
            className={`${index % 2 ? "even" : "odd"}`}
            key={card.id + index}
          >
            <Card
              key={card.id + index}
              title={card.title}
              description={card.description}
              intro={card.intro}
              category={card.category}
              author={card.author}
            />
          </div>
        ))}
      </Masonry>
    </div>
    // <ComingSoon />
  );
};

export default page;
