import React, { useEffect, useState } from "react";
import { defaultImageforPainting } from "@/utils/constant";
import Link from "next/link";

const PaintingCard = (props) => {
  const [isImgload, setIsImgLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsImgLoad(true);
    }, [5000]);
  }, []);

  return (
    <Link
      href={`/paintings/${props.card.web_page_address}_${props.card.painting_unique_id}`}
      className={`text-offWhite-500 font-body relative mx-auto  mb-4 overflow-hidden inline-block card-background w-full`}
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
          onLoad={() => {
            setIsImgLoad(true);
          }}
        />
      </div>
      {isImgload && (
        <div className="bg-black p-5 rounded-b-lg font-body">
          <p className="text-xs">{`${
            props.card.manuscript_date_range_start &&
            props.card.manuscript_date_range_end
              ? props.card.manuscript_date_range_start ===
                props.card.manuscript_date_range_end
                ? props.card.manuscript_date_range_start
                : props.card.manuscript_date_range_start +
                  "-" +
                  props.card.manuscript_date_range_end
              : "-"
          }${props.card.manuscript ? ", " + props.card.manuscript : "-"}${
            props.card.painting_folio ? ", f. " + props.card.painting_folio : ""
          }${
            props.card.painting_scan ? ", s. " + props.card.painting_scan : ""
          }`}</p>
          <h3 className="lg:text-xl font-semibold mt-3 tracking-wide">
            {props.card.pemm_short_title
              ? props.card.pemm_short_title
              : "PEMM title not found"}
          </h3>
          <p className="pt-2 tracking-wider">
            {props.card.episodes ? props.card.episodes + "." : "-"}
          </p>
        </div>
      )}
    </Link>
  );
};

export default React.memo(PaintingCard);
