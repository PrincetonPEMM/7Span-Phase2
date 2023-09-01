import React from "react";
import { defaultImageforPainting } from "@/utils/constant";

const PaintingCard = (props) => {
  return (
    <div
      className={`text-offWhite-500 font-body relative overflow-hidden inline-block  card-background w-full`}
    >
      <div className="aspect-square bg-offWhite-500">
        <img
          src={
            props.card.image_link
              ? props.card.image_link
              : defaultImageforPainting
          }
          alt={props.card.pemm_short_title}
          className="w-full h-full object-cover "
        />
      </div>
      <div className="bg-black p-5 rounded-b-lg">
        <p className="text-xs">{`${
          props.card.manuscript_date_range_start &&
          props.card.manuscript_date_range_start
            ? props.card.manuscript_date_range_start +
              "-" +
              props.card.manuscript_date_range_start
            : "-"
        }${props.card.manuscript ? "," + props.card.manuscript : "-"} ${
          props.card.painting_folio ? "f." + props.card.painting_folio : ""
        } ${
          props.card.painting_scan ? "s." + props.card.painting_scan : ""
        }`}</p>
        <h2 className="lg:text-2xl font-bold mt-3">
          {props.card.pemm_short_title
            ? props.card.pemm_short_title
            : "Title not Found"}
        </h2>
        <p className="pt-2">
          {props.card.episodes ? props.card.episodes : "-"}
        </p>
      </div>
    </div>
  );
};

export default React.memo(PaintingCard);
