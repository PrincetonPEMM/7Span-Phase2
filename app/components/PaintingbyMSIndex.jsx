"use client";
import PaintingStoryCard from "@/app/components/PaintingStoryCard";
import {
  breakpointColumnsForMasonry,
  pagePerLimitForPainting,
} from "@/utils/constant";
import React, { useEffect, useState } from "react";
import CustomPagination, { TablePagination } from "./Pagination";
import Masonry from "react-masonry-css";
import InputText from "./form/InputText";
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
    <div className="container-fluid py-4 lg:py-10">
      <div className="mb-10 flex items-start space-x-4 ">
        <div className="sm:grid lg:grid-cols-5 sm:grid-cols-2 w-full items-center">
          <div className="relative w-full col-span-2  max-w-4xl mx-auto mb-3 lg:mb-0">
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
          <p className=" text-offBlack-400  font-medium pl-2 text-xs text-center sm:text-left lg:text-center xl:text-sm lg:col-span-1">
            Results: ({totalPage ? totalPage : 0} records)
          </p>
          <div className="order-3 sm:mt-0 sm:-order-none mt-4 lg:col-span-2 ml-auto mr-0">
            <CustomPagination
              className="pagination-tablet"
              currentPage={page}
              totalPages={Math.ceil(totalPage / perPage)}
              onPageChange={(num) => {
                setPage(num);
              }}
            />
          </div>
        </div>
        {/* <p className="hidden text-offBlack-400  font-medium pl-2 text-xs sm:text-center sm:block xl:text-sm lg:col-span-1">
            Results: {`(${totalPage ? totalPage : 0} records)`}
          </p>

          <div className="order-3 sm:-order-none mt-4  sm:mt-0 lg:col-span-2">
            <CustomPagination
              className="pagination-tablet"
              currentPage={page}
              totalPages={Math.ceil(totalPage / perPage)}
              onPageChange={(num) => {
                setPage(num);
              }}
            />
          </div>
        </div> */}
      </div>
      <Masonry
        breakpointCols={breakpointColumnsForMasonry}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((item, index) => (
          <div
            key={item.image_link + index}
            className={`rounded-lg text-offWhite-500 font-body mb-4 mx-auto  inline-block relative overflow-hidden w-full`}
          >
            <PaintingStoryCard
              key={item.image_link + index}
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
          </div>
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
