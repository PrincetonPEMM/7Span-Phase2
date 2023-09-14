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
        <div className={`${index % 2 ? "even" : "odd"}`}>
          <Card key={index} {...card} />
        </div>
      ))}
    </Masonry>
  );
};

export default AboutConnect;
