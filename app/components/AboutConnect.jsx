"use client";
import { breakpointColumnsForMasonry } from "@/utils/constant";
import React from "react";
import Masonry from "react-masonry-css";
import Card from "./Card";

const AboutConnect = ({ cards }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsForMasonry}
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
        />
      ))}
    </Masonry>
  );
};

export default AboutConnect;
