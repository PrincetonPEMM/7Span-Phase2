"use client";
import MdiChevronDoubleUp from "@/assets/icons/CilSortAscending";
import MdiChevronDoubleDown from "@/assets/icons/CilSortDescending";
import PhArrowsDownUpFill from "@/assets/icons/PhArrowsDownUpFill";
import { MANUSCRIPT_DETAIL } from "@/utils/constant";
import { MANUSCRIPTS, STORIES } from "@/utils/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { Pagination } from "./Pagination";

const Table = ({
  // search,
  isPageName,
  tableHeader,
  tableData,
  toggleBtn,
  // meta,
  // isOpen,
  // onPageChange,
  expandedRows,
  setExpandedRows,
  setAscDescFil,
  ascDescFil,
  sortingRow,
  setSortingRow,
}) => {
  const toggleExpand = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((row) => row !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };

  const LocationInMs = (event) => {
    let scanned_pages = "";
    let column = "";
    let line = "";

    if (event.scan_start !== null && event.scan_end !== null) {
      scanned_pages = "s. " + event.scan_start + "-" + event.scan_end;
    } else if (event.scan_start !== null && event.scan_end === null) {
      scanned_pages = "s. " + event.scan_start;
    } else if (event.scan_start === null && event.scan_end === null) {
      if (event.folio_start !== null && event.folio_end !== null) {
        scanned_pages = "f. " + event.folio_start + "-" + event.folio_end;
      } else if (event.folio_start !== null && event.folio_end === null) {
        scanned_pages = event.folio_start;
      } else {
        scanned_pages = "";
      }
    }

    if (event.column_start !== null) {
      column = "col. " + event.column_start;
    }

    if (event.line_start !== null) {
      line = "line " + event.line_start;
    }

    return `${scanned_pages}${Boolean(column) ? ", " + column : " "}${
      Boolean(line) ? ", " + line : " "
    }`;
  };

  const collapseText = (index, text, ariaLabel = "") => {
    if (!Number(text?.length)) {
      return "-";
    }

    return expandedRows.includes(index) ? (
      <div>
        {text}
        <button
          onClick={() => toggleExpand(index)}
          className="text-primary-500 hover:text-secondary-500 font-bold"
        >
          &nbsp; See Less
        </button>
      </div>
    ) : (
      <div>
        {Number(text?.length) > 40 ? text.slice(0, 40) + "..." : text}
        {Number(text?.length) > 40 && (
          <button
            onClick={() => toggleExpand(index)}
            className="text-primary-500 hover:text-secondary-500 font-bold"
            aria-label={`See more about ${ariaLabel}`}
          >
            See More
          </button>
        )}
      </div>
    );
  };

  const buildShowingText = (text, newText = "-") => {
    return text === undefined || text === null || text.length === 0
      ? newText
      : text;
  };

  function getPos(el) {
    // yay readability
    for (
      var lx = 0, ly = 0;
      el != null;
      lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent
    );
    return ly;
  }

  const tableFixed = () => {
    const tablePos = document.querySelector(".table-wrap").offsetTop;
    const element = document.querySelector(".table-head");

    if (window.scrollY > getPos(element)) {
      if (window.innerWidth < 1024) {
        document.querySelector(".table-search").classList.remove("active");
      } else {
        document.querySelector(".table-search").classList.add("active");
      }
      document.querySelector(".table-head").classList.add("active");
      document.querySelector(".table-body").classList.add("active");
      if (window.innerWidth < 1280) {
        if (window.scrollY < tablePos - 88) {
          document.querySelector(".table-search").classList.remove("active");
          document.querySelector(".table-head").classList.remove("active");
          document.querySelector(".table-body").classList.remove("active");
        }
      } else {
        if (window.scrollY < tablePos - 38) {
          document.querySelector(".table-search").classList.remove("active");
          document.querySelector(".table-head").classList.remove("active");
          document.querySelector(".table-body").classList.remove("active");
        }
      }
    } else {
      document.querySelector(".table-search").classList.remove("active");
      document.querySelector(".table-head").classList.remove("active");
      document.querySelector(".table-body").classList.remove("active");
    }
    if (
      window.scrollY >
      getPos(element) + document.querySelector(".table").offsetHeight + 150
    ) {
      document.querySelector(".table-search").classList.remove("active");
      document.querySelector(".table-head").classList.remove("active");
      document.querySelector(".table-body").classList.remove("active");
    }
  };

  const scrollTable = () => {
    const tableElement = document.querySelector(".table-wrap");
    document.querySelector(".table-head").scrollTo({
      left: tableElement.scrollLeft,
    });
  };

  const scrollHeaderTable = () => {
    const tableElement = document.querySelector(".table-head");
    document.querySelector(".table-wrap").scrollTo({
      left: tableElement.scrollLeft,
    });
  };

  useEffect(() => {
    const tableHeaderElement = document.querySelector(".table-head");
    tableHeaderElement.addEventListener("scroll", scrollHeaderTable);

    const tableElement = document.querySelector(".table-wrap");
    tableElement.addEventListener("scroll", scrollTable);

    document.addEventListener("scroll", tableFixed);

    return () => {
      tableHeaderElement.addEventListener("scroll", scrollHeaderTable);
      tableElement.removeEventListener("scroll", scrollTable);
      document.removeEventListener("scroll", tableFixed);
    };
  }, []);

  const sortingFun = (value, isClicked) => {
    const isSelected = value === ascDescFil;
    console.log(sortingRow, "sortingRow", ascDescFil, value, isClicked);
    if (!isClicked) {
      return (
        <button
          onClick={() => {
            setSortingRow({ [value]: true });
            setAscDescFil(value);
          }}
          className={` hover:text-secondary-500 `}
        >
          <PhArrowsDownUpFill className="text-xl inline-block w-5 h-5 font-bold" />
        </button>
      );
    }

    return (
      <span className="flex flex-col">
        {isSelected ? (
          <button
            onClick={() => setAscDescFil(`-${value}`)}
            className={` text-secondary-500 `}
          >
            <MdiChevronDoubleUp className="text-xl inline-block w-5 h-5 font-bold" />
          </button>
        ) : (
          <button
            onClick={() => setAscDescFil(value)}
            className={` text-secondary-600`}
          >
            <MdiChevronDoubleDown className="text-xl inline-block w-5 h-5 font-bold" />
          </button>
        )}
      </span>
    );
  };

  return (
    <>
      {/* <div
        className={`w-full  ${
          tableData?.length ? "h-screen" : "h-auto block"
        } `}
      > */}
      <div className="relative table-wrap overflow-auto">
        <table className="table  w-full shadow divide-y divide-gray-100 font-body rounded-t-sm">
          <thead className="table-head font-medium bg-primary-500 text-white rounded-t-sm align-top">
            <tr>
              {tableHeader?.map((item, index) => {
                return (
                  <th
                    className="px-3 py-3 text-left font-medium tracking-wider text-sm lg:text-base"
                    key={index}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{item.name}</span>
                      {isPageName === STORIES &&
                        [0, 1, 2].includes(index) &&
                        sortingFun(item.value, sortingRow[item?.value])}
                      {isPageName === MANUSCRIPTS &&
                        [0, 1, 2, 4].includes(index) &&
                        sortingFun(item.value, sortingRow[item?.value])}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table-body min-h-[300px] table-body align-baseline  bg-offWhite-500 text-sm font-light text-primary-500">
            {Boolean(tableData?.length) &&
              tableData?.map((event, index) => (
                <React.Fragment key={index}>
                  {isPageName !== MANUSCRIPT_DETAIL &&
                    (isPageName === STORIES || isPageName === MANUSCRIPTS) && (
                      <tr>
                        <td
                          className="w-full px-3 py-2 font-bold hover:text-secondary-500 transition-all hover:transition-all text-sm lg:text-base"
                          colSpan={`${isPageName === STORIES ? "6" : "8"}`}
                        >
                          <Link
                            href={
                              isPageName === STORIES
                                ? `stories/${event.canonical_story_id}`
                                : ` manuscripts/${event.web_page_address}`
                            }
                          >
                            {isPageName === STORIES &&
                              buildShowingText(event.canonical_story_title)}
                            {isPageName === MANUSCRIPTS &&
                              buildShowingText(event.manuscript_full_name)}
                          </Link>
                        </td>
                      </tr>
                    )}

                  {
                    <tr
                      key={index}
                      className={`text-offBlack-500 font-medium ${
                        toggleBtn ? "hidden" : ""
                      }`}
                    >
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4 text-sm lg:text-base">
                        {isPageName === STORIES &&
                          buildShowingText(event.earliest_attestation)}
                        {isPageName === MANUSCRIPTS &&
                          `${
                            event.manuscript_date_range_start &&
                            event.manuscript_date_range_end
                              ? event.manuscript_date_range_start ===
                                event.manuscript_date_range_end
                                ? event.manuscript_date_range_end
                                : event.manuscript_date_range_start +
                                  "-" +
                                  event.manuscript_date_range_end
                              : "-"
                          }`}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          buildShowingText(event.miracle_number)}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {isPageName === STORIES &&
                          buildShowingText(event.total_records)}
                        {isPageName === MANUSCRIPTS &&
                          buildShowingText(event.total_stories)}
                        {isPageName === MANUSCRIPT_DETAIL && (
                          <Link
                            href={`/stories/${event.id}`}
                            className="text-primary-500 hover:text-secondary-500 font-bold"
                          >
                            {buildShowingText(event.canonical_story_title)}
                          </Link>
                        )}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {isPageName === STORIES &&
                          buildShowingText(event.total_story_id_paintings)}
                        {isPageName === MANUSCRIPTS &&
                          buildShowingText(event.total_unique_stories)}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          LocationInMs(event)}
                      </td>
                      {[STORIES, MANUSCRIPTS].includes(isPageName) && (
                        <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                          {isPageName === STORIES &&
                            buildShowingText(event.type_of_story)}
                          {isPageName === MANUSCRIPTS &&
                            collapseText(index, event.ms_location_note)}
                          {/* {isPageName === MANUSCRIPT_DETAIL && "-"} */}
                        </td>
                      )}
                      <td className="max-w-xs whitespace-normal break-words  px-3 py-4   text-sm lg:text-base">
                        {isPageName === STORIES &&
                          collapseText(index, event.canonical_story_subject)}
                        {isPageName === MANUSCRIPTS &&
                          buildShowingText(event.total_manuscript_paintings)}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          buildShowingText(event.manuscript)}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {/* This */}
                        {isPageName === STORIES &&
                          buildShowingText(event.canonical_story_id)}
                        {isPageName === MANUSCRIPTS && event.language}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          (Boolean(event.incipit)
                            ? collapseText(
                                index,
                                event.incipit
                                // event.manuscript_full_name
                              )
                            : "-")}
                      </td>
                      {isPageName === MANUSCRIPTS && (
                        <>
                          <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                            {event.link_to_digital_copy ? (
                              <a
                                href={event.link_to_digital_copy}
                                target="_blank"
                                area-label="Click here to See the Digital Copy"
                                className="text-primary-500 font-bold hover:text-secondary-500"
                              >
                                Digital Copy
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                            {event.scans_of_manuscript_in_color === "Yes"
                              ? "Color"
                              : "Black & White"}
                          </td>
                        </>
                      )}
                      {isPageName === MANUSCRIPT_DETAIL && (
                        <>
                          <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                            {(() => {
                              if (event.total_records === 1) return "☆";
                              if (event.stanza === "Yes") return "♫";
                              if (
                                event.confidence_score === "Low" ||
                                event.confidence_score === "Medium"
                              )
                                return "(?)";
                              return "-";
                            })()}
                          </td>
                          <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                            {buildShowingText(event.canonical_story_id)}
                          </td>
                        </>
                      )}
                    </tr>
                  }
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      {/* {Boolean(!tableData?.length) && (
          <div className="flex items-center justify-center  w-full text-2xl text-primary-500 font-bold">
            {Boolean(search.length) ? (
              <h1>Records Not Found</h1>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        )}
        <TablePagination meta={meta} isOpen={isOpen} onPageChange={onPageChange} />
      </div> */}
    </>
  );
};

export default Table;
