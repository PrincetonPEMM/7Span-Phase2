"use client";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";
import { Pagination } from "./Pagination";

const initialfilterItem = {
  title: "Filtered Search",
  checkItem: {
    withPaintings: {
      id: "1",
      label: "With Paintings",
      isChecked: false,
    },
    mostIllustrated: {
      id: "2",
      label: "Most Illustrated",
      isChecked: false,
    },
    withEnglishTranslation: {
      id: "3",
      label: "With English translation",
      isChecked: false,
    },
    ethiopianStories: {
      id: "4",
      label: "Ethiopian Stories",
      isChecked: false,
    },
    miracleOfMaryStories: {
      id: "5",
      label: "Miracle of Mary Stories ",
      isChecked: false,
    },
    lifeOfMaryStories: {
      id: "6",
      label: "Life of Mary Stories ",
      isChecked: false,
    },
    earliestStories: {
      id: "7",
      label: "Earliest Stories",
      isChecked: false,
    },
    recentStories: {
      id: "8",
      label: "Recent Stories",
      isChecked: false,
    },
    popularStories: {
      id: "9",
      label: "Popular Stories",
      isChecked: false,
    },
    rareStories: {
      id: "10",
      label: "Rare Stories",
      isChecked: false,
    },
  },
};
const initialPlaceItem = {
  title: "Story's Place of Origin",
  checkItem: [
    {
      id: "1",
      icon: true,
      label: "Africa",
      name: "africa",
      isChecked: false,
    },
    {
      id: "2",
      icon: false,
      label: "Egypt",
      name: "egypt",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: "Ethiopia",
      name: "ethiopia",
      isChecked: false,
    },
    {
      id: "4",
      icon: true,
      label: "Europe",
      name: "europe",
      isChecked: false,
    },
    {
      id: "5",
      icon: false,
      label: "France",
      name: "france",
      isChecked: false,
    },
    {
      id: "6",
      icon: false,
      label: "Spain",
      name: "spain",
      isChecked: false,
    },
    {
      id: "7",
      icon: true,
      label: "Levant",
      name: "levant",
      isChecked: false,
    },
    {
      id: "8",
      icon: false,
      label: "Unknown",
      name: "unknown",
      isChecked: false,
    },
  ],
};
const initialLangItem = {
  title: "Languages of Story",
  checkItem: [
    {
      id: "1",
      label: "Geez",
      name: "geez",
      isChecked: false,
    },
    {
      id: "2",
      label: "Arabic",
      name: "arabic",
      isChecked: false,
    },
    {
      id: "3",
      label: "Amharic",
      name: "amharic",
      isChecked: false,
    },
    {
      id: "4",
      label: "English",
      name: "english",
      isChecked: false,
    },
    {
      id: "5",
      label: "French",
      name: "french",
      isChecked: false,
    },
    {
      id: "6",
      label: "Italian",
      name: "italian",
      isChecked: false,
    },
    {
      id: "7",
      label: "Latin",
      name: "latin",
      isChecked: false,
    },
  ],
};

