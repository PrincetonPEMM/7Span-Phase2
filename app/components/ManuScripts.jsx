"use client";
import React, { useCallback, useEffect, useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";
import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import OutsideClickHandler from "react-outside-click-handler";
import {
  initialPlaceItemManuScript,
  manuscriptsTableDetailView,
  manuscriptsTableTitleView,
  pagePerLimit,
  initialfilterItemManuScript,
  MANUSCRIPTS,
  initialOriginRegionManuScript,
  rangeSliderMinDateOfCreationManuscriptsPage,
  rangeSliderMaxDateOfCreationManuscriptsPage,
  rangeSliderMinNoOfStoriesManuscriptsPage,
  rangeSliderMaxNoOfStoriesManuscriptsPage,
  rangeSliderMinNoOfPaintingsManuscriptsPage,
  rangeSliderMaxNoOfPaintingsManuscriptsPage,
  rangeSliderMinUniqueStoriesManuscriptsPage,
  rangeSliderMaxUniqueStoriesManuscriptsPage,
} from "@/utils/constant";
import useDebounce from "@/utils/useDebounce";
import CustomPagination, { TablePagination } from "./Pagination";

const ManuScripts = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const { debounce } = useDebounce();
  const [isLoading, setIsLoadint] = useState(true);
  const [search, setSearch] = useState("");
  const [isMount, setIsMount] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [filterItem, setFilterItem] = useState(initialfilterItemManuScript);
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

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimit);
  const [totalPage, setTotalPage] = useState();
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState(manuscriptsTableTitleView);
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
      )}filters[manuscriptCreationDate][gt]=${dateCreationMin}&filters[manuscriptCreationDate][lt]=${dateCreationMax}&${makeParamsArray(
        "lastKnownLocation",
        placeItem
      )}&${makeParamsArray(
        "knownOriginRegion",
        originRegion
      )}filters[manuscriptsWithStoryRange][gt]=${noOfStoriesMin}&filters[manuscriptsWithStoryRange][lt]=${noOfStoriesMax}&filters[manuscriptUniqueStories][gt]=${noOfUniqueMin}&filters[manuscriptUniqueStories][lt]=${noOfUniqueMax}&filters[manuscriptPaintingNumber][gt]=${noOfPaintingMin}&filters[manuscriptPaintingNumber][lt]=${noOfPaintingMax}&filters[search]=${searchKey}
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
    fetchData(search);
    setPage(1);
  }, [filterItem, placeItem, originRegion]);

  useEffect(() => {
    fetchData(search);
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
    setIsMount(true);
  };

  const debouncedFetchData = debounce((e) => {
    fetchData(e);
    setPage(1);
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
    setFilterItem(initialfilterItemManuScript);
    setPlaceItem(initialPlaceItemManuScript);
    setOriginRegion(initialOriginRegionManuScript);
    setSearch("");
    // setToggleBtn(false);
    // setTableHeader()
    fetchData("");
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
          className={`manuscript-page font-menu bg-primary-500 fixed inset-y-0 p-3 pt-0 overflow-y-auto shell__sidebar rounded-sm w-64 text-white ${
            isOpen
              ? "left-0 md:block md:static md:h-auto transition-all "
              : "hidden -left-full transition-all z-10"
          } `}
        >
          <Sidebar
            isPageName={MANUSCRIPTS}
            onChangeStory={useCallback(
              (e) => {
                const { min, max } = e;
                setDateCreationMin(min);
                setDateCreationMax(max);
                debouncedFetchData();
                scrollTop();
              },
              [dateCreationMin, dateCreationMax]
            )}
            onChangeManuscript={useCallback(
              (e) => {
                const { min, max } = e;
                setNoOfStoriesMin(min);
                setNoOfStoriesMax(max);
                debouncedFetchData();
                scrollTop();
              },
              [noOfStoriesMin, noOfStoriesMax]
            )}
            onChangePainting={useCallback(
              (e) => {
                const { min, max } = e;
                setNoOfPaintingMin(min);
                setNoOfPaintingMax(max);
                debouncedFetchData();
                scrollTop();
              },
              [noOfPaintingMin, noOfPaintingMax]
            )}
            onChangeUnique={useCallback(
              (e) => {
                const { min, max } = e;
                setNoOfUniqueMin(min);
                setNoOfUniqueMax(max);
                debouncedFetchData();
                scrollTop();
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
              Search manuscript names
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
            <p className="text-offBlack-400 font-medium pl-1 text-xs xl:text-sm lg:col-span-1 sm:text-center">
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
          <p className="hidden text-offBlack-400 font-medium pl-2 text-xs sm:text-center sm:block xl:text-sm lg:col-span-1">
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
                    ? setTableHeader(manuscriptsTableDetailView)
                    : setTableHeader(manuscriptsTableTitleView);
                }
              }}
            >
              {toggleBtn ? "Detail view" : "Title View"}
            </button>
          </div>
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
        />
        {Boolean(!tableData?.length) && (
          <div className="flex items-center justify-center  w-full text-2xl text-primary-500 font-bold">
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default ManuScripts;
