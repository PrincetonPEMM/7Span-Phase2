"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import InputText from "./form/InputText";
import PaintingCard from "./PaintingCard";
import Dropdown from "./Dropdown";
import {
  breakpointColumnsForMasonry,
  pagePerLimitForPainting,
} from "@/utils/constant";
import CustomPagination, { TablePagination } from "./Pagination";
import useDebounce from "@/utils/useDebounce";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import Masonry from "react-masonry-css";

const Paintings = ({
  dateOfPainting,
  paintingInColor,
  typeOfStory,
  institution,
}) => {
  const [page, setPage] = useState(1);
  const { debounce } = useDebounce();
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateOfPaintins, setDateOfPaintins] = useState([]);
  const [paintingsInColorOnly, setPaintingsInColorOnly] = useState(
    paintingInColor[0]
  );
  const [storyType, setStoryType] = useState();
  const [archiveOfPainting, setArchiveOfPainting] = useState();

  const makeParamsArray = (key, arr) => {
    if (arr.length)
      if (key === "dateOfPainting")
        return arr.map((itm) => `filters[${key}][]=${itm.key}&`).join("");
      else return arr.map((itm) => `filters[${key}]=${itm.key}&`).join("");
    return "";
  };

  const fetchData = async (searchKey = "") => {
    setLoading(true);
    try {
      const params = `page=${page}&perPage=${perPage}&${makeParamsArray(
        "dateOfPainting",
        dateOfPaintins
      )}${makeParamsArray("paintingInColor", [
        paintingsInColorOnly,
      ])}${makeParamsArray(
        "typeOfStory",
        Boolean(storyType) ? [storyType] : []
      )}${makeParamsArray(
        "institution",
        Boolean(archiveOfPainting) ? [archiveOfPainting] : []
      )}filters[search]=${searchKey}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings?${params}`
      );
      const resData = await response.json();
      setTotalPage(resData.total);
      setData(resData.data);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(search);
    setPage(1);
  }, [dateOfPaintins, paintingsInColorOnly, storyType, archiveOfPainting]);

  useEffect(() => {
    fetchData(search);
  }, [page]);

  const debouncedFetchData = debounce(fetchData, 300);
  const paintingBy = [
    {
      value: "Paintings for Particular Stories",
      key: "/paintings/by-story",
    },
    {
      value: "Paintings for Particular Manuscripts",
      key: "paintings/by-manuscript",
    },
  ];
  return (
    <div className="container-fluid">
      <div className="mx-auto grid grid-cols-1 pt-4 sm:grid-cols-4 lg:grid-cols-6 gap-2 items-end justify-start mb-3">
        <div className="relative w-full sm:max-w-sm md:max-w-4xl sm:col-span-2 ">
          <span className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500">
            Search painting descriptions
          </span>
          <InputText
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
              className="h-3 w-3 md:h-4 md:w-4 absolute cursor-pointer inset-y-0 right-5 my-auto text-primary-700"
              onClick={() => {
                setSearch("");
                debouncedFetchData("");
              }}
            />
          )}
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <div className="text-center block h-auto py-3 text-xs md:w-full">
            Results: ({totalPage ? totalPage : 0} records)
          </div>
        </div>

        <div className="col-span-2">
          <CustomPagination
            className="pagination-tablet"
            currentPage={page}
            totalPages={Math.ceil(totalPage / perPage)}
            onPageChange={(num) => {
              setPage(num);
              setExpandedRows([]);
            }}
          />
        </div>

        <div className="sm:col-span-1">
          <Dropdown
            title="All Paintings"
            options={paintingBy}
            isMultiple={false}
          />
        </div>
      </div>

      <div className="mb-1 font-body lg:mx-auto lg:justify-normal">
        <div className="grid gap-2 grid-cols-1 justify-between mb-1 font-body lg:justify-between sm:grid-cols-4 lg:grid-cols-8">
          <div className="">
            <Dropdown
              title="Date of Paintings"
              selected={dateOfPaintins}
              setSelected={setDateOfPaintins}
              options={dateOfPainting}
              isMultiple={true}
            />
          </div>
          <div className="sm:col-span-2">
            <Dropdown
              title="Paintings in color only"
              selected={paintingsInColorOnly}
              setSelected={setPaintingsInColorOnly}
              options={paintingInColor}
              isMultiple={false}
            />
          </div>
          <div className="sm:col-span-2">
            <Dropdown
              title="Story Type"
              selected={storyType}
              setSelected={setStoryType}
              options={typeOfStory}
              isMultiple={false}
            />
          </div>
          <div className="sm:col-span-2">
            <Dropdown
              title="Repository of Painting"
              selected={archiveOfPainting}
              setSelected={setArchiveOfPainting}
              options={institution}
              isMultiple={false}
            />
          </div>
          <div className="text-center w-full md:text-left ">
            <button
              className="bg-primary-500 w-full text-white p-2 text-center rounded-lg text-xs md:text-sm"
              onClick={() => {
                setDateOfPaintins([]);
                setPaintingsInColorOnly(paintingInColor[0]);
                setStoryType(null);
                setArchiveOfPainting(null);
                setPage(1);
                setSearch("");
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="pb-10 mt-10">
        {data.length ? (
          <Masonry
            breakpointCols={breakpointColumnsForMasonry}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data.map((card, index) => (
              <PaintingCard key={card.image_link + index} card={card} />
            ))}
          </Masonry>
        ) : (
          Boolean(!data?.length) && (
            <div className="flex items-center py-36 justify-center  w-full text-2xl text-primary-500 font-bold">
              {loading ? <h1>Loading...</h1> : <h1>Records Not Found</h1>}
            </div>
          )
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
    </div>
  );
};

export default Paintings;
