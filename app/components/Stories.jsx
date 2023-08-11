"use client";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";
import { Pagination } from "./Pagination";
import {
  initialLangItem,
  initialPlaceItem,
  tableDetailView,
  tableTitleView,
  initialfilterItem,
  pagePerLimit,
} from "@/utils/constant";

const Stories = () => {
  const [search, setSearch] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const [filterItem, setFilterItem] = useState(initialfilterItem);
  const [placeItem, setPlaceItem] = useState(initialPlaceItem);
  const [langItem, setLangItem] = useState(initialLangItem);
  const [storyMin, setStoryMin] = useState(0);
  const [storyMax, setStoryMax] = useState(100);
  const [manuscriptsMin, setManuscriptsMin] = useState(0);
  const [manuscriptsMax, setManuscriptsMax] = useState(100);
  const [paintingMin, setPaintingMin] = useState(0);
  const [paintingMax, setPaintingMax] = useState(100);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimit);
  const [totalPage, setTotalPage] = useState();
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState(tableTitleView);

  const getFilterFalsyValue = (itemList, key) => {
    return `filters[${key}]=${itemList.checkItem[key]?.isChecked}&`;
  };

  const makeParamsArray = (key, arr) => {
    return arr.checkItem
      .filter((ar) => ar.isChecked)
      .map((itm) => `filters[${key}][]=${itm.name}&`)
      .join("");
  };

  // homilyStories
  useEffect(() => {
    async function fetchData() {
      const params = `page=${page}&perPage=${perPage}&${getFilterFalsyValue(
        filterItem,
        "withPaintings"
      )}${getFilterFalsyValue(
        filterItem,
        "ethiopianStories"
      )}${getFilterFalsyValue(
        filterItem,
        "miracleOfMaryStories"
      )}${getFilterFalsyValue(
        filterItem,
        "lifeOfMaryStories"
      )}${getFilterFalsyValue(
        filterItem,
        "homilyStories"
      )}${getFilterFalsyValue(
        filterItem,
        "homilyStories"
      )}${getFilterFalsyValue(
        filterItem,
        "homilyStories"
      )}${getFilterFalsyValue(
        filterItem,
        "homilyStories"
      )}${getFilterFalsyValue(
        filterItem,
        "homilyStories"
      )}filters[centuryRange][gt]=${storyMin}&filters[centuryRange][lt]=${storyMax}&${makeParamsArray(
        "origin",
        placeItem
      )}filters[manuscriptsWithStoryRange][gt]=${manuscriptsMin}&filters[manuscriptsWithStoryRange][lt]=${manuscriptsMax}&filters[paintingsOfStoryRange][gt]=${paintingMin}&filters[paintingsOfStoryRange][lt]=${paintingMax}&${makeParamsArray(
        "languages",
        langItem
      )}filters[search]=${search}&filters[withEnglishTranslation]=${getFilterFalsyValue(
        filterItem,
        "withEnglishTranslation"
      )}
      `;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories?${params}`
      );

      const data = await response.json();
      setTotalPage(Math.ceil(data.total / perPage));

      setTableData(data.data);
    }
    fetchData();
  }, [
    filterItem,
    placeItem,
    langItem,
    search,
    page,
    storyMin,
    storyMax,
    manuscriptsMin,
    manuscriptsMax,
    paintingMin,
    paintingMax,
  ]);
  console.log("filterItem", filterItem);

  const handlePagination = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <div className="shell px-5 ">
      <div className="shell__sidebar w-full relative">
        <Sidebar
          filterItem={filterItem}
          setFilterItem={setFilterItem}
          placeItem={placeItem}
          setPlaceItem={setPlaceItem}
          langItem={langItem}
          setLangItem={setLangItem}
          storyMin={storyMin}
          setStoryMin={setStoryMin}
          storyMax={storyMax}
          setStoryMax={setStoryMax}
          manuscriptsMin={manuscriptsMin}
          setManuscriptsMin={setManuscriptsMin}
          manuscriptsMax={manuscriptsMax}
          setManuscriptsMax={setManuscriptsMax}
          paintingMin={paintingMin}
          setPaintingMin={setPaintingMin}
          paintingMax={paintingMax}
          setPaintingMax={setPaintingMax}
        />
      </div>
      <div>
        <div className="flex justify-between items-center top-0 p-3 sticky bg-background-500 z-20">
          <div className="relative w-full max-w-4xl">
            <span className="bg-background-500 px-1 absolute -top-2 left-4 text-sm text-primary-500">
              Filter
            </span>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            class="bg-primary-500 text-white p-4 text-sm rounded-md uppercase"
            onClick={() => {
              setToggleBtn(!toggleBtn);
              {
                !toggleBtn
                  ? setTableHeader(tableDetailView)
                  : setTableHeader(tableTitleView);
              }
            }}
          >
            {toggleBtn ? "Detail view" : "Title View"}
          </button>
        </div>
        <Table
          tableHeader={tableHeader}
          tableData={tableData}
          toggleBtn={toggleBtn}
        />
        <Pagination
          meta={{
            total: totalPage,
            per_page: perPage,
            current_page: page,
            last_page: 50,
          }}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default Stories;
