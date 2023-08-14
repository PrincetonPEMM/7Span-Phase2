import Link from "next/link";
import React from "react";

const Table = ({ columns, rows }) => {
  return (
    <div className="relative ">
      <table className="table overflow-x-auto w-full shadow divide-y divide-gray-100 font-menu rounded-t-sm">
        <thead className="font-medium bg-primary-500 text-white  rounded-t-sm ">
          <tr>
            {columns?.map((item, index) => (
              <th
                className="min-w-[160px] px-6 py-3 text-left text-sm font-medium capitalize tracking-wider"
                key={index}
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="min-h-[300px] divide-y divide-gray-100 bg-background-500 text-sm font-light text-primary-500">
          {rows?.length
            ? rows?.map((event, index) => (
                <>
                  <tr>
                    <td
                      className="w-full px-6 py-4 font-bold underline"
                      colSpan="6"
                    >
                      <Link href="#">
                        The composition of the Miracles of Mary book by Bishop
                        Hildephonsus of Toledo
                      </Link>
                    </td>
                  </tr>
                  <tr key={index} className="text-offBlack font-medium">
                    {event.columns.map((item, itemIndex) => {
                      return (
                        <td
                          className="max-w-xs whitespace-normal break-words px-6 py-4"
                          key={index + itemIndex}
                        >
                          {item.text}
                        </td>
                      );
                    })}
                  </tr>
                </>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
