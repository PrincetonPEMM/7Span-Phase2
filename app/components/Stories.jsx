"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";
import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import {
  initialLangItem,
  initialPlaceItem,
  storiesTableDetailView,
  storiesTableTitleView,
  initialfilterItem,
  pagePerLimit,
  STORIES,
} from "@/utils/constant";
import useDebounce from "@/utils/useDebounce";

const Stories = () => {
  const { debounce } = useDebounce();
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
  const [tableHeader, setTableHeader] = useState(storiesTableTitleView);
  const [isOpen, setIsOpen] = useState(true);

  const getFilterFalsyValue = (itemList, key) => {
    return `filters[${key}]=${itemList.checkItem[key]?.isChecked || false}&`;
  };

  const makeParamsArray = (key, arr) => {
    return arr.checkItem
      .filter((ar) => ar.isChecked)
      .map((itm) => `filters[${key}][]=${itm.name}&`)
      .join("");
  };

  async function fetchData(searchKey = "") {
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
      "mostIllustrated"
    )}${getFilterFalsyValue(
      filterItem,
      "earliestStories"
    )}${getFilterFalsyValue(filterItem, "recentStories")}${getFilterFalsyValue(
      filterItem,
      "popularStories"
    )}${getFilterFalsyValue(
      filterItem,
      "uniqueStories"
    )}filters[centuryRange][gt]=${storyMin}&filters[centuryRange][lt]=${storyMax}&${makeParamsArray(
      "origin",
      placeItem
    )}filters[manuscriptsWithStoryRange][gt]=${manuscriptsMin}&filters[manuscriptsWithStoryRange][lt]=${manuscriptsMax}&filters[paintingsOfStoryRange][gt]=${paintingMin}&filters[paintingsOfStoryRange][lt]=${paintingMax}&${makeParamsArray(
      "languages",
      langItem
    )}${getFilterFalsyValue(
      filterItem,
      "withEnglishTranslation"
    )}filters[search]=${searchKey}
    `;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories?${params}`
    );

    const data = await response.json();
    setTotalPage(data.total);
    setTableData(data.data);
  }
  useEffect(() => {
    fetchData(search);
  }, [filterItem, placeItem, langItem, page]);

  if (typeof window !== "undefined") {
    const checkWidth = () => {
      if (window?.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window?.addEventListener("resize", checkWidth);
  }

  const debouncedFetchData = debounce(fetchData, 300);

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
          isPageName={STORIES}
          onChangeStory={useCallback(
            (e) => {
              const { min, max } = e;
              setStoryMin(min);
              setStoryMax(max);
              debouncedFetchData();
            },
            [storyMin, storyMax]
          )}
          onChangeManuscript={useCallback(
            (e) => {
              const { min, max } = e;
              setManuscriptsMin(min);
              setManuscriptsMax(max);
              debouncedFetchData();
            },
            [manuscriptsMin, manuscriptsMax]
          )}
          onChangePainting={useCallback(
            (e) => {
              const { min, max } = e;
              setPaintingMin(min);
              setPaintingMax(max);
              debouncedFetchData();
            },
            [paintingMin, paintingMax]
          )}
          onChangeUnique={() => {}}
          filterItem={filterItem}
          setFilterItem={setFilterItem}
          placeItem={placeItem}
          setPlaceItem={setPlaceItem}
          langItem={langItem}
          setLangItem={setLangItem}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div className="w-full  overflow-x-auto">
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
        <div className="grid grid-cols-3 items-center justify-between top-0 py-2">
          <div className="relative w-full max-w-sm md:max-w-4xl col-span-2">
            <span className="bg-background-500 px-1 absolute -top-2 left-4 text-sm text-primary-500">
              Filter
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
          </div>
          <button
            className="bg-primary-500 text-white max-w-fit ml-auto w-auto px-2 py-4 md:py-4 md:px-4 text-xs md:text-sm rounded-md uppercase"
            onClick={() => {
              setToggleBtn(!toggleBtn);
              {
                !toggleBtn
                  ? setTableHeader(storiesTableDetailView)
                  : setTableHeader(storiesTableTitleView);
              }
            }}
          >
            {toggleBtn ? "Detail view" : "Title View"}
          </button>
        </div>

        <Table
          search={search}
          isPageName={STORIES}
          tableHeader={tableHeader}
          tableData={tableData}
          toggleBtn={toggleBtn}
          meta={{
            total: totalPage,
            per_page: perPage,
            current_page: page,
            last_page: 50,
          }}
          isOpen={isOpen}
          onPageChange={(e) => {
            setPage(e.selected + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Stories;
