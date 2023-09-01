"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import InputText from "./form/InputText";
import MdiMagnify from "@assets/icons/MdiMagnify";
import Masonry from "@/app/components/Masonry";
import PaintingCard from "./PaintingCard";
import Dropdown from "./Dropdown";
import { pagePerLimitForPainting } from "@/utils/constant";
import { TablePagination } from "./Pagination";
import useDebounce from "@/utils/useDebounce";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";

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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(search);
  }, [
    dateOfPaintins,
    paintingsInColorOnly,
    storyType,
    archiveOfPainting,
    page,
  ]);

  const debouncedFetchData = debounce(fetchData, 300);

  return (
    <div className="container">
      <div className="flex items-start space-x-4 mb-1">
        <div class="relative w-full max-w-4xl mx-auto">
          <MdiMagnify className="h-4 w-4 md:h-6 md:w-6 absolute inset-y-0 left-3 md:left-5 my-auto text-primary-700" />
          <InputText
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

          <MdiWindowClose
            className="h-3 w-3 md:h-4 md:w-4 absolute cursor-pointer inset-y-0 right-5 my-auto text-primary-700"
            onClick={() => {
              setSearch("");
              debouncedFetchData("");
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:flex items-start justify-center flex-wrap mb-1 font-body lg:mx-auto max-w-4xl">
        <Dropdown
          title="Date of Paintings"
          selected={dateOfPaintins}
          setSelected={setDateOfPaintins}
          options={dateOfPainting}
          isMultiple={true}
        />
        <Dropdown
          title="Paintings in color only"
          selected={paintingsInColorOnly}
          setSelected={setPaintingsInColorOnly}
          options={paintingInColor}
          isMultiple={false}
        />
        <Dropdown
          title="Story Type"
          selected={storyType}
          setSelected={setStoryType}
          options={typeOfStory}
          isMultiple={false}
        />
        <Dropdown
          title="Repository of Painting"
          selected={archiveOfPainting}
          setSelected={setArchiveOfPainting}
          options={institution}
          isMultiple={false}
        />
      </div>
      <div className="block text-center mx-3 mb-4 font-body">
        <button
          className="bg-primary-500 text-white py-2 px-3 text-center rounded-lg"
          onClick={() => {
            setDateOfPaintins([]);
            setPaintingsInColorOnly(paintingInColor[0]);
            setStoryType();
            setArchiveOfPainting();
          }}
        >
          Reset
        </button>
      </div>

      <div className="pb-10">
        {data.length ? (
          <Masonry>
            {data.map((card, index) => (
              <PaintingCard key={index} card={card} />
            ))}
          </Masonry>
        ) : (
          Boolean(!data?.length) && (
            <div className="flex items-center justify-center  w-full text-2xl text-primary-500 font-bold">
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
          }}
        />
      </div>
    </div>
  );
};

export default Paintings;
