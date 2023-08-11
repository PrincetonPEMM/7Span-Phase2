"use client";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";
import { Pagination } from "./Pagination";
import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
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
  const [isOpen, setIsOpen] = useState(true);
  const [textValue, setTextValue] = useState("");
  const getFilterFalsyValue = (itemList, key) => {
    return `filters[${key}]=${itemList.checkItem[key]?.isChecked}&`;
  };
  const handleTextChange = (event) => {
    setTextValue(event.target.value);
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
    <div className={`flex px-1 md:px-5  ${isOpen ? "shell" : "flex"}`}>
      <div
        className={`font-menu bg-primary-500 h-full absolute shell__sidebar rounded-sm w-64 text-white p-2 ${
          isOpen
            ? "left-0 z-20 md:block md:static lg:h-full transition-all"
            : "hidden -left-full transition-all"
        } `}
      >
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
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div className="w-full overflow-auto">
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="p-2">
            <MdiMenuOpen className="text-primary-500 md:block hidden h-6 w-6" />
          </button>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="block md:hidden h-6 w-6 text-primary-500"
        >
          <MdiMenuOpen className="text-white-500" />
        </button>
        <div className="grid grid-cols-3 items-center justify-between top-0 p-2">
          <div className="relative w-full max-w-sm md:max-w-4xl col-span-2">
            <span className="bg-background-500 px-1 absolute -top-2 left-4 text-sm text-primary-500">
              Filter
            </span>
            <InputText
              value={search}
              onChange={(e) => {
                handleTextChange(e); // Call the first function
                setSearch(e.target.value); // Call the second function
              }}
            />
          </div>
          <button
            class="bg-primary-500 text-white max-w-fit ml-auto w-auto px-2 py-4 md:py-4 md:px-4 text-xs md:text-sm rounded-md uppercase"
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
        <div className=" w-full">
          <Table
            tableHeader={tableHeader}
            tableData={tableData}
            toggleBtn={toggleBtn}
          />
        </div>
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
