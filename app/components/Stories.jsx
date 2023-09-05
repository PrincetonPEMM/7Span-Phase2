"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  rangeSliderMinForStoriesStoriesPage,
  rangeSliderMaxForStoriesStoriesPage,
  rangeSliderMinForManuscriptsStoriesPage,
  rangeSliderMaxForManuscriptsStoriesPage,
  rangeSliderMinForPaintingsStoriesPage,
  rangeSliderMaxForPaintingsStoriesPage,
} from "@/utils/constant";
import useDebounce from "@/utils/useDebounce";
import { TablePagination } from "./Pagination";

const Stories = () => {
  const { debounce } = useDebounce();
  const [search, setSearch] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [filterItem, setFilterItem] = useState(initialfilterItem);
  const [placeItem, setPlaceItem] = useState(initialPlaceItem);
  const [langItem, setLangItem] = useState(initialLangItem);
  const [storyMin, setStoryMin] = useState(rangeSliderMinForStoriesStoriesPage);
  const [storyMax, setStoryMax] = useState(rangeSliderMaxForStoriesStoriesPage);
  const [manuscriptsMin, setManuscriptsMin] = useState(
    rangeSliderMinForManuscriptsStoriesPage
  );
  const [manuscriptsMax, setManuscriptsMax] = useState(
    rangeSliderMaxForManuscriptsStoriesPage
  );
  const [paintingMin, setPaintingMin] = useState(
    rangeSliderMinForPaintingsStoriesPage
  );
  const [paintingMax, setPaintingMax] = useState(
    rangeSliderMaxForPaintingsStoriesPage
  );
  const [isLoading, setIsLoadint] = useState(true);
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
    try {
      setIsLoadint(true);
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
      )}${getFilterFalsyValue(
        filterItem,
        "recentStories"
      )}${getFilterFalsyValue(
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
      setIsLoadint(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    fetchData(search);
  }, [filterItem, placeItem, langItem, page]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkWidth = () => {
        if (window?.innerWidth < 1024) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      };
      checkWidth();
      window?.addEventListener("resize", checkWidth);
    }
  }, []);

  const debouncedFetchData = debounce((e) => {
    fetchData(e);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 300);

  return (
    <div
      className={`story-page flex px-4 md:px-5 pb-10  ${
        isOpen ? "shell" : "flex "
      }`}
    >
      <div
        className={`font-menu bg-primary-500 fixed inset-y-0 pt-0 overflow-y-auto shell__sidebar rounded-sm w-64 lg:h-auto text-white p-3 ${
          isOpen
            ? "left-0 z-20 md:block md:static h-full top-0 transition-all"
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

      <div className="w-full grid">
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="">
            <MdiMenuOpen className="text-primary-500 md:block hidden h-6 w-6" />
          </button>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="block md:hidden h-6 w-6 text-primary-500"
        >
          <MdiMenuOpen className="text-white-500" />
        </button>
        <div className="mt-4 sm:mt-0 sm:grid sm:grid-cols-5 items-center justify-between pb-2">
          <div className="relative w-full sm:max-w-sm md:max-w-4xl sm:col-span-2 md:col-span-3">
            <span className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500">
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
          <div className="w-full mt-2 sm:mt-0 sm:col-span-3 md:col-span-2 flex items-center justify-end gap-3">
            <p className="text-offBlack-400 font-medium pl-2">
              Results: {`(${totalPage ? totalPage : 0} records)`}
            </p>
            <button
              className="bg-primary-500 text-white max-w-fit w-auto px-2 py-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm rounded-md hover:text-primary-500 uppercase hover:bg-transparent hover:border-primary-500 border-2 border-primary-500 transition-colors hover:transition-colors"
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
        </div>
        {/* <div
          className={`w-full table-wrap  ${
            tableData?.length ? "h-screen" : "h-auto block"
          } `}
        > */}
        <Table
          // search={search}
          isPageName={STORIES}
          tableHeader={tableHeader}
          tableData={tableData}
          toggleBtn={toggleBtn}
          // meta={{
          //   total: totalPage,
          //   per_page: perPage,
          //   current_page: page,
          //   last_page: 50,
          // }}
          // isOpen={isOpen}
          // onPageChange={(e) => {
          //   setPage(e.selected + 1);
          // }}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
        />
        {Boolean(!tableData?.length) && (
          <div className="flex items-center justify-center w-full text-2xl text-primary-500 font-bold">
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
          isOpen={isOpen}
          onPageChange={(num) => {
            setPage(num);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setExpandedRows([]);
          }}
        />
      </div>
    </div>
    // </div>
  );
};

export default Stories;
