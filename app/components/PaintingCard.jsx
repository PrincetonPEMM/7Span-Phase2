import React from "react";
import Image from "next/image";

const PaintingCard = (props) => {
  return (
    <div
      className={`rounded-lg text-offWhite-500 font-body relative overflow-hidden inline-block  card-background w-full`}
    >
      <div className=" bg-offWhite-500">
        <img
          src={props.card.image_link}
          alt="PEMM"
          className="w-full object-cover "
        />
      </div>
      <div className="bg-black p-5">
        <p className="text-xs">{`${props.card.manuscript_date_range_start}-${props.card.manuscript_date_range_start},${props.card.manuscript} f.${props.card.painting_folio} s.${props.card.painting_scan}`}</p>
        <h2 className="lg:text-2xl font-bold mt-3">
          {props.card.pemm_short_title}
        </h2>
        <p className="pt-2">{props.card.episodes}</p>
      </div>
    </div>
  );
};

export default PaintingCard;
