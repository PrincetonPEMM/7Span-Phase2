import { MANUSCRIPTS, STORIES } from "@/utils/constant";
import Link from "next/link";
import React, { useState } from "react";
import { Pagination } from "./Pagination";

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
          <tbody className="min-h-[300px] align-baseline divide-y divide-gray-100 bg-background-500 text-sm font-light text-primary-500">
            {Boolean(tableData?.length) &&
              tableData?.map((event, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      className="w-full px-6 py-4 font-bold hover:text-secondary-500 transition-all hover:transition-all text-sm lg:text-base"
                      colSpan="6"
                    >
                      <Link
                        href={
                          (isPageName === STORIES || true) &&
                          `stories/${event.id}`
                        }
                      >
                        {isPageName === STORIES && event.canonical_story_title}
                        {isPageName === MANUSCRIPTS &&
                          event.manuscript_full_name}
                      </Link>
                    </td>
                  </tr>
                  {!toggleBtn && (
                    <tr key={index} className="text-offBlack font-medium">
                      <td className="max-w-xs whitespace-normal break-words px-6 py-4  text-sm lg:text-base">
                        {isPageName === STORIES && event.canonical_story_id}
                        {isPageName === MANUSCRIPTS &&
                          `${event.manuscript_date_range_start}-${event.manuscript_date_range_end}`}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-6 py-4  text-sm lg:text-base">
                        {isPageName === STORIES && event.earliest_attestation}
                        {isPageName === MANUSCRIPTS && event.total_stories}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-6 py-4  text-sm lg:text-base">
                        {isPageName === STORIES && event.total_records}
                        {isPageName === MANUSCRIPTS &&
                          event.total_unique_stories}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-6 py-4  text-sm lg:text-base">
                        {isPageName === STORIES &&
                          event.total_story_id_paintings}
                        {isPageName === MANUSCRIPTS && event.ms_location_note}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-6 py-4  text-sm lg:text-base">
                        {isPageName === STORIES && event.type_of_story}
                        {isPageName === MANUSCRIPTS &&
                          event.total_manuscript_paintings}
                      </td>
                      <td className="max-w-xs whitespace-normal break-words px-6 py-4  text-sm lg:text-base">
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
                              {event.canonical_story_subject.length > 40
                                ? event.canonical_story_subject.slice(0, 40) +
                                  "..."
                                : event.canonical_story_subject}
                              {event.canonical_story_subject.length > 40 && (
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
                      </td>
                      {isPageName === MANUSCRIPTS && (
                        <td className="max-w-xs whitespace-normal break-words px-6 py-4  text-sm lg:text-base">
                          <a
                            href={event.link_to_digital_copy}
                            target="_blank"
                            className="text-primary-600 underline"
                          >
                            Digital Copy
                          </a>
                        </td>
                      )}
                      {isPageName === MANUSCRIPTS && (
                        <td className="max-w-xs whitespace-normal break-words px-6 py-4  text-sm lg:text-base">
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
