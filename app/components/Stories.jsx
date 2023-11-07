"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import CustomPagination from "./Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Stories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const newParams = new URLSearchParams();
  const pageP = params.get("page");
  const pageParams = pageP > 1 ? pageP : 1;
  const searchP = params.get("search");
  const searchParams = searchP ? searchP : "";

  const { debounce } = useDebounce();
  const [page, setPage] = useState(pageParams);
  const [search, setSearch] = useState(searchParams);
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
  const [isMount1, setIsMount1] = useState(false);
  const [isLoading, setIsLoadint] = useState(true);
  const [perPage, setPerPage] = useState(pagePerLimit);
  const [totalPage, setTotalPage] = useState();
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState(storiesTableTitleView);
  const childRef1 = useRef();
  const childRef2 = useRef();
  const childRef3 = useRef();

  const [isOpen, setIsOpen] = useState(true);

  const getFilterFalsyValue = (itemList, key) => {
    const value = itemList.checkItem[key]?.isChecked;
    if (value) setFilterInParams(key, value, false);
    else setFilterInParams(key, value, true);
    return `filters[${key}]=${value || false}&`;
  };

  const makeParamsArray = (key, arr) => {
    arr.checkItem
      .filter((ar) => !ar.isChecked)
      .map((itm) => {
        setFilterInParams(key, itm.name, true);
      });
    const resData = arr.checkItem
      .filter((ar) => ar.isChecked)
      .map((itm) => {
        setFilterInParams(key, itm.name, false);
        return `filters[${key}][]=${itm.name}&`;
      })
      .join("");
    return resData;
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

  async function fetchData(searchKey = search) {
    if (storyMin !== rangeSliderMinForStoriesStoriesPage) {
      setFilterInParams("storyMin", storyMin, false);
    } else setFilterInParams("storyMin", storyMin, true);
    if (storyMax !== rangeSliderMaxForStoriesStoriesPage) {
      setFilterInParams("storyMax", storyMax, false);
    } else setFilterInParams("storyMax", storyMax, true);

    if (manuscriptsMin !== rangeSliderMinForManuscriptsStoriesPage) {
      setFilterInParams("manuscriptsMin", manuscriptsMin, false);
    } else setFilterInParams("manuscriptsMin", manuscriptsMin, true);
    if (manuscriptsMax !== rangeSliderMaxForManuscriptsStoriesPage) {
      setFilterInParams("manuscriptsMax", manuscriptsMax, false);
    } else setFilterInParams("manuscriptsMax", manuscriptsMax, true);

    if (paintingMin !== rangeSliderMinForPaintingsStoriesPage) {
      setFilterInParams("paintingMin", paintingMin, false);
    } else setFilterInParams("paintingMin", paintingMin, true);
    if (paintingMax !== rangeSliderMaxForPaintingsStoriesPage) {
      setFilterInParams("paintingMax", paintingMax, false);
    } else setFilterInParams("paintingMax", paintingMax, true);

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
      )}${getFilterFalsyValue(filterItem, "withHymn")}${getFilterFalsyValue(
        filterItem,
        "printOnly"
      )}${getFilterFalsyValue(
        filterItem,
        "excludePrintOnly"
      )}${getFilterFalsyValue(
        filterItem,
        "readInChurch"
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
    if (isMount1) fetchData(search);
  }, [page]);

  useEffect(() => {
    if (isMount1) {
      setPage(1);
      setIsMount(true);
      fetchData(search);
    } else {
      setPage(pageParams);
      getFilterFromParams();
    }
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
  };

  const debouncedFetchData = debounce((e) => {
    if (isMount1) {
      fetchData(e);
      setPage(1);
    } else {
      setPage(pageParams);
    }
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
    fetchData("");
    router.push(`${pathname}`);
  };

  const setFilterInParams = (key, value, isRemove = false) => {
    if (isRemove || !value) {
      newParams.delete(key);
      history.pushState({}, "", `${pathname}?${newParams.toString()}`);
      return;
    }
    if (["translatedLanguages", "originalLanguages", "origin"].includes(key)) {
      newParams.append(key, value);
    } else newParams.set(key, value);
    history.pushState({}, "", `${pathname}?${newParams.toString()}`);
    // router.push(`${pathname}?${newParams.toString()}`);
  };

  const getFilterFromParams = () => {
    setIsMount1(true);
    const search = params.get("search");
    setSearch(search ? search : "");
    const pageP = params.get("page");
    setPage(pageP > 1 ? pageP : 1);
    const storyMinP = params.get("storyMin");
    const storyMaxP = params.get("storyMax");
    if (storyMinP && storyMaxP) {
      setStoryMin(storyMinP);
      setStoryMax(storyMaxP);
      childRef1?.current?.set(storyMinP, storyMaxP);
    } else if (storyMinP) {
      setStoryMin(storyMinP);
      childRef1?.current?.set(storyMinP, rangeSliderMaxForStoriesStoriesPage);
    } else if (storyMaxP) {
      setStoryMax(storyMaxP);
      childRef1?.current?.set(rangeSliderMinForStoriesStoriesPage, storyMaxP);
    }
    const manuscriptsMinP = params.get("manuscriptsMin");
    const manuscriptsMaxP = params.get("manuscriptsMax");
    if (manuscriptsMinP && manuscriptsMaxP) {
      setManuscriptsMin(manuscriptsMinP);
      setManuscriptsMax(manuscriptsMaxP);
      childRef2?.current?.set(manuscriptsMinP, manuscriptsMaxP);
    } else if (manuscriptsMinP) {
      setManuscriptsMin(manuscriptsMinP);
      childRef2?.current?.set(
        manuscriptsMinP,
        rangeSliderMaxForManuscriptsStoriesPage
      );
    } else if (manuscriptsMaxP) {
      setManuscriptsMax(manuscriptsMaxP);
      childRef2?.current?.set(
        rangeSliderMinForManuscriptsStoriesPage,
        manuscriptsMaxP
      );
    }
    const paintingMinP = params.get("paintingMin");
    const paintingMaxP = params.get("paintingMax");
    if (paintingMinP && paintingMaxP) {
      setPaintingMin(paintingMinP);
      setPaintingMax(paintingMaxP);
      childRef3?.current?.set(paintingMinP, paintingMaxP);
    } else if (paintingMinP) {
      setPaintingMin(paintingMinP);
      childRef3?.current?.set(
        paintingMinP,
        rangeSliderMaxForPaintingsStoriesPage
      );
    } else if (paintingMaxP) {
      setPaintingMax(paintingMaxP);
      childRef3?.current?.set(
        rangeSliderMinForPaintingsStoriesPage,
        paintingMaxP
      );
    }
    const origin = params.getAll("origin");
    const updatedPlace = placeItem.checkItem.map((temp) => {
      return { ...temp, isChecked: origin.includes(temp.name) ? true : false };
    });
    setPlaceItem({ ...placeItem, checkItem: updatedPlace });

    const originalLanguages = params.getAll("originalLanguages");
    const updatedLanguages = langOriginalItem.checkItem.map((temp) => {
      return {
        ...temp,
        isChecked: originalLanguages.includes(temp.name) ? true : false,
      };
    });
    setOriginalLangItem({ ...langOriginalItem, checkItem: updatedLanguages });

    const translatedLanguages = params.getAll("translatedLanguages");
    const updatedTranslated = langTranslatedItem.checkItem.map((temp) => {
      return {
        ...temp,
        isChecked: translatedLanguages.includes(temp.name) ? true : false,
      };
    });
    setTranslatedLangItem({
      ...langTranslatedItem,
      checkItem: updatedTranslated,
    });

    const withPaintings = params.get("withPaintings");
    const mostIllustrated = params.get("mostIllustrated");
    const withEnglishTranslation = params.get("withEnglishTranslation");
    const ethiopianStories = params.get("ethiopianStories");
    const miracleOfMaryStories = params.get("miracleOfMaryStories");
    const lifeOfMaryStories = params.get("lifeOfMaryStories");
    const earliestStories = params.get("earliestStories");
    const recentStories = params.get("recentStories");
    const popularStories = params.get("popularStories");
    const uniqueStories = params.get("uniqueStories");
    const withHymn = params.get("withHymn");
    const printOnly = params.get("printOnly");
    const excludePrintOnly = params.get("excludePrintOnly");
    const readInChurch = params.get("readInChurch");

    const newFilterItem = {
      ...filterItem,
      checkItem: {
        ...filterItem.checkItem,
        ["withPaintings"]: {
          ...filterItem.checkItem["withPaintings"],
          isChecked: withPaintings ? true : false,
        },
        ["mostIllustrated"]: {
          ...filterItem.checkItem["mostIllustrated"],
          isChecked: mostIllustrated ? true : false,
        },
        ["withEnglishTranslation"]: {
          ...filterItem.checkItem["withEnglishTranslation"],
          isChecked: withEnglishTranslation ? true : false,
        },
        ["ethiopianStories"]: {
          ...filterItem.checkItem["ethiopianStories"],
          isChecked: ethiopianStories ? true : false,
        },
        ["miracleOfMaryStories"]: {
          ...filterItem.checkItem["miracleOfMaryStories"],
          isChecked: miracleOfMaryStories ? true : false,
        },
        ["lifeOfMaryStories"]: {
          ...filterItem.checkItem["lifeOfMaryStories"],
          isChecked: lifeOfMaryStories ? true : false,
        },
        ["earliestStories"]: {
          ...filterItem.checkItem["earliestStories"],
          isChecked: earliestStories ? true : false,
        },
        ["recentStories"]: {
          ...filterItem.checkItem["recentStories"],
          isChecked: recentStories ? true : false,
        },
        ["popularStories"]: {
          ...filterItem.checkItem["popularStories"],
          isChecked: popularStories ? true : false,
        },
        ["uniqueStories"]: {
          ...filterItem.checkItem["uniqueStories"],
          isChecked: uniqueStories ? true : false,
        },
        ["withHymn"]: {
          ...filterItem.checkItem["withHymn"],
          isChecked: withHymn ? true : false,
        },
        ["printOnly"]: {
          ...filterItem.checkItem["printOnly"],
          isChecked: printOnly ? true : false,
        },
        ["excludePrintOnly"]: {
          ...filterItem.checkItem["excludePrintOnly"],
          isChecked: excludePrintOnly ? true : false,
        },
        ["readInChurch"]: {
          ...filterItem.checkItem["readInChurch"],
          isChecked: readInChurch ? true : false,
        },
      },
    };
    setFilterItem(newFilterItem);
  };

  return (
    <div
      className={`story-page flex px-4 xl:px-5 pb-10 ${
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
          className={`font-body bg-primary-500 fixed inset-y-0 pt-0 overflow-y-auto shell__sidebar rounded-sm w-64 lg:h-auto text-white p-3 ${
            isOpen
              ? "left-0 z-20 md:block md:static h-full top-0 transition-all"
              : "hidden -left-full transition-all"
          } `}
        >
          <Sidebar
            childRef1={childRef1}
            childRef2={childRef2}
            childRef3={childRef3}
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
        <div
          className="mt-4 sm:mt-0 flex flex-col sm:grid grid-cols-2 sm:grid-cols-4 items-center justify-between pb-2 lg:grid-cols-6 
gap-2 lg:gap-0 "
        >
          <div className="relative w-full sm:col-span-4 mb-2 lg:mb-0 lg:col-span-2  lg:max-w-4xl">
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
              } font-semibold text-xs md:text-sm rounded-md lg:hover:text-primary-500 lg:hover:bg-transparent lg:hover:border-primary-500 border-2 border-primary-500 transition-colors lg:hover:transition-colors`}
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
          <div className="order-3 sm:-order-none mt-4 sm:mt-0 col-span-2">
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
          <p className="hidden text-offBlack-400 font-medium pl-1 text-xs sm:block text-center lg:col-span-1 xl:text-sm">
            Results: {`(${totalPage ? totalPage : 0} records)`}
          </p>
          <div className="hidden w-full mt-2 sm:mt-0 items-center justify-end gap-3 text-sm sm:flex 2xl:text-base">
            <button
              className={`bg-primary-500 text-white max-w-fit w-auto px-2 py-3 ${
                toggleBtn ? "md:py-3 md:px-3" : "md:py-3 md:px-4"
              } font-semibold text-xs md:text-sm rounded-md lg:hover:text-primary-500 tracking-wide lg:hover:bg-transparent lg:hover:border-primary-500 border-2 border-primary-500 transition-colors lg:hover:transition-colors`}
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
