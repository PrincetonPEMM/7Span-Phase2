"use client";
import InputText from "@/app/components/form/InputText";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import { Line } from "rc-progress";
import React, { useEffect, useState } from "react";
import CustomPagination from "@/app/components/Pagination";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { minSearchChar } from "@/utils/constant";

const perPage = 10;

const page = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const newParams = new URLSearchParams();
  const searchp = params.get("search");
  const pageP = params.get("page");
  const [page, setPage] = useState(pageP ?? 1);
  const [search, setSearch] = useState(searchp ?? ""); // 'ብእሲ፡'
  const [totalPage, setTotalPage] = useState(0);
  const [maxRecord, setMaxRecord] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const fetchData = (searchData = search) => {
    setIsLoading(true);

    if (searchData.length > minSearchChar) {
      setFilterInParams("search", searchData, false);
    }
    if (searchData.length === 0) {
      setFilterInParams("search", searchData, true);
    }

    if (page !== 1) {
      setFilterInParams("page", page, false);
    } else {
      setFilterInParams("page", page, true);
    }
    fetch(
      `${
        process.env.NEXT_PUBLIC_DIRECTUS_URL
      }incipit-tool?search=${searchData}&page=${
        page ? page : 1
      }&perPage=${perPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setMaxRecord(data.maxScore);
        setTotalPage(data.total);
        setTableData(data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isMount) fetchData();
    else setIsMount(true);
  }, [page]);

  const setFilterInParams = (key, value, isRemove = false) => {
    if (isRemove || !value) {
      newParams.delete(key);
      router.push(`${pathname}?${newParams.toString()}`);
      return;
    }
    newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="container space-y-10 py-10">
      <h1 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
        Incipit Search
      </h1>
      <div className=" justify-between flex-wrap items-center  sm:flex sm:space-y-0 sm:justify-center sm:space-x-4">
        <div className="relative w-full sm:col-span-4 mb-4 sm:mb-0 sm:max-w-[50%] lg:max-w-[75%]">
          <label
            htmlFor="searchtitles"
            className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500"
          >
            Type to search
          </label>
          <InputText
            id="searchtitles"
            aria-label="Search here titles and painting descriptions"
            value={search}
            onChange={(e) => {
              const query = e.target.value;
              setSearch(query);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setIsFirstTime(true);
                fetchData();
              }
            }}
          />
          {search && (
            <MdiWindowClose
              className="h-3 w-3 md:h-4 md:w-4 absolute cursor-pointer inset-y-0 right-5 my-auto text-primary-700"
              onClick={() => {
                setSearch("");
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            if (search.length) {
              setPage(1);
              setIsFirstTime(true);
              fetchData();
            }
          }}
          className="bg-primary-500 w-full text-center justify-center max-w-[48%] text-white sm:max-w-fit inline-flex mr-1 sm:mr-0 sm:w-auto px-2 py-2.5 md:px-4 font-semibold text-xs md:text-sm rounded-md lg:hover:text-primary-500 tracking-wide lg:hover:bg-transparent lg:hover:border-primary-500 border-2 border-primary-500 transition-colors lg:hover:transition-colors"
        >
          Search
        </button>
        <button
          onClick={() => {
            setSearch("");
            tableData?.length !== 0 && fetchData("");
            setPage(1);
            setIsFirstTime(false);
          }}
          className="bg-primary-500  w-full text-center justify-center max-w-[48%] sm:flex-none text-white ml-1 sm:max-w-fit inline-flex sm:ml-0 sm:w-auto px-2 py-2.5 md:px-4 font-semibold text-xs md:text-sm rounded-md lg:hover:text-primary-500 tracking-wide lg:hover:bg-transparent lg:hover:border-primary-500 border-2 border-primary-500 transition-colors lg:hover:transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="flex justify-between">
        <div>
          <CustomPagination
            className="pagination-tablet"
            currentPage={+page}
            totalPages={Math.ceil(totalPage / perPage)}
            onPageChange={(num) => {
              if (totalPage) setPage(num);
            }}
          />
        </div>
        <div
          id="announce"
          aria-live="polite"
          results={`${totalPage ? totalPage : 0} records`}
          className="text-offBlack-400 font-medium pl-1 text-xs xl:text-sm lg:col-span-1 sm:text-center"
        >
          Results: {`(${totalPage ? totalPage : 0} records)`}
        </div>
      </div>
      <div className="incipit-tool" id="incipit-table">
        {tableData?.length !== 0 && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left font-medium tracking-wider text-sm lg:text-base">
                  Story ID
                </th>
                <th className="px-3 py-3 text-left font-medium tracking-wider text-sm lg:text-base">
                  Incipit Match
                </th>
                <th className="px-5 py-3 text-center font-medium tracking-wider text-sm lg:text-base">
                  Match Score
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((col, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <a
                          href={`/stories/${col.id}`}
                          className="text-primary-500 font-bold hover:text-secondary-500"
                        >
                          {col.id}
                        </a>
                      </div>
                    </td>
                    <td className="">
                      <div
                        className="font-geez"
                        dangerouslySetInnerHTML={{
                          __html: col.incipit,
                        }}
                      ></div>
                      <div>
                        <Link
                          href={`/manuscripts/${col.web_page_address}`}
                          className="text-primary-500 font-bold hover:text-secondary-500"
                        >
                          {col.manuscript}
                        </Link>
                        {col.folio_start ? ", f. " + col.folio_start : ""}
                        {col.scan_start ? ", s. " + col.scan_start : ""} (
                        {col?.manuscript_date_range_start &&
                        col?.manuscript_date_range_end
                          ? col.manuscript_date_range_start ===
                            col.manuscript_date_range_end
                            ? col.manuscript_date_range_start
                            : col.manuscript_date_range_start +
                              "-" +
                              col.manuscript_date_range_end
                          : "-"}
                        )
                      </div>
                    </td>
                    <td>
                      <div className="flex space-x-1 items-center">
                        <span className="pl-5 text-slate-400">
                          {col.score.toFixed(4)}
                        </span>
                        <Line
                          percent={(col.score / maxRecord) * 100}
                          strokeWidth={10}
                          strokeColor="#3c7057"
                          trailWidth={10}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {Boolean(!tableData?.length) && (
          <div className="flex items-center py-36 justify-center w-full text-2xl text-primary-500 font-bold">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : isFirstTime ? (
              <h1>Records Not Found</h1>
            ) : (
              <h1>
                Type the Ethiopic letters of the first unique line into the
                search bar
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
