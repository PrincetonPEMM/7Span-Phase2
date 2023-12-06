"use client";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import InputText from "./form/InputText";
import PaintingCard from "./PaintingCard";
import Dropdown from "./Dropdown";
import {
  breakpointColumnsForMasonry,
  pagePerLimitForPainting,
} from "@/utils/constant";
import CustomPagination from "./Pagination";
import useDebounce from "@/utils/useDebounce";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import Masonry from "react-masonry-css";
import OutsideClickHandler from "react-outside-click-handler";
import MdiClose from "@/assets/icons/MdiClose";
import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./form/FilterButton";

let mounted = false;
const paintingBy = [
  {
    value: "Paintings by Story",
    key: "/paintings/by-story",
  },
  {
    value: "Paintings by Manuscript",
    key: "/paintings/by-manuscript",
  },
];

const Paintings = ({
  dateOfPainting,
  paintingInColor,
  typeOfStory,
  institution,
}) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const newParams = new URLSearchParams();

  const {
    search: searchParams,
    pageP: pageParams,
    newDatePainting,
    newPaintingInColor,
    newTypeOfStory,
    newInstitution,
  } = getFilterFromParams();
  const [page, setPage] = useState(pageParams ?? 1);
  const { debounce } = useDebounce();
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [search, setSearch] = useState(searchParams ?? "");
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateOfPaintins, setDateOfPaintins] = useState(newDatePainting ?? []);
  const [paintingsInColorOnly, setPaintingsInColorOnly] = useState(
    newPaintingInColor ?? []
  );
  const [storyType, setStoryType] = useState(newTypeOfStory);
  const [archiveOfPainting, setArchiveOfPainting] = useState(newInstitution);

  const makeParamsArray = (key, arr) => {
    if (arr.length)
      if (key === "dateOfPainting")
        return arr
          .map((itm) => {
            setFilterInParams(key, itm.key, false);
            return `filters[${key}][]=${itm.key}&`;
          })
          .join("");
      else
        return arr
          .map((itm) => {
            setFilterInParams(key, itm.key, false);
            return `filters[${key}]=${itm.key}&`;
          })
          .join("");
    return "";
  };

  const fetchData = async (searchKey = search) => {
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

    setLoading(true);
    try {
      const params = `page=${page}&perPage=${perPage}&${makeParamsArray(
        "dateOfPainting",
        dateOfPaintins
      )}${makeParamsArray(
        "paintingInColor",
        paintingsInColorOnly
      )}${makeParamsArray(
        "typeOfStory",
        Boolean(storyType) ? [storyType] : []
      )}${makeParamsArray(
        "institution",
        Boolean(archiveOfPainting) ? [archiveOfPainting] : []
      )}filters[search]=${searchKey.length > 3 ? searchKey : ""}`;

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
    fetchData();
  }, [page]);

  useEffect(() => {
    if (!mounted) return;
    setPage(1);
    fetchData(search);
  }, [dateOfPaintins, paintingsInColorOnly, storyType, archiveOfPainting]);

  const debouncedFetchData = debounce((e) => {
    fetchData(e);
    setPage(1);
  }, 300);

  const [menuCollapse, setMenuCollapse] = useState(false);

  useEffect(() => {
    if (menuCollapse) {
      document.body.classList.add("sidebar_open");
      document.body.classList.remove("sidebar_close");
      document.body.classList.remove("filter_open");
      document.body.classList.remove("filter_close");
    } else {
      document.body.classList.add("sidebar_close");
      document.body.classList.remove("sidebar_open");
      document.body.classList.remove("filter_open");
      document.body.classList.remove("filter_close");
    }
    mounted = true;
  }, [menuCollapse]);

  const setFilterInParams = (key, value, isRemove = false) => {
    if (isRemove || !value) {
      newParams.delete(key);
      router.push(`${pathname}?${newParams.toString()}`);
      return;
    }
    if (["dateOfPainting", "paintingInColor"].includes(key)) {
      newParams.append(key, value);
    } else newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  function getFilterFromParams() {
    const search = params.get("search");
    const pageP = params.get("page");
    const datePainting = params.getAll("dateOfPainting");
    const newDatePainting = dateOfPainting.filter((dop) =>
      datePainting.includes(dop.key)
    );

    const paintingColor = params.getAll("paintingInColor");
    const newPaintingInColor = paintingInColor.filter((dop) =>
      paintingColor.includes(dop.key)
    );

    const typeStory = params.get("typeOfStory");
    const newTypeOfStory = typeOfStory.filter((dop) =>
      [typeStory].includes(dop.key)
    );

    const inst = params.get("institution");
    const newInstitution = institution.filter((dop) =>
      [inst].includes(dop.key)
    );
    return {
      search,
      pageP,
      newDatePainting,
      newPaintingInColor,
      newTypeOfStory: newTypeOfStory[0],
      newInstitution: newInstitution[0],
    };
  }

  return (
    <>
      {" "}
      <div className="px-4 md:px-5">
        {/* <button
          onClick={() => {
            setMenuCollapse(!menuCollapse);
          }}
          className="block h-7 w-7 flex-none p-1 z-40  lg:hidden"
        >
          <MdiMenuOpen className="text-primary-500" />
        </button> */}
        <FilterButton
          onClick={() => {
            setMenuCollapse(!menuCollapse);
          }}
          area-label={menuCollapse ? false : true}
          className="block h-7 w-7 flex-none p-1 z-40 text-primary-500 lg:hidden"
        ></FilterButton>
        {/* sidebar filter start  */}
        {menuCollapse && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setMenuCollapse(false);
            }}
          >
            <div
              className={`z-50 justify-between bg-offWhite-500 items-center p-6 inset-y-0 w-80 right-auto fixed transition-transform duration-700  ${
                menuCollapse
                  ? "open -translate-x-5  transform"
                  : "-translate-x-96 close transform"
              } `}
            >
              <button
                className="text-right block "
                onClick={() => {
                  setMenuCollapse(!menuCollapse);
                }}
                area-label={menuCollapse ? "true" : "false"}
              >
                <MdiClose />
              </button>
              <div className="text-lg p-1 font-semibold space-y-4 mt-4">
                <div>
                  <Dropdown
                    title="Date of Paintings"
                    selected={dateOfPaintins}
                    setSelected={(e) => {
                      setDateOfPaintins(e);
                      setTimeout(() => {
                        setMenuCollapse(false);
                      }, 5000);
                    }}
                    options={dateOfPainting}
                    isMultiple={true}
                  />
                </div>
                <div>
                  <Dropdown
                    title="Digital Quality"
                    selected={paintingsInColorOnly}
                    setSelected={(e) => {
                      if (e.length > 2) {
                        setPaintingsInColorOnly([
                          e[e.length - 2],
                          e[e.length - 1],
                        ]);
                      } else {
                        setPaintingsInColorOnly(e);
                      }
                      setTimeout(() => {
                        setMenuCollapse(false);
                      }, 5000);
                    }}
                    options={paintingInColor}
                    isMultiple={true}
                  />
                </div>
                <div>
                  <Dropdown
                    title="Story Type"
                    selected={storyType}
                    setSelected={(e) => {
                      setStoryType(e);
                      setTimeout(() => {
                        setMenuCollapse(false);
                      }, 5000);
                    }}
                    options={typeOfStory}
                    isMultiple={false}
                  />
                </div>
                <div>
                  <Dropdown
                    title="Repository of Painting"
                    selected={archiveOfPainting}
                    setSelected={(e) => {
                      setArchiveOfPainting(e);
                      setTimeout(() => {
                        setMenuCollapse(false);
                      }, 5000);
                    }}
                    options={institution}
                    isMultiple={false}
                  />
                </div>
                <div className="text-center w-full md:text-left">
                  <button
                    area-label="clear all selected values"
                    className="bg-primary-500 w-full text-white px-2 py-1.5 hover:text-primary-500 text-center border border-primary-500 rounded-lg text-xs md:text-sm hover:bg-transparent transition-colors"
                    onClick={() => {
                      setDateOfPaintins([]);
                      setPaintingsInColorOnly([]);
                      setStoryType(null);
                      setArchiveOfPainting(null);
                      setPage(1);
                      setSearch("");
                      setTimeout(() => {
                        setMenuCollapse(false);
                      }, 5000);
                      router.push(`${pathname}`);
                    }}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </OutsideClickHandler>
        )}
        {/* sidebar filter ENd  */}
        <div className="md:sticky bg-offWhite-500 z-10 py-4 top-0">
          <div className="mx-auto sm:grid pt-4 sm:grid-cols-4 font-body lg:grid-cols-6 gap-2 items-center justify-start mb-3">
            <div className="relative w-full sm:col-span-4 md:max-w-4xl lg:col-span-2">
              <label
                htmlFor="SearchTitles"
                className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500"
              >
                Search titles and painting descriptions
              </label>
              <InputText
                id="SearchTitles"
                value={search}
                aria-label="Search here titles and painting descriptions"
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
            <div className="col-span-2 lg:col-span-2 grid font-body justify-items-center items-center sm:justify-items-start lg:justify-items-center pt-3 md:pt-0">
              <CustomPagination
                className="pagination-tablet"
                currentPage={page}
                totalPages={Math.ceil(totalPage / perPage)}
                onPageChange={(num) => {
                  setPage(num);
                }}
              />
            </div>
            <div className="lg:col-span-1 my-3 sm:my-0">
              <div
                id="announce"
                aria-live="polite"
                results={`${totalPage ? totalPage : 0} records`}
                className="text-offBlack-400 text-center font-medium font-body pl-2 text-xs sm:text-center xl:text-sm"
              >
                Results: ({totalPage ? totalPage : 0} records)
              </div>
            </div>
            <div className="lg:col-span-1">
              <Dropdown
                title="All Paintings"
                options={paintingBy}
                isMultiple={false}
                isRedirection={true}
              />
            </div>
          </div>
          <div className="mb-1 font-body lg:mx-auto lg:justify-normal">
            <div className="grid gap-2 grid-cols-1 justify-between mb-1 font-body lg:justify-between sm:grid-cols-4 lg:grid-cols-9">
              <div className="lg:col-span-2 hidden lg:block">
                <Dropdown
                  title="Date of Paintings"
                  selected={dateOfPaintins}
                  setSelected={useCallback(
                    (e) => {
                      setDateOfPaintins(e);
                    },
                    [dateOfPaintins]
                  )}
                  options={dateOfPainting}
                  isMultiple={true}
                />
              </div>
              <div className="sm:col-span-2 font-body hidden lg:block">
                <Dropdown
                  title="Digital Quality"
                  selected={paintingsInColorOnly}
                  setSelected={(e) => {
                    if (e.length > 2) {
                      setPaintingsInColorOnly([
                        e[e.length - 2],
                        e[e.length - 1],
                      ]);
                    } else {
                      setPaintingsInColorOnly(e);
                    }
                  }}
                  options={paintingInColor}
                  isMultiple={true}
                />
              </div>
              <div className="sm:col-span-2 font-body hidden lg:block">
                <Dropdown
                  title="Story Type"
                  selected={storyType}
                  setSelected={setStoryType}
                  options={typeOfStory}
                  isMultiple={false}
                />
              </div>
              <div className="sm:col-span-2 font-body hidden lg:block ">
                <Dropdown
                  title="Repository of Painting"
                  selected={archiveOfPainting}
                  setSelected={setArchiveOfPainting}
                  options={institution}
                  isMultiple={false}
                />
              </div>
              <div className="text-center w-full md:text-left hidden lg:block">
                <button
                  area-label="clear all selected values"
                  className="bg-primary-500 w-full text-white px-2 py-2 hover:text-primary-500 text-center border border-primary-500 rounded-lg text-xs md:text-sm hover:bg-transparent transition-colors"
                  onClick={() => {
                    setDateOfPaintins([]);
                    setPaintingsInColorOnly([]);
                    setStoryType(null);
                    setArchiveOfPainting(null);
                    setPage(1);
                    setSearch("");
                    router.push(`${pathname}`);
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10 mt-10">
          {data?.length ? (
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
              <div className="flex items-center py-36 justify-center font-body w-full text-2xl text-primary-500 font-bold">
                {loading ? <h1>Loading...</h1> : <h1>Records Not Found</h1>}
              </div>
            )
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
      </div>
    </>
  );
};

export default Paintings;
