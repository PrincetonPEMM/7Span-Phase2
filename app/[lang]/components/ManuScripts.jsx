"use client";
import HeroiconsArrowDownTray20Solid from "@/assets/icons/HeroiconsArrowDownTray20Solid";
import {
  MANUSCRIPTS,
  initialOriginRegionManuScript,
  initialPlaceItemManuScript,
  initialfilterItemManuScript,
  manuscriptsTableDetailView,
  manuscriptsTableTitleView,
  minSearchChar,
  pagePerLimit,
  rangeSliderMaxDateOfCreationManuscriptsPage,
  rangeSliderMaxNoOfPaintingsManuscriptsPage,
  rangeSliderMaxNoOfStoriesManuscriptsPage,
  rangeSliderMaxUniqueStoriesManuscriptsPage,
  rangeSliderMinDateOfCreationManuscriptsPage,
  rangeSliderMinNoOfPaintingsManuscriptsPage,
  rangeSliderMinNoOfStoriesManuscriptsPage,
  rangeSliderMinUniqueStoriesManuscriptsPage,
} from "@/utils/constant";
import useDebounce from "@/utils/useDebounce";
import { replaceState } from "history-throttled";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import CustomPagination from "./Pagination";
import FilterButton from "./form/FilterButton";

const ManuScripts = ({ lang, localData }) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const newParams = new URLSearchParams();
  const pageP = params.get("page");
  const pageParams = pageP > 1 ? pageP : 1;
  const searchP = params.get("search");
  const searchParams = searchP ? searchP : "";
  const sortP = params.get("sort");
  const sortParams = sortP ? sortP : "";

  const [expandedRows, setExpandedRows] = useState([]);
  const { debounce } = useDebounce();
  const [isLoading, setIsLoadint] = useState(true);
  const [search, setSearch] = useState(searchParams);
  const [isMount, setIsMount] = useState(false);
  const [isMount1, setIsMount1] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [filterItem, setFilterItem] = useState(
    initialfilterItemManuScript(localData)
  );
  const [placeItem, setPlaceItem] = useState(initialPlaceItemManuScript);
  const [originRegion, setOriginRegion] = useState(
    initialOriginRegionManuScript
  );
  const [dateCreationMin, setDateCreationMin] = useState(
    rangeSliderMinDateOfCreationManuscriptsPage
  );
  const [dateCreationMax, setDateCreationMax] = useState(
    rangeSliderMaxDateOfCreationManuscriptsPage
  );
  const [noOfStoriesMin, setNoOfStoriesMin] = useState(
    rangeSliderMinNoOfStoriesManuscriptsPage
  );
  const [noOfStoriesMax, setNoOfStoriesMax] = useState(
    rangeSliderMaxNoOfStoriesManuscriptsPage
  );
  const [noOfPaintingMin, setNoOfPaintingMin] = useState(
    rangeSliderMinNoOfPaintingsManuscriptsPage
  );
  const [noOfPaintingMax, setNoOfPaintingMax] = useState(
    rangeSliderMaxNoOfPaintingsManuscriptsPage
  );
  const [noOfUniqueMin, setNoOfUniqueMin] = useState(
    rangeSliderMinUniqueStoriesManuscriptsPage
  );
  const [noOfUniqueMax, setNoOfUniqueMax] = useState(
    rangeSliderMaxUniqueStoriesManuscriptsPage
  );

  const [page, setPage] = useState(pageParams);
  const [perPage, setPerPage] = useState(pagePerLimit);
  let [totalPage, setTotalPage] = useState();
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState(manuscriptsTableTitleView);
  const [isOpen, setIsOpen] = useState(true);
  const [ascDescFil, setAscDescFil] = useState(sortParams);
  const [sortingRow, setSortingRow] = useState({});
  const childRef1 = useRef();
  const childRef2 = useRef();
  const childRef3 = useRef();
  const childRef4 = useRef();

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
    if (dateCreationMin !== rangeSliderMinDateOfCreationManuscriptsPage) {
      setFilterInParams("dateCreationMin", dateCreationMin, false);
    } else setFilterInParams("dateCreationMin", dateCreationMin, true);
    if (dateCreationMax !== rangeSliderMaxDateOfCreationManuscriptsPage) {
      setFilterInParams("dateCreationMax", dateCreationMax, false);
    } else setFilterInParams("dateCreationMax", dateCreationMax, true);

    if (noOfStoriesMin !== rangeSliderMinNoOfStoriesManuscriptsPage) {
      setFilterInParams("noOfStoriesMin", noOfStoriesMin, false);
    } else setFilterInParams("noOfStoriesMin", noOfStoriesMin, true);
    if (noOfStoriesMax !== rangeSliderMaxNoOfStoriesManuscriptsPage) {
      setFilterInParams("noOfStoriesMax", noOfStoriesMax, false);
    } else setFilterInParams("noOfStoriesMax", noOfStoriesMax, true);

    if (noOfPaintingMin !== rangeSliderMinNoOfPaintingsManuscriptsPage) {
      setFilterInParams("noOfPaintingMin", noOfPaintingMin, false);
    } else setFilterInParams("noOfPaintingMin", noOfPaintingMin, true);
    if (noOfPaintingMax !== rangeSliderMaxNoOfPaintingsManuscriptsPage) {
      setFilterInParams("noOfPaintingMax", noOfPaintingMax, false);
    } else setFilterInParams("noOfPaintingMax", noOfPaintingMax, true);

    if (noOfUniqueMin !== rangeSliderMinUniqueStoriesManuscriptsPage) {
      setFilterInParams("noOfUniqueMin", noOfUniqueMin, false);
    } else setFilterInParams("noOfUniqueMin", noOfUniqueMin, true);
    if (noOfUniqueMax !== rangeSliderMaxUniqueStoriesManuscriptsPage) {
      setFilterInParams("noOfUniqueMax", noOfUniqueMax, false);
    } else setFilterInParams("noOfUniqueMax", noOfUniqueMax, true);

    if (searchKey.length > minSearchChar) {
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

    if (ascDescFil) {
      setFilterInParams("sort", ascDescFil, false);
    } else {
      setFilterInParams("sort", "", true);
    }

    try {
      setIsLoadint(true);
      const params = `page=${page}&perPage=${perPage}&${getFilterFalsyValue(
        filterItem,
        "withPaintings"
      )}${getFilterFalsyValue(
        filterItem,
        "withOnlineDigitalCopy"
      )}${getFilterFalsyValue(
        filterItem,
        "withColorDigitalCopy"
      )}${getFilterFalsyValue(
        filterItem,
        "withUniqueStories"
      )}${getFilterFalsyValue(
        filterItem,
        "oldestManuscript"
      )}${getFilterFalsyValue(
        filterItem,
        "recentManuscript"
      )}${getFilterFalsyValue(
        filterItem,
        "arabicManuscript"
      )}${getFilterFalsyValue(
        filterItem,
        "gaazManuscript"
      )}${getFilterFalsyValue(
        filterItem,
        "royalManuscript"
      )}${getFilterFalsyValue(filterItem, "printOnly")}${getFilterFalsyValue(
        filterItem,
        "excludePrintOnly"
      )}${getFilterFalsyValue(filterItem, "withHymns")}${getFilterFalsyValue(
        filterItem,
        "manyStories"
      )}${getFilterFalsyValue(
        filterItem,
        "fewStories"
      )}filters[manuscriptCreationDate][gt]=${dateCreationMin}&filters[manuscriptCreationDate][lt]=${dateCreationMax}&${makeParamsArray(
        "lastKnownLocation",
        placeItem
      )}&${makeParamsArray(
        "knownOriginRegion",
        originRegion
      )}filters[manuscriptsWithStoryRange][gt]=${noOfStoriesMin}&filters[manuscriptsWithStoryRange][lt]=${noOfStoriesMax}&filters[manuscriptUniqueStories][gt]=${noOfUniqueMin}&filters[manuscriptUniqueStories][lt]=${noOfUniqueMax}&filters[manuscriptPaintingNumber][gt]=${noOfPaintingMin}&filters[manuscriptPaintingNumber][lt]=${noOfPaintingMax}&sort=${ascDescFil}&filters[search]=${
        searchKey.length > minSearchChar ? searchKey : ""
      }
    `;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts?${params}`
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
    if (isMount1) {
      setPage(1);
      setIsMount(true);
      fetchData(search);
    } else {
      setPage(pageParams);
      getFilterFromParams();
    }
  }, [filterItem, placeItem, originRegion, ascDescFil]);

  useEffect(() => {
    if (isMount1) fetchData(search);
  }, [page]);

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
    setDateCreationMin(rangeSliderMinDateOfCreationManuscriptsPage);
    setDateCreationMax(rangeSliderMaxDateOfCreationManuscriptsPage);
    setNoOfStoriesMin(rangeSliderMinNoOfStoriesManuscriptsPage);
    setNoOfStoriesMax(rangeSliderMaxNoOfStoriesManuscriptsPage);
    setNoOfPaintingMin(rangeSliderMinNoOfPaintingsManuscriptsPage);
    setNoOfPaintingMax(rangeSliderMaxNoOfPaintingsManuscriptsPage);
    setNoOfUniqueMin(rangeSliderMinUniqueStoriesManuscriptsPage);
    setNoOfUniqueMax(rangeSliderMaxUniqueStoriesManuscriptsPage);
    setExpandedRows([]);
    setPage(1);
    setFilterItem(initialfilterItemManuScript(localData));
    setPlaceItem(initialPlaceItemManuScript);
    setOriginRegion(initialOriginRegionManuScript);
    setSearch("");
    setAscDescFil("");
    setSortingRow({});
    router.push(`${pathname}`);
  };

  const setFilterInParams = (key, value, isRemove = false) => {
    if (isRemove || !value) {
      newParams.delete(key);
      replaceState(
        { path: `${pathname}?${newParams.toString()}` },
        "",
        `${pathname}?${newParams.toString()}`
      );
      return;
    }
    if (["lastKnownLocation", "knownOriginRegion"].includes(key)) {
      newParams.append(key, value);
    } else newParams.set(key, value);
    replaceState(
      { path: `${pathname}?${newParams.toString()}` },
      "",
      `${pathname}?${newParams.toString()}`
    );
    // router.push(`${pathname}?${newParams.toString()}`);
  };

  const getFilterFromParams = () => {
    setIsMount1(true);
    const search = params.get("search");
    setSearch(search ? search : "");
    const pageP = params.get("page");
    setPage(pageP > 1 ? pageP : 1);
    const dateCreationMinP = params.get("dateCreationMin");
    const dateCreationMaxP = params.get("dateCreationMax");
    if (dateCreationMinP && dateCreationMaxP) {
      setDateCreationMin(dateCreationMinP);
      setDateCreationMax(dateCreationMaxP);
      childRef1?.current?.set(dateCreationMinP, dateCreationMaxP);
    } else if (dateCreationMinP) {
      setDateCreationMin(dateCreationMinP);
      childRef1?.current?.set(
        dateCreationMinP,
        rangeSliderMaxDateOfCreationManuscriptsPage
      );
    } else if (dateCreationMaxP) {
      setDateCreationMax(dateCreationMaxP);
      childRef1?.current?.set(
        rangeSliderMinDateOfCreationManuscriptsPage,
        dateCreationMaxP
      );
    }
    const noOfStoriesMinP = params.get("noOfStoriesMin");
    const noOfStoriesMaxP = params.get("noOfStoriesMax");
    if (noOfStoriesMinP && noOfStoriesMaxP) {
      setNoOfStoriesMin(noOfStoriesMinP);
      setNoOfStoriesMax(noOfStoriesMaxP);
      childRef2?.current?.set(noOfStoriesMinP, noOfStoriesMaxP);
    } else if (noOfStoriesMinP) {
      setNoOfStoriesMin(noOfStoriesMinP);
      childRef2?.current?.set(
        noOfStoriesMinP,
        rangeSliderMaxNoOfStoriesManuscriptsPage
      );
    } else if (noOfStoriesMaxP) {
      setNoOfStoriesMax(noOfStoriesMaxP);
      childRef2?.current?.set(
        rangeSliderMinNoOfStoriesManuscriptsPage,
        noOfStoriesMaxP
      );
    }
    const noOfPaintingMinP = params.get("noOfPaintingMin");
    const noOfPaintingMaxP = params.get("noOfPaintingMax");
    if (noOfPaintingMinP && noOfPaintingMaxP) {
      setNoOfPaintingMin(noOfPaintingMinP);
      setNoOfPaintingMax(noOfPaintingMaxP);
      childRef3?.current?.set(noOfPaintingMinP, noOfPaintingMaxP);
    } else if (noOfPaintingMinP) {
      setNoOfPaintingMin(noOfPaintingMinP);
      childRef3?.current?.set(
        noOfPaintingMinP,
        rangeSliderMaxNoOfPaintingsManuscriptsPage
      );
    } else if (noOfPaintingMaxP) {
      setNoOfPaintingMax(noOfPaintingMaxP);
      childRef3?.current?.set(
        rangeSliderMinNoOfPaintingsManuscriptsPage,
        noOfPaintingMaxP
      );
    }
    const noOfUniqueMinP = params.get("noOfUniqueMin");
    const noOfUniqueMaxP = params.get("noOfUniqueMax");
    if (noOfUniqueMinP && noOfUniqueMaxP) {
      setNoOfUniqueMin(noOfUniqueMinP);
      setNoOfUniqueMax(noOfUniqueMaxP);
      childRef4?.current?.set(noOfUniqueMinP, noOfUniqueMaxP);
    } else if (noOfUniqueMinP) {
      setNoOfUniqueMin(noOfUniqueMinP);
      childRef4?.current?.set(
        noOfUniqueMinP,
        rangeSliderMaxUniqueStoriesManuscriptsPage
      );
    } else if (noOfUniqueMaxP) {
      setNoOfUniqueMax(noOfUniqueMaxP);
      childRef4?.current?.set(
        rangeSliderMinUniqueStoriesManuscriptsPage,
        noOfUniqueMaxP
      );
    }
    const location = params.getAll("lastKnownLocation");
    const updatedLocation = placeItem.checkItem.map((temp) => {
      return {
        ...temp,
        isChecked: location.includes(temp.name) ? true : false,
      };
    });
    setPlaceItem({ ...placeItem, checkItem: updatedLocation });
    const originalRegion = params.getAll("knownOriginRegion");
    const updatedRegion = originRegion.checkItem.map((temp) => {
      return {
        ...temp,
        isChecked: originalRegion.includes(temp.name) ? true : false,
      };
    });
    setOriginRegion({ ...originRegion, checkItem: updatedRegion });
    const withPaintings = params.get("withPaintings");
    const withOnlineDigitalCopy = params.get("withOnlineDigitalCopy");
    const withColorDigitalCopy = params.get("withColorDigitalCopy");
    const withUniqueStories = params.get("withUniqueStories");
    const oldestManuscript = params.get("oldestManuscript");
    const recentManuscript = params.get("recentManuscript");
    const arabicManuscript = params.get("arabicManuscript");
    const gaazManuscript = params.get("gaazManuscript");
    const royalManuscript = params.get("royalManuscript");
    const withHymns = params.get("withHymns");
    const manyStories = params.get("manyStories");
    const fewStories = params.get("fewStories");
    const printOnly = params.get("printOnly");
    const excludePrintOnly = params.get("excludePrintOnly");
    const newFilterItem = {
      ...filterItem,
      checkItem: {
        ...filterItem.checkItem,
        ["withPaintings"]: {
          ...filterItem.checkItem["withPaintings"],
          isChecked: withPaintings ? true : false,
        },
        ["withOnlineDigitalCopy"]: {
          ...filterItem.checkItem["withOnlineDigitalCopy"],
          isChecked: withOnlineDigitalCopy ? true : false,
        },
        ["withColorDigitalCopy"]: {
          ...filterItem.checkItem["withColorDigitalCopy"],
          isChecked: withColorDigitalCopy ? true : false,
        },
        ["withUniqueStories"]: {
          ...filterItem.checkItem["withUniqueStories"],
          isChecked: withUniqueStories ? true : false,
        },
        ["oldestManuscript"]: {
          ...filterItem.checkItem["oldestManuscript"],
          isChecked: oldestManuscript ? true : false,
        },
        ["recentManuscript"]: {
          ...filterItem.checkItem["recentManuscript"],
          isChecked: recentManuscript ? true : false,
        },
        ["arabicManuscript"]: {
          ...filterItem.checkItem["arabicManuscript"],
          isChecked: arabicManuscript ? true : false,
        },
        ["gaazManuscript"]: {
          ...filterItem.checkItem["gaazManuscript"],
          isChecked: gaazManuscript ? true : false,
        },
        ["royalManuscript"]: {
          ...filterItem.checkItem["royalManuscript"],
          isChecked: royalManuscript ? true : false,
        },
        ["withHymns"]: {
          ...filterItem.checkItem["withHymns"],
          isChecked: withHymns ? true : false,
        },
        ["manyStories"]: {
          ...filterItem.checkItem["manyStories"],
          isChecked: manyStories ? true : false,
        },
        ["fewStories"]: {
          ...filterItem.checkItem["fewStories"],
          isChecked: fewStories ? true : false,
        },
        ["printOnly"]: {
          ...filterItem.checkItem["printOnly"],
          isChecked: printOnly ? true : false,
        },
        ["excludePrintOnly"]: {
          ...filterItem.checkItem["excludePrintOnly"],
          isChecked: excludePrintOnly ? true : false,
        },
      },
    };
    setFilterItem(newFilterItem);
  };

  const downloadPDF = async () => {
    try {
      const params = `${getFilterFalsyValue(
        filterItem,
        "withPaintings"
      )}${getFilterFalsyValue(
        filterItem,
        "withOnlineDigitalCopy"
      )}${getFilterFalsyValue(
        filterItem,
        "withColorDigitalCopy"
      )}${getFilterFalsyValue(
        filterItem,
        "withUniqueStories"
      )}${getFilterFalsyValue(
        filterItem,
        "oldestManuscript"
      )}${getFilterFalsyValue(
        filterItem,
        "recentManuscript"
      )}${getFilterFalsyValue(
        filterItem,
        "arabicManuscript"
      )}${getFilterFalsyValue(
        filterItem,
        "gaazManuscript"
      )}${getFilterFalsyValue(
        filterItem,
        "royalManuscript"
      )}${getFilterFalsyValue(filterItem, "printOnly")}${getFilterFalsyValue(
        filterItem,
        "excludePrintOnly"
      )}${getFilterFalsyValue(filterItem, "withHymns")}${getFilterFalsyValue(
        filterItem,
        "manyStories"
      )}${getFilterFalsyValue(
        filterItem,
        "fewStories"
      )}filters[manuscriptCreationDate][gt]=${dateCreationMin}&filters[manuscriptCreationDate][lt]=${dateCreationMax}&${makeParamsArray(
        "lastKnownLocation",
        placeItem
      )}&${makeParamsArray(
        "knownOriginRegion",
        originRegion
      )}filters[manuscriptsWithStoryRange][gt]=${noOfStoriesMin}&filters[manuscriptsWithStoryRange][lt]=${noOfStoriesMax}&filters[manuscriptUniqueStories][gt]=${noOfUniqueMin}&filters[manuscriptUniqueStories][lt]=${noOfUniqueMax}&filters[manuscriptPaintingNumber][gt]=${noOfPaintingMin}&filters[manuscriptPaintingNumber][lt]=${noOfPaintingMax}&sort=${ascDescFil}&filters[search]=${
        search.length > minSearchChar ? search : ""
      }&language=${lang}
    `;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/csv?${params}`
      );

      const data = await response.json();
      window.open(data.filePath, "_blank");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div
      className={`flex px-4 md:px-5 pb-10 manuscript-page ${
        isOpen ? "shell" : "flex items-start"
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
          className={`manuscript-page font-body bg-primary-500 fixed inset-y-0 p-3 pb-40 pt-0 overflow-y-auto shell__sidebar rounded-sm w-64 text-white ${
            isOpen
              ? "left-0 md:block md:static md:h-auto transition-all "
              : "hidden -left-full transition-all z-10"
          } `}
        >
          <Sidebar
            childRef1={childRef1}
            childRef2={childRef2}
            childRef3={childRef3}
            childRef4={childRef4}
            isPageName={MANUSCRIPTS}
            areaLabel={`${
              isOpen ? "Sidebar filter is expanded" : "Sidebar filter is hidden"
            }`}
            onChangeStory={useCallback(
              (e) => {
                const { min, max } = e;
                setDateCreationMin(min);
                setDateCreationMax(max);
                debouncedFetchData();
                // scrollTop();
              },
              [dateCreationMin, dateCreationMax]
            )}
            onChangeManuscript={useCallback(
              (e) => {
                const { min, max } = e;
                setNoOfStoriesMin(min);
                setNoOfStoriesMax(max);
                debouncedFetchData();
                // scrollTop();
              },
              [noOfStoriesMin, noOfStoriesMax]
            )}
            onChangePainting={useCallback(
              (e) => {
                const { min, max } = e;
                setNoOfPaintingMin(min);
                setNoOfPaintingMax(max);
                debouncedFetchData();
                // scrollTop();
              },
              [noOfPaintingMin, noOfPaintingMax]
            )}
            onChangeUnique={useCallback(
              (e) => {
                const { min, max } = e;
                setNoOfUniqueMin(min);
                setNoOfUniqueMax(max);
                debouncedFetchData();
                // scrollTop();
              },
              [noOfUniqueMin, noOfUniqueMax]
            )}
            filterItem={filterItem}
            setFilterItem={setFilterItem}
            placeItem={placeItem}
            setPlaceItem={setPlaceItem}
            langItem={originRegion}
            setLangItem={setOriginRegion}
            onClick={() => setIsOpen(!isOpen)}
            resetFilter={resetFilter}
          />
        </div>
      </OutsideClickHandler>

      <div className="w-full grid pt-1">
        {!isOpen && (
          // <button
          //   onClick={() => setIsOpen(true)}
          //   className="kwya"
          //   areaLabel={isOpen ? true : false}
          // >
          //   <MdiMenuOpen className="text-primary-500 md:block hidden h-6 w-6" />
          // </button>

          <FilterButton
            // onClick={() => setIsOpen(true)}
            onClick={() => {
              setIsOpen(true);
              setTimeout(function () {
                document.querySelector("#menuClose").focus();
              }, 500);
            }}
            areaLabel={isOpen ? true : false}
            className="text-primary-500 md:block hidden h-6 w-6"
          />
        )}
        {/* <button
          onClick={() => setIsOpen(true)}
          area-label={setIsOpen ? "false" : "true"}
          className="block md:hidden h-6 w-6 text-primary-500"
        >
          <MdiMenuOpen className="text-white-500" />
        </button> */}
        <FilterButton
          onClick={() => setIsOpen(true)}
          areaLabel={isOpen ? false : true}
          className="block md:hidden h-6 w-6 text-primary-500"
        />

        <div className="table-search pt-2 mt-4 flex flex-col font-body items-center justify-between pb-2 sm:grid grid-cols-2 gap-2 sm:mt-0 sm:grid-cols-4 lg:grid-cols-6 lg:gap-0">
          <div className="relative w-full mb-2 lg:mb-0 sm:col-span-4 lg:col-span-2 lg:max-w-4xl">
            <fieldset className="border-2 border-primary-500 bg-transparent focus:bg-transparent active:bg-transparent focus-visible:bg-transparent rounded-md text-primary-500  pl-3">
              <legend>Search manuscript names</legend>
              {/* <InputText
                id="search"
                value={search}
                onChange={(e) => {
                  const query = e.target.value;
                  setSearch(query);
                  if (query.length > minSearchChar) {
                    debouncedFetchData(query);
                  }
                  if (query.length === 0) {
                    debouncedFetchData(query);
                  }
                }}
              /> */}
              <input
                type="text"
                id="search"
                value={search}
                className="bg-transparent border-0 focus:bg-transparent active:bg-transparent focus:ring-0 focus-visible:bg-transparent focus:border-0 rounded-md w-full text-sm md:text-lg ring-0 pt-0 outline-0"
                onChange={(e) => {
                  const query = e.target.value;
                  setSearch(query);
                  if (query.length > minSearchChar) {
                    debouncedFetchData(query);
                  }
                  if (query.length === 0) {
                    debouncedFetchData(query);
                  }
                }}
              />
            </fieldset>
            {/* <label
              htmlFor={"search"}
              className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500"
            >
              Search manuscript names
            </label> */}
          </div>
          <div className="w-full flex items-center justify-between sm:justify-evenly sm:hidden space-x-1">
            {/* Results and total records */}
            <div className="flex items-center justify-between space-x-4">
              <div
                id="announce"
                aria-live="polite"
                results={(() => {
                  totalPage = totalPage ? totalPage : 0;
                  return eval(`\`${localData?.total_records}\``);
                })()}
                className="text-offBlack-400 font-medium pl-2 text-xs xl:text-sm col-span-2 lg:col-span-1 sm:text-center"
              >
                {(() => {
                  totalPage = totalPage ? totalPage : 0;
                  return eval(`\`${localData?.results_total_records}\``);
                })()}
              </div>
              <button
                onClick={downloadPDF}
                disabled={!Boolean(tableData.length > 0)}
                className={` ${
                  Boolean(tableData.length > 0)
                    ? "border-primary-600 text-primary-600 hover:text-offWhite-500 hover:bg-primary-600 "
                    : " text-gray-400 border-gray-400 cursor-not-allowed"
                } p-1  transition-colors border-2 rounded-md duration-300 hover:duration-300 hover:transition-colors`}
              >
                <HeroiconsArrowDownTray20Solid className="h-5 w-5" />
              </button>
            </div>
            {/* Button title view */}
            <button
              className={`bg-primary-500 text-white max-w-fit w-auto px-2 py-2 ${
                toggleBtn ? "md:py-2" : "md:py-2"
              } font-medium text-xs md:px-3 md:text-sm rounded-md lg:hover:text-primary-500 lg:hover:bg-transparent lg:hover:border-primary-500 border-2 border-primary-500 transition-colors lg:hover:transition-colors`}
              onClick={() => {
                setToggleBtn(!toggleBtn);
                {
                  !toggleBtn
                    ? setTableHeader(manuscriptsTableDetailView)
                    : setTableHeader(manuscriptsTableTitleView);
                }
              }}
            >
              {toggleBtn ? localData?.detail_view : localData?.title_view}
            </button>
          </div>
          <div className="order-3 sm:-order-none mt-4 sm:mt-0  sm:col-span-2">
            <CustomPagination
              className="pagination-tablet"
              currentPage={+page}
              totalPages={Math.ceil(totalPage / perPage)}
              onPageChange={(num) => {
                setPage(num);
                setExpandedRows([]);
              }}
            />
          </div>

          <div className="hidden w-full mt-2 sm:mt-0 items-center justify-evenly gap-3 text-sm sm:flex 2xl:text-base">
            <div
              id="announce"
              aria-live="polite"
              results={`${totalPage ? totalPage : 0} records`}
              className="hidden font-body sm:block xl:text-sm lg:col-span-1 text-offBlack-400 font-medium pl-1 text-xs 
          sm:text-center"
            >
              Results: {`(${totalPage ? totalPage : 0} records)`}
            </div>
            <button
              onClick={downloadPDF}
              disabled={!Boolean(tableData.length > 0)}
              className={` ${
                Boolean(tableData.length > 0)
                  ? "border-primary-600 text-primary-600 hover:text-offWhite-500 hover:bg-primary-600 "
                  : "text-gray-400 border-gray-400 cursor-not-allowed"
              } p-1  transition-colors border-2 rounded-md duration-300 hover:duration-300  hover:transition-colors`}
            >
              <HeroiconsArrowDownTray20Solid className="h-5 w-5" />
            </button>
          </div>
          <button
            className={`hidden bg-primary-500 text-white max-w-fit w-auto px-2 tracking-wide py-2 ml-auto sm:block ${
              toggleBtn ? " md:px-3" : "md:px-4"
            } font-medium border-2 border-primary-500 text-xs rounded-md md:text-sm lg:hover:text-primary-500 lg:hover:bg-transparent lg:hover:border-primary-500 
               transition-colors lg:hover:transition-colors`}
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
        {/* <div
          className={`w-full h-screen ${
            tableData?.length ? "h-screen" : "h-auto block"
          } `}
        > */}
        <Table
          search={search}
          isPageName={MANUSCRIPTS}
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
          // onPageChange={(num) => {
          //   setPage(num);
          // }}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          setAscDescFil={setAscDescFil}
          ascDescFil={ascDescFil}
          sortingRow={sortingRow}
          setSortingRow={setSortingRow}
          lang={lang}
        />
        {Boolean(!tableData?.length) && (
          <div className="flex items-center justify-center w-full text-2xl text-primary-500 font-bold">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <h1 className="py-20">Records Not Found</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManuScripts;
