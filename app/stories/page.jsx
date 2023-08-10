"use client";
import React, { useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";
import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";

const page = () => {
  const [textValue, setTextValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
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

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <div className={`flex px-1 md:px-5  ${isOpen ? "shell" : "flex"}`}>
      <div
        className={`font-menu bg-primary-500 h-full absolute  md:static shell__sidebar w-full text-white p-4 ${
          isOpen
            ? "left-0 z-20 md:block md:static md:w-auto transition-all"
            : "hidden -left-full transition-all"
        } `}
      >
        <Sidebar onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className="w-full overflow-auto">
        {!isOpen && (
          <button onClick={() => setIsOpen(true)}>
            <MdiMenuOpen className="text-white-500 md:block hidden" />
          </button>
        )}

        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <MdiMenuOpen className="text-white-500 " />
        </button>

        <div className="grid grid-cols-3 items-center justify-between top-0 p-3 ">
          <div className="relative w-full max-w-sm md:max-w-4xl col-span-2">
            <span className="px-1 absolute -top-2 left-4 text-sm text-primary-500 bg-background-500">
              Filter
            </span>
            <InputText value={textValue} onChange={handleTextChange} />
          </div>
          <button className="bg-primary-500 text-white max-w-fit ml-auto w-auto px-2 py-4 md:py-4 md:px-4 text-xs md:text-sm rounded-md uppercase">
            Title view
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <Table columns={customData.columns} rows={customData.rows} />
        </div>
      </div>
    </div>
  );
};

export default page;
