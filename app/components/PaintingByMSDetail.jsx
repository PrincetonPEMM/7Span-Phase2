"use client";
import React, { useEffect, useState } from "react";
import PaintingStoryCard from "./PaintingStoryCard";
import {
  breakpointColumnsForMasonry,
  pagePerLimitForPainting,
} from "@/utils/constant";
import Masonry from "react-masonry-css";
import useDebounce from "@/utils/useDebounce";
import MdiMagnify from "@/assets/icons/MdiMagnify";
import InputText from "./form/InputText";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import { TablePagination } from "./Pagination";

const data1 = [
  {
    title: "Title not Found",
    content: "St Mary and Jesus Christ, surrounded by angels (full)",
    text: "text here",
    btnText: "View all Images ",
  },
  {
    title: "Title not Found",
    content:
      "St Mary giving the dog water to drink from her shoe (left), 2. The group of virgins gathered around the well while one of them chases away the thirsty dog (right) ",
    text: "text here",
  },
  {
    title: "Title not Found",
    content: "Joachim and Hanna hold the child Mary (bottom)",
    text: "text here",
  },

  {
    title: "Title not Found",
    content: "COntent here",
    text: "text here",
    btnText: "View all Images ",
  },
  {
    title: "Title not Found",
    content:
      "The group of virgins gathered around the well while one of them chases away the thirsty dog (right), 2. St Mary giving the dog water to drink from her shoe (left)",
    text: "text here",
  },
  {
    title: "Title not Found",
    content: "Joachim and Hanna hold the child Mary (bottom)",
    text: "text here",
  },

  {
    title: "Title not Found",
    content:
      "St Mary giving the dog water to drink from her shoe (left), 2.St Mary giving the dog water to drink from her shoe (left), 2. The group of virgins gathered around the well while one of them chases away the thirsty dog (right) The group of virgins gathered around the well while one of them chases away the thirsty dog (right)",
    text: "text here",
  },
  {
    title: "Title not Found",
    content:
      "The group of virgins gathered around the well while one of them chases away the thirsty dog (right), 2. St Mary giving the dog water to drink from her shoe (left)",
    text: "text here",
  },
];
const PaintingByMSDetail = ({ list, Id }) => {
  const { debounce } = useDebounce();
  const [isLoading, setIsLoadint] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [header, setHeader] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setData(list?.data);
    setHeader(list?.manuscriptData);
    setTotalPage(list?.total);
  }, []);

  const fetchData = (searchKey = "") => {
    setIsLoadint(true);
    fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-manuscript/${Id}?page=${page}&perPage=${perPage}&filters[search]=${searchKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
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
    fetchData(search);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const debouncedFetchData = debounce((e) => {
    fetchData(e);
    setPage(1);
  }, 300);

  console.log(data, "debouncedFetchData");

  return (
    <div className="py-10 container-fluid">
      {header && (
        <h2 className="font-menu text-2xl lg:text-3xl xl:text-5xl font-medium">
          {header?.manuscript_full_name}&nbsp;(
          {`${
            header?.manuscript_date_range_start &&
            header?.manuscript_date_range_end
              ? header.manuscript_date_range_start ===
                header.manuscript_date_range_end
                ? header.manuscript_date_range_start + "s"
                : header.manuscript_date_range_start +
                  "-" +
                  header.manuscript_date_range_end
              : "-"
          }`}
          )
        </h2>
      )}
      <div className="mb-10 flex items-start space-x-4 ">
        <div className="relative w-full max-w-4xl mx-auto">
          <MdiMagnify className="h-4 w-4 md:h-6 md:w-6 absolute inset-y-0 left-3 md:left-5 my-auto text-primary-700" />
          <InputText
            magnify={true}
            value={search}
            iconBefore
            placeholderText="Search"
            onChange={(e) => {
              const query = e.target.value;
              setSearch(query);
              if (query.length > 3) {
                debouncedFetchData(query);
              }
              if (query.length === 0) {
                debouncedFetchData(query);
              }
            }}
          />

          {search && (
            <MdiWindowClose
              className="h-3 w-3 md:h-4 md:w-4 absolute cursor-pointer inset-y-0 right-5 my-auto text-primary-700"
              onClick={() => {
                setSearch("");
                debouncedFetchData("");
              }}
            />
          )}
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsForMasonry}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((item, index) => (
          <PaintingStoryCard
            key={index}
            image={item.image_link}
            title={item.pemm_short_title}
            content={item.episodes}
            desc={`Story ID ${item.canonical_story_id}, ${
              item.painting_folio ? "f." + item.painting_folio : ""
            } ${item.painting_scan ? "s." + item.painting_scan : ""}`}
            className="mt-3"
          />
        ))}
      </Masonry>

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

export default PaintingByMSDetail;