const Stories = async () => {
  const pagePerLimit = 10;
  const tableDetailView = [{ name: "Title of Story" }];
  const tableTitleView = [
    { name: "Name" },
    { name: "Age" },
    { name: "Location" },
    { name: "Occupation" },
    { name: "Location" },
    { name: "Occupation" },
  ];
  const [search, setSearch] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const [filterItem, setFilterItem] = useState(initialfilterItem);
  const [placeItem, setPlaceItem] = useState(initialPlaceItem);
  const [langItem, setLangItem] = useState(initialLangItem);
  const [storyMin, setStoryMin] = useState(0);
  const [storyMax, setStoryMax] = useState(0);
  const [manuscriptsMin, setManuscriptsMin] = useState(0);
  const [manuscriptsMax, setManuscriptsMax] = useState(0);
  const [paintingMin, setPaintingMin] = useState(0);
  const [paintingMax, setPaintingMax] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimit);
  const [totalPage, setTotalPage] = useState();
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState(tableTitleView);

  const customData = {
    columns: [
      { name: "Name" },
      { name: "Age" },
      { name: "Location" },
      { name: "Occupation" },
      { name: "Location" },
      { name: "Occupation" },
    ],
    rows: [
      {
        columns: [
          { text: "John Doe" },
          { text: "Miracle of Mary" },
          { text: "New York" },
          { text: "Engineer" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "Jane Smith" },
          { text: "25" },
          { text: "San Francisco" },
          { text: "Designer" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "Michael Johnson" },
          { text: "40" },
          { text: "London" },
          { text: "Manager" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "Jane Smith" },
          { text: "25" },
          { text: "San Francisco" },
          { text: "Designer" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "Michael Johnson" },
          { text: "40" },
          { text: "London" },
          { text: "Manager" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "Jane Smith" },
          { text: "25" },
          { text: "San Francisco" },
          { text: "Designer" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "Michael Johnson" },
          { text: "40" },
          { text: "London" },
          { text: "Manager" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "John Doe" },
          { text: "Miracle of Mary" },
          { text: "New York" },
          { text: "Engineer" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "Jane Smith" },
          { text: "25" },
          { text: "San Francisco" },
          { text: "Designer" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "Michael Johnson" },
          { text: "40" },
          { text: "London" },
          { text: "Manager" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },
      {
        columns: [
          { text: "John Doe" },
          { text: "Miracle of Mary" },
          { text: "New York" },
          { text: "Engineer" },
          { text: "Miracle of Mary" },
          { text: "New York" },
        ],
      },

      // Add more rows here if needed
    ],
  };

  const getFilterFalsyValue = (itemList, key) => {
    return `filters[${key}]=${itemList.checkItem[key]?.isChecked}&`;
  };

  const makeParamsArray = (key, arr) => {
    return arr.checkItem
      .filter((ar) => ar.isChecked)
      .map((itm) => `filters[${key}][]=${itm.name}&`)
      .join("");
  };

  // homilyStories
  useEffect(async () => {
    const params = `
    page=${page}&
    perPage=${perPage}&
    ${getFilterFalsyValue(initialfilterItem, "withPaintings")}
    ${getFilterFalsyValue(initialfilterItem, "ethiopianStories")}
    ${getFilterFalsyValue(initialfilterItem, "miracleOfMaryStories")}
    ${getFilterFalsyValue(initialfilterItem, "lifeOfMaryStories")}
    ${getFilterFalsyValue(initialfilterItem, "homilyStories")}
    ${getFilterFalsyValue(initialfilterItem, "homilyStories")}
    ${getFilterFalsyValue(initialfilterItem, "homilyStories")}
    ${getFilterFalsyValue(initialfilterItem, "homilyStories")}
    ${getFilterFalsyValue(initialfilterItem, "homilyStories")}
    filters[centuryRange][gt]=${storyMin}&
    filters[centuryRange][lt]=${storyMax}&
    ${makeParamsArray("origin", initialPlaceItem)}
    filters[manuscriptsWithStoryRange][gt]=${manuscriptsMin}&
    filters[manuscriptsWithStoryRange][lt]=${manuscriptsMax}&
    filters[paintingsOfStoryRange][gt]=${paintingMin}&
    filters[paintingsOfStoryRange][lt]=${paintingMax}&
    ${makeParamsArray("languages", initialLangItem)}
    filters[search]=${search}&
    filters[withEnglishTranslation]=${getFilterFalsyValue(
      initialfilterItem,
      "withEnglishTranslation"
    )}
    `;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories?${params}`
    );

    const data = await response.json();
    setTotalPage(Math.ceil(data.total / perPage));

    setTableData(data.data);
    console.log(data.data);
  }, [
    initialfilterItem,
    initialPlaceItem,
    initialLangItem,
    search,
    page,
    storyMin,
    storyMax,
    manuscriptsMin,
    manuscriptsMax,
    paintingMin,
    paintingMax,
  ]);

  const handlePagination = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <div className="shell px-5 ">
      <div className="shell__sidebar w-full relative">
        <Sidebar
          filterItem={filterItem}
          setFilterItem={setFilterItem}
          placeItem={placeItem}
          setPlaceItem={setPlaceItem}
          langItem={langItem}
          setLangItem={setLangItem}
          storyMin={storyMin}
          setStoryMin={setStoryMin}
          storyMax={storyMax}
          setStoryMax={setStoryMax}
          manuscriptsMin={manuscriptsMin}
          setManuscriptsMin={setManuscriptsMin}
          manuscriptsMax={manuscriptsMax}
          setManuscriptsMax={setManuscriptsMax}
          paintingMin={paintingMin}
          setPaintingMin={setPaintingMin}
          paintingMax={paintingMax}
          setPaintingMax={setPaintingMax}
        />
      </div>
      <div>
        <div className="flex justify-between items-center top-0 p-3 sticky bg-background-500 z-20">
          <div className="relative w-full max-w-4xl">
            <span className="bg-background-500 px-1 absolute -top-2 left-4 text-sm text-primary-500">
              Filter
            </span>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            class="bg-primary-500 text-white p-4 text-sm rounded-md uppercase"
            onClick={() => {
              setToggleBtn(!toggleBtn);
              {
                toggleBtn
                  ? setTableHeader(tableDetailView)
                  : setTableHeader(tableTitleView);
              }
            }}
          >
            {toggleBtn ? "Detail view" : "Title View"}
          </button>
        </div>
        <Table tableHeader={tableHeader} tableData={tableData} />
        <Pagination
          meta={{
            total: totalPage,
            per_page: perPage,
            current_page: page,
            last_page: 50,
          }}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default Stories;
