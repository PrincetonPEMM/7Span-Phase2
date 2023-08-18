import { MANUSCRIPTS, STORIES } from "@/utils/constant";
import Link from "next/link";
import React from "react";

const Table = ({ isPageName, tableHeader, tableData, toggleBtn }) => {
  return (
    <div className="relative overflow-auto ">
      <table className="table  w-full shadow divide-y divide-gray-100 font-menu rounded-t-sm">
        <thead className="font-medium bg-primary-500 text-white rounded-t-sm">
          <tr>
            {tableHeader?.map((item, index) => (
              <th
                className="min-w-[160px] px-6 py-3 text-left text-sm font-medium capitalize tracking-wider"
                key={index}
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="min-h-[300px] align-baseline divide-y divide-gray-100 bg-background-500 text-sm font-light text-primary-500">
          {tableData?.length ? (
            tableData?.map((event, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td
                    className="w-full px-6 py-4 font-bold underline"
                    colSpan="6"
                  >
                    <Link href="#">
                      {isPageName === STORIES && event.canonical_story_title}
                      {isPageName === MANUSCRIPTS && event.manuscript_full_name}
                    </Link>
                  </td>
                </tr>
                {!toggleBtn && (
                  <tr key={index} className="text-offBlack font-medium">
                    <td className="max-w-xs whitespace-normal break-words px-6 py-4">
                      {isPageName === STORIES && event.canonical_story_id}
                      {isPageName === MANUSCRIPTS &&
                        `${event.manuscript_date_range_start}-${event.manuscript_date_range_end}`}
                    </td>
                    <td className="max-w-xs whitespace-normal break-words px-6 py-4">
                      {isPageName === STORIES && event.earliest_attestation}
                      {isPageName === MANUSCRIPTS && event.total_stories}
                    </td>
                    <td className="max-w-xs whitespace-normal break-words px-6 py-4">
                      {isPageName === STORIES && event.total_records}
                      {isPageName === MANUSCRIPTS && event.total_unique_stories}
                    </td>
                    <td className="max-w-xs whitespace-normal break-words px-6 py-4">
                      {isPageName === STORIES && event.total_story_id_paintings}
                      {isPageName === MANUSCRIPTS && event.ms_location_note}
                    </td>
                    <td className="max-w-xs whitespace-normal break-words px-6 py-4">
                      {isPageName === STORIES && event.type_of_story}
                      {isPageName === MANUSCRIPTS &&
                        event.total_manuscript_paintings}
                    </td>
                    <td className="max-w-xs whitespace-normal break-words px-6 py-4">
                      {isPageName === STORIES && event.canonical_story_subject}
                      {isPageName === MANUSCRIPTS && event.language}
                    </td>
                    {isPageName === MANUSCRIPTS && (
                      <td className="max-w-xs whitespace-normal break-words px-6 py-4">
                        {event.link_to_digital_copy}
                      </td>
                    )}
                    {isPageName === MANUSCRIPTS && (
                      <td className="max-w-xs whitespace-normal break-words px-6 py-4">
                        {event.scans_of_manuscript_in_color === "Yes"
                          ? "Color"
                          : "Black & White"}
                      </td>
                    )}
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr className="m-auto text-center">
              <td>Records Not Found !</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
