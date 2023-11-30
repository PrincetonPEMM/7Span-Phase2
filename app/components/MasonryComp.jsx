"use client";
import {
  dateFormate,
  masonryTilesForResearchs_News_Events,
} from "@/utils/constant";
import React from "react";
import Masonry from "react-masonry-css";
import Card from "./Card";

const MasonryComp = ({ cards, keyword, redirect, value1, value2 }) => {
  return cards?.length ? (
    <Masonry
      breakpointCols={masonryTilesForResearchs_News_Events(cards?.length)}
      className="my-masonry-grid "
      columnClassName="my-masonry-grid_column mesonry "
    >
      {cards.map((card, index) => (
        <Card
          alt={`Read more about ${card.title}`}
          key={card.id + index}
          title={card.title}
          category={card.category}
          description={card.description}
          author={card.author}
          intro={card.intro}
          keyword={keyword}
          date={dateFormate(card.date)}
          redirect={redirect + card.id}
          value1={value1}
          value2={value2}
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
