"use client";
import React, { useCallback, useEffect, useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";
import { Pagination } from "./Pagination";
import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import {
  initialPlaceItemManuScript,
  manuscriptsTableDetailView,
  manuscriptsTableTitleView,
  pagePerLimit,
  initialfilterItemManuScript,
  MANUSCRIPTS,
  initialOriginRegionManuScript,
} from "@/utils/constant";
import useDebounce from "@/utils/useDebounce";

const ManuScripts = () => {
  const { debounce } = useDebounce();
  const [search, setSearch] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const [filterItem, setFilterItem] = useState(initialfilterItemManuScript);
  const [placeItem, setPlaceItem] = useState(initialPlaceItemManuScript);
  const [originRegion, setOriginRegion] = useState(
    initialOriginRegionManuScript
  );
  const [dateCreationMin, setDateCreationMin] = useState(0);
  const [dateCreationMax, setDateCreationMax] = useState(100);
  const [noOfStoriesMin, setNoOfStoriesMin] = useState(0);
  const [noOfStoriesMax, setNoOfStoriesMax] = useState(100);
  const [noOfPaintingMin, setNoOfPaintingMin] = useState(0);
  const [noOfPaintingMax, setNoOfPaintingMax] = useState(100);
  const [noOfUniqueMin, setNoOfUniqueMin] = useState(0);
  const [noOfUniqueMax, setNoOfUniqueMax] = useState(100);
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

  async function fetchData() {
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
      "arabicAndGaazManuscript"
    )}filters[manuscriptCreationDate][gt]=${dateCreationMin}&filters[manuscriptCreationDate][lt]=${dateCreationMax}&${makeParamsArray(
      "lastKnownLocation",
      placeItem
    )}&${makeParamsArray(
      "knownOriginRegion",
      originRegion
    )}filters[manuscriptsWithStoryRange][gt]=${noOfStoriesMin}&filters[manuscriptsWithStoryRange][lt]=${noOfStoriesMax}&filters[manuscriptUniqueStories][gt]=${noOfUniqueMin}&filters[manuscriptUniqueStories][lt]=${noOfUniqueMax}&filters[manuscriptPaintingNumber][gt]=${noOfPaintingMin}&filters[manuscriptPaintingNumber][lt]=${noOfPaintingMax}&filters[search]=${search}
    `;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts?${params}`
    );

    const data = await response.json();
    setTotalPage(data.total);
    setTableData(data.data);
  }
  useEffect(() => {
    fetchData();
  }, [filterItem, placeItem, originRegion, page]);

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
    <div className={`flex px-1 md:px-5 pb-10 ${isOpen ? "shell" : "flex"}`}>
      <div
        className={`font-menu bg-primary-500 h-full absolute shell__sidebar rounded-sm w-64 text-white p-2 ${
          isOpen
            ? "left-0 z-20 md:block md:static lg:h-full transition-all"
            : "hidden -left-full transition-all"
        } `}
      >
        <Sidebar
          isPageName={MANUSCRIPTS}
          onChangeStory={useCallback(
            (e) => {
              const { min, max } = e;
              setDateCreationMin(min);
              setDateCreationMax(max);
              debouncedFetchData(min);
              debouncedFetchData(max);
            },
            [dateCreationMin, dateCreationMax]
          )}
          onChangeManuscript={useCallback(
            (e) => {
              const { min, max } = e;
              setNoOfStoriesMin(min);
              setNoOfStoriesMax(max);
              debouncedFetchData(min);
              debouncedFetchData(max);
            },
            [noOfStoriesMin, noOfStoriesMax]
          )}
          onChangePainting={useCallback(
            (e) => {
              const { min, max } = e;
              setNoOfPaintingMin(min);
              setNoOfPaintingMax(max);
              debouncedFetchData(min);
              debouncedFetchData(max);
            },
            [noOfPaintingMin, noOfPaintingMax]
          )}
          onChangeUnique={useCallback(
            (e) => {
              const { min, max } = e;
              setNoOfUniqueMin(min);
              setNoOfUniqueMax(max);
              debouncedFetchData(min);
              debouncedFetchData(max);
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
                const query = e.target.value;
                setSearch(query);
                debouncedFetchData(query);
              }}
            />
          </div>
          <button
            className="bg-primary-500 text-white max-w-fit ml-auto w-auto px-2 py-4 md:py-4 md:px-4 text-xs md:text-sm rounded-md uppercase"
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
        <div className=" w-full">
          <Table
            isPageName={MANUSCRIPTS}
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
          isOpen={isOpen}
          onPageChange={(e) => {
            setPage(e.selected + 1);
          }}
        />
      </div>
    </div>
  );
};

export default ManuScripts;