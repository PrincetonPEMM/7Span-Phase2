"use client";
import React, { useEffect, useState } from "react";
import PaintingStoryCard from "./PaintingStoryCard";
import {
  breakpointColumnsForMasonry,
  pagePerLimitForPainting,
} from "@/utils/constant";
import Masonry from "react-masonry-css";
import { TablePagination } from "./Pagination";

const PaintingByStoryDetail = ({ list, Id }) => {
  const [isLoading, setIsLoadint] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [header, setHeader] = useState();

  useEffect(() => {
    setData(list?.data);
    setHeader(list?.canonicalStoryData);
    setTotalPage(list?.total);
  }, []);

  const fetchData = () => {
    setIsLoadint(true);
    fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-story/${Id}?page=${page}&perPage=${perPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setTotalPage(data.total);
        setIsLoadint(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setIsLoadint(false);
      });
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <div className="py-10 container-fluid">
      <h2 className="font-body font-bold text-2xl lg:text-3xl xl:text-5xl">
        {header?.canonical_story_title}
      </h2>
      <div className="pt-5 lg:pt-10">
        <Masonry
          breakpointCols={breakpointColumnsForMasonry}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.map((item, index) => (
            <PaintingStoryCard
              key={item.image_link + index}
              image={item.image_link}
              isTitle={false}
              content={item.episodes}
              desc={`Keywords: ${
                item.episode_keywords_objects
                  ? item.episode_keywords_objects + "; "
                  : ""
              }${
                item.episode_keywords_agents ? item.episode_keywords_agents : ""
              }`}
              lastLine={`${
                item?.manuscript_date_range_start &&
                item?.manuscript_date_range_end
                  ? item.manuscript_date_range_start ===
                    item.manuscript_date_range_end
                    ? item.manuscript_date_range_start
                    : item.manuscript_date_range_start +
                      "-" +
                      item.manuscript_date_range_end
                  : "-"
              }${item?.manuscript ? ", " + item.manuscript : ""}${
                item.painting_folio ? ", f. " + item.painting_folio : ""
              }${item.painting_scan ? ", s. " + item.painting_scan : ""}`}
              className="mt-3"
            />
          ))}
        </Masonry>
      </div>
      {Boolean(!data?.length) && (
        <div className="flex items-center py-36 justify-center  w-full text-2xl text-primary-500 font-bold">
          {isLoading ? <h1>Loading...</h1> : <h1>Records Not Found</h1>}
        </div>
      )}
      <TablePagination
        meta={{
          total: totalPage,
          per_page: perPage,
          current_page: page,
          last_page: 50,
          page: page,
        }}
        isOpen={true}
        onPageChange={(num) => {
          setPage(num);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
};

export default PaintingByStoryDetail;
