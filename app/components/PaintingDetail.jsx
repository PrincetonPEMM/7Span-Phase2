"use client";
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import MdiOpenInNew from "@/assets/icons/MdiOpenInNew";
import ImageGallery from "react-image-gallery";
import Link from "next/link";
import { defaultImageforPainting } from "@/utils/constant";

const PaintingDetail = ({ data }) => {
  const [image, setImage] = useState([]);

  console.log(data, "data -- data");

  useEffect(() => {
    setImage([
      {
        original: data?.image_link ? data.image_link : defaultImageforPainting,
        thumbnail: data?.image_link ? data.image_link : defaultImageforPainting,
      },
    ]);
  }, [data]);

  return (
    <div className="container-fluid py-4 lg:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-7 md:gap-7 lg:gap-10 xl:gap-20 2">
        <div>
          {/* <Image
            onClick={() => setisOpen(true)}
            src={logo}
            showNav="false"
            autoPlay="false"
            showThumbnails="false"
            alt="pricenton ethiopian eritrean & egyptian miracles of marry project"
          />
          <Modal
            isOpen={isOpen}
            modalClose={() => setisOpen(false)}
            pModalclassName="pc-max-w-md"
          >
            <Image
              src={logo}
              alt="pricenton ethiopian eritrean & egyptian miracles of marry project"
            />
          </Modal> */}

          {/* slider with modal */}
          <ImageGallery
            items={image}
            infinite={false}
            autoPlay={false}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>

        <div className="col-span-2 text-offBlack-400 max-w-2xl">
          <h3 className="font-body font-extrabold text-2xl lg:text-3xl">
            {data.pemm_short_title
              ? data.pemm_short_title
              : "PEMM title not found"}
          </h3>

          <h5 className="font-bold text-lg text-offBlack-500">
            PEMM Captions:&nbsp;
            {!data.episode_descriptions.length && (
              <span className="font-normal">none</span>
            )}
          </h5>
          {data.episode_descriptions.length && (
            <ul className="list-inside text-offBlack-500 text-sm lg:text-lg">
              {data.episode_descriptions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          <div className="space-y-1 text-base lg:text-xl mt-3">
            <p>
              <strong> Painting Caption</strong>&nbsp;
              {data?.episode_caption ? data?.episode_caption : "none"}
            </p>
            <p>
              <strong>Object Keywords:</strong>&nbsp;
              {data.episode_keywords_objects
                ? data.episode_keywords_objects
                : "none"}
            </p>
            <p className="font-medium">
              <strong>Agent Keywords:</strong>&nbsp;
              {data.episode_keywords_agents
                ? data.episode_keywords_agents
                : "none"}
            </p>
            <p className="font-body font-bold mt-3">
              <strong>Manuscript</strong>&nbsp;
              {data.manuscript_name && data.manuscript_name}
              {data.painting_folio ? ", f." + data.painting_folio : ""}&nbsp;
              Date:&nbsp;
              {data.manuscript_date_range_start &&
              data.manuscript_date_range_start
                ? data.manuscript_date_range_start +
                  "-" +
                  data.manuscript_date_range_start
                : "-"}
            </p>
            <p className="font-body font-bold">
              <strong> PEMM Painting ID:</strong>&nbsp;
              {data.painting_unique_id ? data.painting_unique_id : "none"}
            </p>
            <p className="font-body ">
              <strong> PEMM Story ID:</strong>&nbsp;
              {data.canonical_story_id ? data.canonical_story_id : "none"}
            </p>
            <p className="font-body font-bold">
              <strong>
                Number of PEMM Manuscript with paintings of this story:&nbsp;
              </strong>
              {data.total_manuscripts_with_this_story_id_illustrated
                ? data.total_manuscripts_with_this_story_id_illustrated
                : "none"}
            </p>
          </div>
          <div className="space-x-5 pt-3 md:pt-10 text-offWhite-500 font-semibold font-body flex flex-wrap items-start text-sm md:text-base">
            <Link
              className="bg-secondary-500 rounded-md space-x-2 inline-flex items-center px-2 sm:px-3 py-1"
              href={`/manuscripts/${data.web_page_address}`}
            >
              <MdiOpenInNew className="sm:h-6 sm:w-6" />
              <span>View Manuscript</span>
            </Link>
            <Link
              className="bg-secondary-500 rounded-md space-x-2 inline-flex items-center px-2 sm:px-3 py-1"
              href={`/stories/${data.canonical_story_id}`}
            >
              <MdiOpenInNew className="sm:h-6 sm:w-6" />
              <span>View Story</span>
            </Link>

            {/* Next and previous buttons  */}
            {/* <button
              className="bg-secondary-500 rounded-md px-3 py-1"
              href="/manuscripts"
            >
              Previous Painting
            </button>
            <button
              className="bg-secondary-500 rounded-md px-3 py-1"
              href="/manuscripts"
            >
              Next Painting
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingDetail;
