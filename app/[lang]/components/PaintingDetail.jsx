"use client";
import {
  defaultImageforPainting,
  omitCanonical_Story_Id,
} from "@/utils/constant";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import BackBtn from "./BackBtn";

const PaintingDetail = ({ data, localData }) => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setImage([
      {
        original: data?.image_link ? data.image_link : defaultImageforPainting,
        thumbnail: data?.image_link ? data.image_link : defaultImageforPainting,
      },
    ]);
  }, [data]);

  const addPhrase = () => {
    if (data.ms_location_note.includes("Tigray")) return localData?.tigray;
    else if (data.ms_location_note.includes("Eritrea"))
      return localData?.eritrea;
    else if (data.ms_location_note.includes("Shoa")) return localData?.shoa;
    else if (data.ms_location_note.includes("Wallo")) return localData?.wallo;
    else if (data.ms_location_note.includes("Addis Ababa"))
      return localData?.addis_ababa;
    else if (data.ms_location_note.includes("Gurage")) return localData?.gurage;
    else if (data.ms_location_note.includes("Magdala"))
      return localData?.magdala;
    else if (data.ms_location_note.includes("Gondar")) return localData?.gondar;
    else if (data.ms_location_note.includes("Gojjam")) return localData?.gojjam;
    else if (data.ms_location_note.includes("Tana")) return localData?.tana;
    else return "";
  };

  const generateParagraph = () => {
    const arr = [];
    if (
      data.manuscript_date_range_start ||
      data.manuscript_date_range_end ||
      data.manuscript_name
    ) {
      let text;
      if (data.manuscript_date_range_start && data.manuscript_date_range_end) {
        text = eval(`\`${localData?.painting_detail_para1_line1}\``);
      }
      if (data.painting_same_date_as_manuscript === "False")
        text += `${localData?.painting_same_date_as_manuscript_text} `;
      if (data.manuscript_name) {
        text += eval(`\`${localData?.painting_detail_para1_line2}\``);
      }
      if (+data.canonical_story_id < omitCanonical_Story_Id)
        text += eval(`\`${localData?.painting_detail_para1_line3}\``);
      arr.push({ text });
    }
    if (data.canonical_story_id && data?.number_of_episodes) {
      const omitCanonicalLink = `${
        +data.canonical_story_id < omitCanonical_Story_Id
          ? `<a class="text-primary-500 font-bold hover:text-secondary-500" href="/stories/${data.canonical_story_id}">${data.canonical_story_id}</a>`
          : `<span class="text-black font-bold">${data.canonical_story_id}</span>`
      } `;
      if (data.number_of_episodes >= 2) {
        arr.push({
          text: eval(`\`${localData?.painting_detail_para2_line1}\``),
        });
      }
      if (data.number_of_episodes === 1) {
        arr.push({
          text: eval(`\`${localData?.painting_detail_para3_line1}\``),
        });
      }
    }
    if (data.episode_descriptions.length) {
      for (let text of data.episode_descriptions) {
        arr.push({ text });
      }
    }
    if (data?.episode_caption) {
      arr.push({
        text: eval(`\`${localData?.painting_detail_para4_line1}\``),
      });
    }
    if (data.painting_research_note) {
      arr.push({
        text: data.painting_research_note,
      });
    }
    if (
      data?.total_manuscripts_with_this_story_id_illustrated ||
      data.total_story_id_paintings
    ) {
      let text;
      if (data?.total_manuscripts_with_this_story_id_illustrated) {
        text = eval(`\`${localData?.painting_detail_para5_line1}\``);
      }
      if (data.total_story_id_paintings)
        text += eval(`\`${localData?.painting_detail_para6_line1}\``);
      arr.push({
        text,
      });
    }
    if (data.painting_unique_id) {
      arr.push({
        text: eval(`\`${localData?.painting_detail_para7_line1}\``),
      });
    }

    arr.push({
      text: eval(`\`${localData?.painting_detail_para8_line1}\``),
    });

    return arr;
  };

  return (
    <div className="container-fluid py-4 lg:py-10">
      <div className="grid justify-items-stretch">
        <div className="justify-self-start my-3">
          <BackBtn />
        </div>
      </div>
      <h2 className="block md:hidden font-menu text-2xl lg:text-3xl mt-2 mb-5 xl:text-[32px] text-primary-500 font-medium">
        {data?.canonical_story_title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-7 md:gap-7 lg:gap-10 xl:gap-20 2">
        <div className="space-y-5">
          <ImageGallery
            items={image}
            infinite={false}
            autoPlay={false}
            showThumbnails={false}
            showPlayButton={false}
          />
          <p className="font-body text-center">
            {eval(`\`${localData?.image_displayed_with_permission}\``)}
          </p>
        </div>

        <div className=" col-span-2 text-black ">
          <h1 className="hidden md:block font-body mt-2 mb-5 text-2xl text-primary-500 font-bold leading-tight lg:text-3xl xl:text-4xl">
            {data.canonical_story_title}
          </h1>
          <div className="list-inside">
            <ul className="space-y-2 font-body">
              {generateParagraph().map((item, index) => (
                <li
                  className="text-base leading-relaxed"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                ></li>
              ))}
            </ul>
          </div>
          <div className="lg:space-x-5 space-y-5 lg:space-y-0 pt-3 md:pt-10 text-offWhite-500 font-semibold font-body flex items-start text-sm md:text-base flex-col lg:flex-row">
            <Link
              className="bg-primary-500 transition-all font-normal hover:text-white hover:bg-secondary-500 border border-transparent hover:border-secondary-500 rounded-md space-x-2 inline-flex items-center px-2 sm:px-3 py-1 font-body tracking-wide"
              href={`/paintings/by-manuscript/${data.web_page_address}`}
            >
              {/* <MdiOpenInNew className="sm:h-6 sm:w-6" /> */}
              <span>{localData?.view_more_paintings_from_this_manuscript}</span>
            </Link>
            <Link
              className="bg-primary-500 transition-all font-normal hover:text-white hover:bg-secondary-500 border border-transparent hover:border-secondary-500 rounded-md space-x-2 inline-flex items-center px-2 sm:px-3 py-1 font-body tracking-wide"
              href={`/paintings/by-story/${data.canonical_story_id}`}
            >
              {/* <MdiOpenInNew className="sm:h-6 sm:w-6" /> */}
              <span>{localData?.view_more_paintings_for_this_story}</span>
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
