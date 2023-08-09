"use client";
import React, { useState } from "react";
import Table from "../components/Table";
import InputText from "../components/form/InputText";
import Sidebar from "../components/Sidebar";

const page = () => {
  const [textValue, setTextValue] = useState("");
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
    <div className="shell px-5 bg-background-500">
      <div className="shell__sidebar w-full">
        <Sidebar />
      </div>
      <div>
        <div className="flex justify-between items-center top-0 p-3 sticky bg-background-500 z-20">
          <div className="relative w-full max-w-4xl">
            <span className="bg-background-500 px-1 absolute -top-2 left-4 text-sm text-primary-500">
              Filter
            </span>
            <InputText value={textValue} onChange={handleTextChange} />
          </div>
          <button class="bg-primary-500 text-white p-4 text-sm rounded-md uppercase">
            Title view
          </button>
        </div>
        <Table columns={customData.columns} rows={customData.rows} />
      </div>
    </div>
  );
};

export default page;
