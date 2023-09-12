import React from "react";
import PaintingDetail from "@assets/images/painting-detail.jpg";
import Link from "next/link";
import { defaultImageforPainting } from "@/utils/constant";

const PaintingStoryCard = ({ item }) => {
  return (
    <div
      className={`rounded-lg text-offWhite-500 font-body relative overflow-hidden inline-block w-full`}
    >
      <div className=" bg-offWhite-500">
        <img
          src={
            Boolean(item.image_link) ? item.image_link : defaultImageforPainting
          }
          alt="PEMM"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-black p-5">
        <h2 className="lg:text-2xl font-bold mt-3">
          {item?.pemm_short_title
            ? item.pemm_short_title
            : "PEMM title not found"}
        </h2>
        <p className="text-xs">
          {item?.manuscript_date_range_start && item?.manuscript_date_range_end
            ? item.manuscript_date_range_start ===
              item.manuscript_date_range_end
              ? item.manuscript_date_range_start
              : item.manuscript_date_range_start +
                "-" +
                item.manuscript_date_range_end
            : "-"}
          {item?.manuscript ? ", " + item.manuscript : " "}
          {item?.painting_folio ? ", f." + item.painting_folio : " "}
          {item?.painting_scan ? ", s." + item.painting_scan : " "}
        </p>

        {item?.total_story_id_paintings && (
          <Link
            href={`/paintings/by-story/${item.web_page_address}`}
            className="border border-offWhite-500 my-4 inline-block py-2 px-3 text-xs md:text-sm hover:transition-all rounded-md hover:border-black 
        transition-all hover hover:bg-secondary-500 hover:text-offBlack-500"
          >
            View&nbsp;
            {item.total_story_id_paintings > 1
              ? `all ${item.total_story_id_paintings} images for `
              : ``}
            this story
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaintingStoryCard;
