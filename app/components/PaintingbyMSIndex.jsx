"use client";
import PaintingStoryCard from "@/app/components/PaintingStoryCard";
import {
  breakpointColumnsForMasonry,
  pagePerLimitForPainting,
} from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { TablePagination } from "./Pagination";
import Masonry from "react-masonry-css";
import InputText from "./form/InputText";
import MdiMagnify from "@/assets/icons/MdiMagnify";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import useDebounce from "@/utils/useDebounce";

const PaintingbyMSIndex = ({ list }) => {
  const { debounce } = useDebounce();
  const [isLoading, setIsLoadint] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setData(list?.data);
    setTotalPage(list?.total);
  }, []);

  const fetchData = (searchKey = "") => {
    setIsLoadint(true);
    fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-manuscript?page=${page}&perPage=${perPage}&filters[search]=${searchKey}`
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

  return (
    <div className="py-10 container-fluid">
      <div className="mb-10 flex items-start space-x-4 ">
        <div className="relative w-full max-w-4xl mx-auto">
          <InputText
            magnify={true}
            value={search}
            iconBefore
            iconAfter
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
            title={item?.manuscript_full_name}
            content={`${
              item?.manuscript_date_range_start &&
              item?.manuscript_date_range_end
                ? item.manuscript_date_range_start ===
                  item.manuscript_date_range_end
                  ? item.manuscript_date_range_start + "s"
                  : item.manuscript_date_range_start +
                    "-" +
                    item.manuscript_date_range_end
                : "-"
            }`}
            desc={`
            ${
              item.total_manuscript_paintings > 1
                ? `${item.total_manuscript_paintings} paintings `
                : `${item.total_manuscript_paintings} painting `
            }
            in ${
              item.scans_of_manuscript_in_color === "Yes"
                ? "color"
                : "black & white"
            }`}
            btnText={"View all images for this manuscript"}
            btnLink={`/paintings/by-manuscript/${item.web_page_address}`}
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

export default PaintingbyMSIndex;
