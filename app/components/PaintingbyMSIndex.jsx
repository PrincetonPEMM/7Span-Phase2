"use client";
import PaintingStoryCard from "@/app/components/PaintingStoryCard";
import {
  breakpointColumnsForMasonry,
  minSearchChar,
  pagePerLimitForPainting,
} from "@/utils/constant";
import React, { useCallback, useEffect, useState } from "react";
import CustomPagination, { TablePagination } from "./Pagination";
import Masonry from "react-masonry-css";
import InputText from "./form/InputText";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import useDebounce from "@/utils/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dropdown from "./Dropdown";
import OutsideClickHandler from "react-outside-click-handler";
import MdiClose from "@/assets/icons/MdiClose";
import FilterButton from "./form/FilterButton";

const paintingBy = [
  {
    value: "All Paintings",
    key: "/paintings",
  },
  {
    value: "Paintings by Story",
    key: "/paintings/by-story",
  },
];

const PaintingbyMSIndex = ({
  list,
  dateOfPainting,
  paintingInColor,
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
    newInstitution,
  } = getFilterFromParams();
  const { debounce } = useDebounce();
  const [isLoading, setIsLoadint] = useState(true);
  const [page, setPage] = useState(pageParams);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(searchParams);
  const [dateOfPaintins, setDateOfPaintins] = useState(newDatePainting ?? []);
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [paintingsInColorOnly, setPaintingsInColorOnly] = useState(
    newPaintingInColor ?? []
  );
  const [archiveOfPainting, setArchiveOfPainting] = useState(newInstitution);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setData(list?.data);
    setTotalPage(list?.total);
  }, []);

  function getFilterFromParams() {
    const search = params.get("search");
    const pageP = params.get("page");
    const dateOfManuscript = params.getAll("dateOfManuscript");
    const newDatePainting = dateOfPainting.filter((dop) =>
      dateOfManuscript.includes(dop.key)
    );

    const paintingColor = params.getAll("paintingInColor");
    const newPaintingInColor = paintingInColor.filter((dop) =>
      paintingColor.includes(dop.key)
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
      newInstitution: newInstitution[0],
    };
  }

  const makeParamsArray = (key, arr) => {
    if (arr.length)
      if (key === "dateOfManuscript")
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

  const fetchData = (searchKey = search) => {
    setIsLoadint(true);
    if (searchKey?.length > 3) {
      setFilterInParams("search", searchKey, false);
    }
    if (searchKey?.length === 0) {
      setFilterInParams("search", searchKey, true);
    }

    if (page !== 1) {
      setFilterInParams("page", page, false);
    } else {
      setFilterInParams("page", page, true);
    }
    fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-manuscript?page=${
        page ? page : 1
      }&perPage=${perPage}&${makeParamsArray(
        "dateOfManuscript",
        dateOfPaintins
      )}${makeParamsArray(
        "paintingInColor",
        paintingsInColorOnly
      )}${makeParamsArray(
        "institution",
        Boolean(archiveOfPainting) ? [archiveOfPainting] : []
      )}filters[search]=${searchKey?.length > 3 ? searchKey : ""}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setTotalPage(data.total);
        setIsLoadint(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setIsLoadint(false);
      });
  };

  useEffect(() => {
    fetchData(search);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    if (!mount) return;
    setPage(1);
    fetchData(search);
  }, [dateOfPaintins, paintingsInColorOnly, archiveOfPainting]);

  const debouncedFetchData = debounce((e) => {
    fetchData(e);
    setPage(1);
  }, 300);

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
    setMount(true);
  }, [menuCollapse]);

  const setFilterInParams = (key, value, isRemove = false) => {
    if (isRemove || !value) {
      newParams.delete(key);
      router.push(`${pathname}?${newParams.toString()}`);
      return;
    }
    if (["dateOfManuscript", "paintingInColor"].includes(key)) {
      newParams.append(key, value);
    } else newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <>
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
                title="Date of Manuscript"
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
                    setPaintingsInColorOnly([e[e.length - 2], e[e.length - 1]]);
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
                title="Repository of Manuscript"
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
                className="bg-primary-500 w-full text-white px-2 py-1.5 hover:text-primary-500 text-center border border-primary-500 rounded-md text-xs md:text-sm hover:bg-transparent transition-colors"
                onClick={() => {
                  setDateOfPaintins([]);
                  setPaintingsInColorOnly([]);
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
      <FilterButton
        onClick={() => {
          setMenuCollapse(!menuCollapse);
        }}
        areaLabel={menuCollapse ? false : true}
        className="block h-7 w-7 flex-none p-1 z-40 text-primary-500 lg:hidden"
      />
      <div className="container-fluid py-5 lg:py-10">
        <div className="mb-10 items-start space-x-4 sticky top-0 bg-offWhite-500 z-10 py-3 lg:space-x-0">
          <div className="mx-auto sm:grid pt-4 sm:grid-cols-4 font-body lg:grid-cols-6 gap-2 items-center justify-start mb-3">
            <div className="relative w-full sm:col-span-4 md:max-w-4xl lg:col-span-2">
              <label
                htmlFor="search painting by manuscript"
                className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500 tagline"
              >
                Search manuscript name and painting descriptions
              </label>
              <InputText
                id="search painting by manuscript"
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
                currentPage={+page}
                totalPages={Math.ceil(totalPage / perPage)}
                onPageChange={(num) => {
                  setPage(num);
                }}
              />
            </div>
            <p className="lg:col-span-1 my-3 sm:my-0">
              <div
                id="announce"
                aria-live="polite"
                results={`${totalPage ? totalPage : 0} records`}
                className="text-offBlack-400 text-center font-medium font-body pl-2 text-xs sm:text-center xl:text-sm"
              >
                Results: ({totalPage ? totalPage : 0} records)
              </div>
            </p>
            <div className="lg:col-span-1">
              <Dropdown
                title="Paintings by Manuscript"
                options={paintingBy}
                isMultiple={false}
                isRedirection={true}
              />
            </div>
          </div>
          <div className="mb-1 font-body lg:justify-normal">
            <div
              className="grid gap-2 grid-cols-1 justify-between mb-1 font-body lg:justify-between sm:grid-cols-4 lg:grid-cols-4
            "
            >
              <div className="hidden lg:block">
                <Dropdown
                  title="Date of Manuscript"
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
              <div className="font-body hidden lg:block">
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
              <div className="font-body hidden lg:block ">
                <Dropdown
                  title="Repository of Manuscript"
                  selected={archiveOfPainting}
                  setSelected={setArchiveOfPainting}
                  options={institution}
                  isMultiple={false}
                />
              </div>
              <div className="text-center w-full md:text-left hidden lg:block">
                <button
                  area-label="clear all selected values"
                  className="bg-primary-500 w-full text-white px-2 py-[7px] hover:text-primary-500 text-center border border-primary-500 rounded-lg text-xs md:text-sm hover:bg-transparent transition-colors"
                  onClick={() => {
                    setDateOfPaintins([]);
                    setPaintingsInColorOnly([]);
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
          {/* <p id="announce"
              aria-live="polite"
              results={`${totalPage ? totalPage : 0} records`} className="hidden text-offBlack-400  font-medium pl-2 text-xs sm:text-center sm:block xl:text-sm lg:col-span-1">
            Results: {`(${totalPage ? totalPage : 0} records)`}
          </p>

          <div className="order-3 sm:-order-none mt-4  sm:mt-0 lg:col-span-2">
            <CustomPagination
              className="pagination-tablet"
              currentPage={+page}
              totalPages={Math.ceil(totalPage / perPage)}
              onPageChange={(num) => {
                setPage(num);
              }}
            />
          </div>
        </div> */}
        </div>
        <Masonry
          breakpointCols={breakpointColumnsForMasonry}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data?.map((item, index) => (
            <div
              key={item.image_link + index}
              className={`rounded-lg text-offWhite-500 font-body mb-4 mx-auto  inline-block relative overflow-hidden w-full`}
            >
              <PaintingStoryCard
                key={item.image_link + index}
                image={item.image_link}
                title={item?.manuscript_full_name}
                content={`${
                  item?.manuscript_date_range_start &&
                  item?.manuscript_date_range_end
                    ? item.manuscript_date_range_start ===
                      item.manuscript_date_range_end
                      ? item.manuscript_date_range_start + "s"
                      : item.manuscript_date_range_start +
                        "-" +
                        item.manuscript_date_range_end
                    : "-"
                }`}
                //   desc={`
                // ${
                //   item.total_manuscript_paintings > 1
                //     ? `${item.total_manuscript_paintings} paintings `
                //     : `${item.total_manuscript_paintings} painting `
                // }
                // in ${
                //   item.scans_of_manuscript_in_color === "Yes"
                //     ? "color"
                //     : "black & white"
                // }`}
                btnText={`View all ${
                  item.total_manuscript_paintings > 1
                    ? `${item.total_manuscript_paintings} paintings `
                    : `${item.total_manuscript_paintings} painting `
                } in ${
                  item.scans_of_manuscript_in_color === "Yes"
                    ? "color"
                    : "black & white"
                } for this manuscript`}
                btnLink={`/paintings/by-manuscript/${item.web_page_address}`}
              />
            </div>
          ))}
        </Masonry>
        {Boolean(!data?.length) && (
          <div className="flex items-center py-36 justify-center  w-full text-2xl text-primary-500 font-bold">
            {isLoading ? <h1>Loading...</h1> : <h1>Records Not Found</h1>}
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
    </>
  );
};

export default PaintingbyMSIndex;
