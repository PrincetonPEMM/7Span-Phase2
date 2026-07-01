"use client";
import MdiChevronDoubleUp from "@/assets/icons/CilSortAscending";
import MdiChevronDoubleDown from "@/assets/icons/CilSortDescending";
import PhArrowsDownUpFill from "@/assets/icons/PhArrowsDownUpFill";
import { MANUSCRIPTS, MANUSCRIPT_DETAIL, STORIES } from "@/utils/constant";
import Link from "next/link";
import React, { useEffect } from "react";
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
  Id = "",
  lang,
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
    for (
      var lx = 0, ly = 0;
      el != null;
      lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent
    );
    return ly;
  }

  const findFirstDataRow = (tableBody) => {
    if (!tableBody) return null;
    for (const row of tableBody.querySelectorAll("tr")) {
      if (row.querySelectorAll("td").length > 1) return row;
    }
    return null;
  };

  const clearStickyLayout = ({
    tableHead,
    tableSearch,
    tableBody,
    table,
  }) => {
    [tableHead, tableSearch].forEach((el) => {
      if (!el) return;
      el.classList.remove("active");
      el.style.left = "";
      el.style.width = "";
      el.style.top = "";
      el.style.right = "";
    });
    tableBody?.classList.remove("active");
    tableHead?.querySelectorAll("th").forEach((th) => {
      th.style.width = "";
      th.style.minWidth = "";
    });
    const headerRow = tableHead?.querySelector("tr");
    if (headerRow) {
      headerRow.style.width = "";
      headerRow.style.transform = "";
    }
    if (table) {
      table.style.tableLayout = "";
      table.style.width = "";
    }
  };

  const syncColumnWidths = (tableHead, tableBody) => {
    const dataRow = findFirstDataRow(tableBody);
    if (!dataRow) return;

    const ths = tableHead.querySelectorAll("th");
    const tds = dataRow.querySelectorAll("td");

    ths.forEach((th, index) => {
      if (tds[index]) {
        const width = tds[index].getBoundingClientRect().width;
        th.style.width = `${width}px`;
        th.style.minWidth = `${width}px`;
      }
    });
  };

  const applyStickyDimensions = (el, wrapRect, top) => {
    el.style.left = `${wrapRect.left}px`;
    el.style.width = `${wrapRect.width}px`;
    el.style.top = `${top}px`;
    el.style.right = "auto";
  };

  const syncHeaderHorizontalScroll = (scrollLeft) => {
    const tableHead = document.querySelector(".table-head");
    const headerRow = tableHead?.querySelector("tr");
    if (!tableHead?.classList.contains("active") || !headerRow) return;

    headerRow.style.transform = `translateX(-${scrollLeft}px)`;
  };

  const setHeaderRowWidth = (tableWrap, tableHead) => {
    const headerRow = tableHead?.querySelector("tr");
    if (!headerRow || !tableWrap) return;

    headerRow.style.width = `${tableWrap.scrollWidth}px`;
  };

  const tableFixed = () => {
    if (typeof window === "undefined") return;

    const tableWrap = document.querySelector(".table-wrap");
    const tableHead = document.querySelector(".table-head");
    const tableSearch = document.querySelector(".table-search");
    const tableBody = document.querySelector(".table-body");
    const table = document.querySelector(".table");

    if (!tableWrap || !tableHead || !table) return;

    const tablePos = tableWrap.offsetTop;
    const elementTop = getPos(tableHead);
    const scrollUnstickOffset = window.innerWidth < 1280 ? 88 : 38;
    const stickSearchBar = window.innerWidth >= 1024;
    const searchTop = window.innerWidth < 640 ? 187 : 0;
    const headTopWithoutSearch =
      window.innerWidth < 640 ? 136 : window.innerWidth < 1024 ? 88 : 0;

    const shouldStick = window.scrollY > elementTop;
    const shouldUnstickNearTop =
      shouldStick && window.scrollY < tablePos - scrollUnstickOffset;

    if (!shouldStick || shouldUnstickNearTop) {
      clearStickyLayout({ tableHead, tableSearch, tableBody, table });
      return;
    }

    const wrapRect = tableWrap.getBoundingClientRect();
    const footer = document.querySelector("#site-footer");
    const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
    const tableWrapBottom = wrapRect.bottom;
    const stickyLimit = Math.min(footerTop, tableWrapBottom);

    const searchHeight =
      stickSearchBar && tableSearch ? tableSearch.offsetHeight : 0;
    const headHeight = tableHead.offsetHeight;
    const blockStart = stickSearchBar ? searchTop : headTopWithoutSearch;
    const blockHeight = searchHeight + headHeight;

    if (stickyLimit <= blockStart) {
      clearStickyLayout({ tableHead, tableSearch, tableBody, table });
      return;
    }

    let blockTop = blockStart;
    if (blockStart + blockHeight > stickyLimit) {
      blockTop = stickyLimit - blockHeight;
    }

    if (blockTop + blockHeight <= 0) {
      clearStickyLayout({ tableHead, tableSearch, tableBody, table });
      return;
    }

    syncColumnWidths(tableHead, tableBody);

    if (stickSearchBar && tableSearch) {
      tableSearch.classList.add("active");
      applyStickyDimensions(tableSearch, wrapRect, blockTop);
      tableHead.classList.add("active");
      applyStickyDimensions(tableHead, wrapRect, blockTop + searchHeight);
    } else {
      tableSearch?.classList.remove("active");
      if (tableSearch) {
        tableSearch.style.left = "";
        tableSearch.style.width = "";
        tableSearch.style.top = "";
        tableSearch.style.right = "";
      }
      tableHead.classList.add("active");
      applyStickyDimensions(tableHead, wrapRect, blockTop);
    }

    tableBody?.classList.add("active");
    setHeaderRowWidth(tableWrap, tableHead);
    syncHeaderHorizontalScroll(tableWrap.scrollLeft);
  };

  const scrollTable = () => {
    const tableElement = document.querySelector(".table-wrap");
    if (!tableElement) return;

    syncHeaderHorizontalScroll(tableElement.scrollLeft);
  };

  const handleHeaderWheel = (event) => {
    const tableWrap = document.querySelector(".table-wrap");
    const tableHead = document.querySelector(".table-head");
    if (!tableWrap || !tableHead?.classList.contains("active")) return;

    const delta = event.deltaX || event.deltaY;
    if (!delta) return;

    tableWrap.scrollLeft += delta;
    syncHeaderHorizontalScroll(tableWrap.scrollLeft);
    event.preventDefault();
  };

  useEffect(() => {
    const tableHeaderElement = document.querySelector(".table-head");
    const tableElement = document.querySelector(".table-wrap");

    if (!tableHeaderElement || !tableElement) return;

    tableHeaderElement.addEventListener("wheel", handleHeaderWheel, {
      passive: false,
    });
    tableElement.addEventListener("scroll", scrollTable);
    document.addEventListener("scroll", tableFixed);
    window.addEventListener("resize", tableFixed);

    tableFixed();

    return () => {
      tableHeaderElement.removeEventListener("wheel", handleHeaderWheel);
      tableElement.removeEventListener("scroll", scrollTable);
      document.removeEventListener("scroll", tableFixed);
      window.removeEventListener("resize", tableFixed);
    };
  }, [tableData, toggleBtn, tableHeader]);

  const sortingFun = (value, isClicked) => {
    const isSelected = value === ascDescFil;
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
        <table
          className={`${
            isPageName === MANUSCRIPT_DETAIL && "manuscript_detail_table"
          } ${isPageName === MANUSCRIPTS && "manuscript-table"} ${
            isPageName === STORIES && "story-table"
          } table  w-full shadow divide-y divide-gray-100 font-body rounded-t-sm`}
        >
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
                        [0, 1, 2, 3].includes(index) &&
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
                                ? `/${lang}/stories/${event.canonical_story_id}`
                                : `/${lang}/manuscripts/${event.web_page_address}`
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
                            href={`/${lang}/stories/${event.id}`}
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
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {isPageName === STORIES &&
                          buildShowingText(event.type_of_story)}
                        {isPageName === MANUSCRIPTS &&
                          buildShowingText(event.total_manuscript_paintings)}
                        {isPageName === MANUSCRIPT_DETAIL &&
                        event.no_of_paintings_per_story_instance > 0 ? (
                          <Link
                            href={`/${lang}/paintings/${Id}_${event.first_painting_unique_id}`}
                            className="text-primary-500 hover:text-secondary-500 font-bold"
                          >
                            {event.no_of_paintings_per_story_instance}
                          </Link>
                        ) : (
                          event.no_of_paintings_per_story_instance
                        )}
                      </td>

                      <td className="max-w-xs whitespace-normal break-words px-6 py-4   text-sm lg:text-base">
                        {isPageName === STORIES &&
                          collapseText(index, event.canonical_story_subject)}
                        {isPageName === MANUSCRIPTS &&
                          collapseText(index, event.ms_location_note)}
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
    </>
  );
};

export default Table;
