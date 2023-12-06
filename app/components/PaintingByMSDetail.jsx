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
import CustomPagination, { TablePagination } from "./Pagination";
import Link from "next/link";
import BackBtn from "./BackBtn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaintingByMSDetail = ({ list, Id }) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const newParams = new URLSearchParams();
  const pageP = params.get("page");
  const pageParams = pageP > 1 ? pageP : 1;
  const searchP = params.get("search");
  const searchParams = searchP ? searchP : "";
  const { debounce } = useDebounce();
  const [isLoading, setIsLoadint] = useState(true);
  const [page, setPage] = useState(pageParams);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [header, setHeader] = useState();
  const [search, setSearch] = useState(searchParams);

  useEffect(() => {
    setData(list?.data);
    setHeader(list?.manuscriptData);
    setTotalPage(list?.total);
  }, []);

  const fetchData = (searchKey = search) => {
    setIsLoadint(true);
    if (searchKey.length > 3) {
      setFilterInParams("search", searchKey, false);
    }
    if (searchKey.length === 0) {
      setFilterInParams("search", searchKey, true);
    }

    if (page !== 1) {
      setFilterInParams("page", page, false);
    } else {
      setFilterInParams("page", page, true);
    }
    fetch(
      `${
        process.env.NEXT_PUBLIC_DIRECTUS_URL
      }paintings/by-manuscript/${Id}?page=${page}&perPage=${perPage}&filters[search]=${
        searchKey.length > 3 ? searchKey : ""
      }`
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

  const setFilterInParams = (key, value, isRemove = false) => {
    if (isRemove || !value) {
      newParams.delete(key);
      router.push(`${pathname}?${newParams.toString()}`);
      return;
    }
    newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="container-fluid py-4 lg:py-10">
      <BackBtn />
      <div className="sticky top-0 bg-offWhite-500 z-10 pt-1">
        {header && (
          <h1 className="font-bold text-2xl mb-5 lg:text-3xl xl:text-4xl text-primary-500  font-body">
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
          </h1>
        )}
        <div className="mb-10 flex items-start space-x-4 ">
          <div className="sm:grid lg:grid-cols-5 sm:grid-cols-2 w-full items-center font-body">
            <div className="relative w-full col-span-2  max-w-4xl mx-auto mb-3 lg:mb-0">
              <label
                htmlFor="search painting by manuscript detail"
                className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500"
              >
                Search titles and painting descriptions.
              </label>
              <InputText
                id="search painting by manuscript detail"
                value={search}
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
                  className="h-3 w-3 absolute cursor-pointer inset-y-0 right-5 my-auto text-primary-700 md:h-4 md:w-4"
                  onClick={() => {
                    setSearch("");
                    debouncedFetchData("");
                  }}
                />
              )}
            </div>
            <div className=" lg:text-center lg:col-span-2 grid justify-items-center sm:justify-items-start lg:justify-items-center">
              <CustomPagination
                className="pagination-tablet"
                currentPage={page}
                totalPages={Math.ceil(totalPage / perPage)}
                onPageChange={(num) => {
                  setPage(num);
                }}
              />
            </div>
            <div
              id="announce"
              aria-live="polite"
              results={`${totalPage ? totalPage : 0} records`}
              className=" text-offBlack-400  mt-4 ml-auto font-medium  text-xs order-3 text-center mr-0 sm:mt-0 sm:text-left sm:-order-none
           lg:ml-0  lg:col-span-1 xl:text-sm"
            >
              Results: ({totalPage ? totalPage : 0} records)
            </div>
          </div>
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsForMasonry}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((item, index) => (
          <Link
            key={item.image_link + index}
            href={`/paintings/${Id}_${item.painting_unique_id}`}
            className={`rounded-lg text-offWhite-500 font-body mb-4 mx-auto inline-block relative overflow-hidden w-full`}
          >
            <PaintingStoryCard
              key={item.image_link + index}
              image={item.image_link}
              title={item.pemm_short_title}
              content={item.episodes}
              desc={`Story ID ${item.canonical_story_id}${
                item.painting_folio ? ", f. " + item.painting_folio : ""
              }${item.painting_scan ? ", s. " + item.painting_scan : ""}`}
              className="mt-3"
            />
          </Link>
        ))}
      </Masonry>

      {Boolean(!data?.length) && (
        <div className="flex items-center py-36 justify-center w-full text-2xl text-primary-500 font-bold">
          {isLoading ? <h1>Loading...</h1> : <h1>Records Not Found</h1>}
        </div>
      )}
      {/* <TablePagination
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
      /> */}
    </div>
  );
};

export default PaintingByMSDetail;
