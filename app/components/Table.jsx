"use client";
import { MANUSCRIPT_DETAIL } from "@/utils/constant";
import { MANUSCRIPTS, STORIES } from "@/utils/constant";
import Link from "next/link";
import React, { useState } from "react";
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
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
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

  return (
    <>
      {/* <div
        className={`w-full  ${
          tableData?.length ? "h-screen" : "h-auto block"
        } `}
      > */}
      <div className="relative overflow-auto">
        <table className="table  w-full shadow divide-y divide-gray-100 font-menu rounded-t-sm">
          <thead className="font-medium bg-primary-500 text-white rounded-t-sm sticky top-0">
            <tr>
              {tableHeader?.map((item, index) => (
                <th
                  className=" px-3 py-3 text-left font-medium tracking-wider text-sm lg:text-base"
                  key={index}
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="min-h-[300px] align-baseline divide-y divide-gray-100 bg-offWhite-500 text-sm font-light text-primary-500">
            {Boolean(tableData?.length) &&
              tableData?.map((event, index) => (
                <React.Fragment key={index}>
                  {isPageName !== MANUSCRIPT_DETAIL &&
                    (event?.canonical_story_title ||
                      event?.manuscript_full_name) && (
                      <tr>
                        <td
                          className="w-full px-3 py-3 font-bold underline hover:text-secondary-500 transition-all hover:transition-all text-sm lg:text-base"
                          colSpan="6"
                        >
                          <Link
                            href={
                              isPageName === STORIES
                                ? `stories/${event.id}`
                                : ` manuscripts/${event.id}`
                            }
                          >
                            {isPageName === STORIES &&
                              event.canonical_story_title}
                            {isPageName === MANUSCRIPTS &&
                              event.manuscript_full_name}
                          </Link>
                        </td>
                      </tr>
                    )}

                  {!toggleBtn && (
                    <tr key={index} className="text-offBlack-500 font-medium">
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {isPageName === STORIES && event.canonical_story_id}
                        {isPageName === MANUSCRIPTS &&
                          `${event.manuscript_date_range_start}-${event.manuscript_date_range_end}`}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          event.canonical_story_id}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {isPageName === STORIES && event.earliest_attestation}
                        {isPageName === MANUSCRIPTS && event.total_stories}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          event.canonical_story_title}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {isPageName === STORIES && event.total_records}
                        {isPageName === MANUSCRIPTS &&
                          event.total_unique_stories}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          LocationInMs(event)}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {isPageName === STORIES &&
                          event.total_story_id_paintings}
                        {isPageName === MANUSCRIPTS && event.ms_location_note}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          event.miracle_number}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4   text-sm lg:text-base">
                        {isPageName === STORIES &&
                          event.total_story_id_paintings}
                        {isPageName === MANUSCRIPTS && event.ms_location_note}
                        {isPageName === MANUSCRIPT_DETAIL &&
                        Boolean(event.manuscript)
                          ? event.manuscript
                          : "-"}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4">
                        {isPageName === STORIES && event.type_of_story}
                        {isPageName === MANUSCRIPTS &&
                          event.total_manuscript_paintings}
                        {isPageName === MANUSCRIPT_DETAIL &&
                        Boolean(event.incipit)
                          ? event.incipit
                          : "-"}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                        {/* This */}
                        {isPageName === STORIES &&
                          (expandedRows.includes(index) ? (
                            <div>
                              {event.canonical_story_subject}
                              <button
                                onClick={() => toggleExpand(index)}
                                className="text-primary-500 ml-1"
                              >
                                See Less
                              </button>
                            </div>
                          ) : (
                            <div>
                              {Number(event?.canonical_story_subject?.length) >
                              40
                                ? event.canonical_story_subject.slice(0, 40) +
                                  "..."
                                : event.canonical_story_subject}
                              {Number(event?.canonical_story_subject?.length) >
                                40 && (
                                <button
                                  onClick={() => toggleExpand(index)}
                                  className="text-primary-500 "
                                >
                                  See More
                                </button>
                              )}
                            </div>
                          ))}
                        {isPageName === MANUSCRIPTS && event.language}
                        {isPageName === MANUSCRIPT_DETAIL &&
                          (() => {
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
                      {isPageName === MANUSCRIPTS && (
                        <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                          <a
                            href={event.link_to_digital_copy}
                            target="_blank"
                            className="text-primary-500 underline"
                          >
                            Digital Copy
                          </a>
                        </td>
                      )}
                      {isPageName === MANUSCRIPTS && (
                        <td className="max-w-xs whitespace-normal break-words px-3 py-4  text-sm lg:text-base">
                          {event.scans_of_manuscript_in_color === "Yes"
                            ? "Color"
                            : "Black & White"}
                        </td>
                      )}
                    </tr>
                  )}
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
        <Pagination meta={meta} isOpen={isOpen} onPageChange={onPageChange} />
      </div> */}
    </>
  );
};

export default Table;
