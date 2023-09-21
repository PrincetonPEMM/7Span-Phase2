"use client";
import {
  breakpointColumnsForMasonry,
  breakpointTwoColumnsForMasonry,
} from "@/utils/constant";
import React from "react";
import Masonry from "react-masonry-css";
import Card from "./Card";

const MasonryComp = ({ cards, keyword, redirect }) => {
  return cards?.length ? (
    <Masonry
      breakpointCols={
        cards?.length > 2
          ? breakpointColumnsForMasonry
          : breakpointTwoColumnsForMasonry
      }
      className="my-masonry-grid "
      columnClassName="my-masonry-grid_column mesonry "
    >
      {cards.map((card, index) => (
        <Card
          key={card.id + index}
          title={card.title}
          category={card.category}
          description={card.description}
          author={card.author}
          intro={card.intro}
          keyword={keyword}
          date={card.date}
          redirect={redirect + card.id}
        />
      ))}
    </Masonry>
  ) : (
    <div className="flex items-center py-36 justify-center w-full text-2xl text-primary-500 font-bold">
      <h1>Records Not Found</h1>
    </div>
  );
};

export default MasonryComp;
