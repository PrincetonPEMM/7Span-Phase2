"use client";
import InputText from "@/app/components/form/InputText";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import { Line, Circle } from "rc-progress";
import { INCIPIT_TABLE, IncipitTable } from "@/utils/constant";
import { Table } from "flowbite-react";
import React from "react";
import { useEffect, useRef, useState } from "react";

const perPage = 10;
const tableHeader = [
  { head: "hello", text: "hello" },
  { head: "hello", text: "hello" },
  { head: "hello", text: "hello" },
];
const tableRow = [
  { text: "helo", progressIndex: 10, percent: 10 },
  { text: "helo", progressIndex: 10, percent: 10 },
  { text: "helo", progressIndex: 10, percent: 10 },
];

const page = ({ table }) => {
  const [search, setSearch] = useState("");

  const [total, setTotal] = useState(0);

  const [maxRecord, setMaxRecord] = useState(0);

  const [page, setPage] = useState(1);

  const [tableData, setTableData] = useState([]);

  const fetchData = (searchData = search) => {
    fetch(
      `https://pemm-directus.preview.im/incipit-tool?search=${searchData}&page=${page}&perPage=${perPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMaxRecord(data.maxRecord);
        setTotal(data.total);
        setTableData(data.data);
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(tableData, "-------111");

  // /split text code
  const originalText =
    "<td>&lt;em&gt;ወሀሎ&lt;/em&gt;፡ አሐዱ፡ ደብር፡ ዘመነኮሳት፡ ኀበ፡ ጽንፈ፡ ባሕር፡ &lt;em&gt;ወሀሎ&lt;/em&gt;፡ ውስቴቱ፡ አሐዱ፡ እኅው፡ ዘመንኰሰ፡ እምንእሱ፡ ወውእቱሰ፡ ብእሲ፡ ሠናይ፡ ውእቱEMML (HMML) 157341r</td>";

  // Use regular expression to split content within <em> tags
  console.log(originalText.split(/(&lt;em&gt;|&lt;\/em&gt;)/));
  const splitText = originalText
    .split(/(&lt;em&gt;|&lt;\/em&gt;)/)
    .map((part, index) => {
      // console.log(part, index);
      if (part === "&lt;em&gt;") {
        // console.log("enter");
        return <em key={index}></em>;
      } else if (part === "&lt;/em&gt;") {
        return null;
      } else {
        return part;
      }
    });

  return (
    <div className="container space-y-10 py-10">
      <h1 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
        Incipit Search
      </h1>
      <div class="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
        <div className="relative w-full sm:col-span-4 md:max-w-6xl">
          <label
            htmlFor="SearchTitles"
            className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500"
          >
            Type to search
          </label>
          <InputText
            id="SearchTitles"
            aria-label="Search here titles and painting descriptions"
            value={search}
            onChange={(e) => {
              const query = e.target.value;
              setSearch(query);
            }}
          />
          {/* {search && ( */}
          <MdiWindowClose
            className="h-3 w-3 md:h-4 md:w-4 absolute cursor-pointer inset-y-0 right-5 my-auto text-primary-700"
            // onClick={() => {
            //   setSearch("");
            //   debouncedFetchData("");
            // }}
          />
          {/* )} */}
        </div>
        <button
          onClick={() => fetchData()}
          class="bg-primary-500 text-white max-w-fit w-auto px-2 py-2.5 md:px-4 font-semibold text-xs md:text-sm rounded-md lg:hover:text-primary-500 tracking-wide lg:hover:bg-transparent lg:hover:border-primary-500 border-2 border-primary-500 transition-colors lg:hover:transition-colors"
        >
          Search
        </button>
      </div>
      <div className="incipit-tool" id="incipit-table">
        {/* <Table
          isPageName={INCIPIT_TABLE}
          tableHeader={IncipitTable}
          tableData={tableData}
        /> */}
        <table className="w-full">
          <thead>
            <tr>
              {tableHeader?.map((item, index) => {
                return (
                  <th
                    className="px-3 py-3 text-left font-medium tracking-wider text-sm lg:text-base"
                    key={index}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{item.head}</span>
                      <p>{item.text}</p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((col, index) => {
              console.log(col, "Maulik");
              return (
                <tr>
                  <td>{col.id}</td>
                  <td>
                    {col.incipit}
                    {col.manuscript}
                    <p>
                      {/* dangerouslySetInnerHTML={{ __html: splitText.join("") }}÷ */}
                      {splitText.join("")}
                    </p>
                    {/* {col.folio_start} */}
                  </td>
                  <td>
                    <Line
                      percent={col.percent}
                      strokeWidth={10}
                      strokeColor="#3c7057"
                      trailWidth={10}
                    />
                  </td>
                </tr>
              );
            })}
            {!tableData && <p> Data not Found </p>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
