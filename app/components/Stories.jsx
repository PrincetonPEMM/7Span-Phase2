"use client";
import React, { useCallback, useEffect, useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";
import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import OutsideClickHandler from "react-outside-click-handler";
import {
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
  initialOriginalLangItem,
  initialTranslatedLangItem,
} from "@/utils/constant";
import useDebounce from "@/utils/useDebounce";
import CustomPagination, { TablePagination } from "./Pagination";

const Stories = () => {
  const { debounce } = useDebounce();
  const [search, setSearch] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [filterItem, setFilterItem] = useState(initialfilterItem);
  const [placeItem, setPlaceItem] = useState(initialPlaceItem);
  const [langOriginalItem, setOriginalLangItem] = useState(
    initialOriginalLangItem
  );
  const [langTranslatedItem, setTranslatedLangItem] = useState(
    initialTranslatedLangItem
  );
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
  const [isMount, setIsMount] = useState(false);
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
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.classList.add("filter_open");
      document.body.classList.remove("sidebar_close");
      document.body.classList.remove("sidebar_open");
      document.body.classList.remove("filter_close");
    } else {
      document.body.classList.add("filter_close");
      document.body.classList.remove("filter_open");
      document.body.classList.remove("sidebar_close");
      document.body.classList.remove("sidebar_open");
    }
  }, [isOpen, window]);

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
        "originalLanguages",
        langOriginalItem
      )}&${makeParamsArray(
        "translatedLanguages",
        langTranslatedItem
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
  }, [page]);

  useEffect(() => {
    fetchData(search);
    setPage(1);
  }, [filterItem, placeItem, langOriginalItem, langTranslatedItem]);

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

  const scrollTop = () => {
    if (isMount) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 5000);
    }
    setIsMount(true);
  };

  const debouncedFetchData = debounce((e) => {
    fetchData(e);
    setPage(1);
  }, 300);

  const resetFilter = () => {
    setFilterItem(initialfilterItem);
    setPlaceItem(initialPlaceItem);
    setOriginalLangItem(initialOriginalLangItem);
    setTranslatedLangItem(initialTranslatedLangItem);
    setStoryMin(rangeSliderMinForStoriesStoriesPage);
    setStoryMax(rangeSliderMaxForStoriesStoriesPage);
    setManuscriptsMin(rangeSliderMinForManuscriptsStoriesPage);
    setManuscriptsMax(rangeSliderMaxForManuscriptsStoriesPage);
    setPaintingMin(rangeSliderMinForPaintingsStoriesPage);
    setPaintingMax(rangeSliderMaxForPaintingsStoriesPage);
    setExpandedRows([]);
    setPage(1);
    setSearch("");
    // setToggleBtn(false);
    // setTableHeader()
    fetchData("");
  };

  return (
    <div
      className={`story-page flex px-4 md:px-5 pb-10 ${
        isOpen ? "shell" : "flex "
      }`}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          if (window.innerWidth < 768) {
            setIsOpen(false);
          }
        }}
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
                scrollTop();
              },
              [storyMin, storyMax]
            )}
            onChangeManuscript={useCallback(
              (e) => {
                const { min, max } = e;
                setManuscriptsMin(min);
                setManuscriptsMax(max);
                debouncedFetchData();
                scrollTop();
              },
              [manuscriptsMin, manuscriptsMax]
            )}
            onChangePainting={useCallback(
              (e) => {
                const { min, max } = e;
                setPaintingMin(min);
                setPaintingMax(max);
                debouncedFetchData();
                scrollTop();
              },
              [paintingMin, paintingMax]
            )}
            onChangeUnique={() => {}}
            filterItem={filterItem}
            setFilterItem={setFilterItem}
            placeItem={placeItem}
            setPlaceItem={setPlaceItem}
            langItem={langOriginalItem}
            setLangItem={(e) => {
              setOriginalLangItem(e);
              setTranslatedLangItem(initialTranslatedLangItem);
            }}
            translatedItem={langTranslatedItem}
            setTranslatedItem={(e) => {
              setTranslatedLangItem(e);
              setOriginalLangItem(initialOriginalLangItem);
            }}
            onClick={() => setIsOpen(!isOpen)}
            resetFilter={resetFilter}
          />
        </div>
      </OutsideClickHandler>

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
        <div className="mt-4 sm:mt-0 flex flex-col sm:grid grid-cols-2 sm:grid-cols-3 items-center justify-between pb-2 lg:grid-cols-6">
          <div className="relative w-full sm:col-span-3 mb-2 lg:mb-0 lg:col-span-2  lg:max-w-4xl">
            <span className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500">
              Search titles and translations
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
          <div className="w-full flex items-center justify-between sm:hidden">
            <p className="text-offBlack-400 font-medium pl-2 text-xs xl:text-sm lg:col-span-1 sm:text-center">
              Results: {`(${totalPage ? totalPage : 0} records)`}
            </p>
            <button
              className={`bg-primary-500 text-white max-w-fit w-auto px-2 py-3 ${
                toggleBtn ? "md:py-3 md:px-3" : "md:py-3 md:px-4"
              } font-semibold text-xs md:text-sm rounded-md lg:hover:text-primary-500 uppercase lg:hover:bg-transparent lg:hover:border-primary-500 border-2 border-primary-500 transition-colors lg:hover:transition-colors`}
              onClick={() => {
                setToggleBtn(!toggleBtn);
                {
                  !toggleBtn
                    ? setTableHeader(manuscriptsTableDetailView)
                    : setTableHeader(manuscriptsTableTitleView);
                }
              }}
            >
              {toggleBtn ? "Detail view" : "Title View"}
            </button>
          </div>
          <p className="hidden text-offBlack-400 font-medium pl-1 text-xs sm:text-center sm:block xl:text-sm lg:col-span-1">
            Results: {`(${totalPage ? totalPage : 0} records)`}
          </p>

          <div className="order-3 sm:-order-none mt-4 sm:mt-0 lg:col-span-2">
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
          <div className="hidden w-full mt-2 sm:mt-0 items-center justify-end gap-3 text-sm sm:flex 2xl:text-base">
            <button
              className={`bg-primary-500 text-white max-w-fit w-auto px-2 py-3 ${
                toggleBtn ? "md:py-3 md:px-3" : "md:py-3 md:px-4"
              } font-semibold text-xs md:text-sm rounded-md lg:hover:text-primary-500 uppercase lg:hover:bg-transparent lg:hover:border-primary-500 border-2 border-primary-500 transition-colors lg:hover:transition-colors`}
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
          <div className="flex items-center py-20 justify-center w-full text-2xl text-primary-500 font-bold">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <h1 className="py-20">Records Not Found</h1>
            )}
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
          isOpen={isOpen}
          onPageChange={(num) => {
            setPage(num);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setExpandedRows([]);
          }}
        /> */}
      </div>
    </div>
    // </div>
  );
};

export default Stories;
