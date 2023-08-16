"use client";
import React from "react";
import { useState } from "react";
import InputText from "./form/InputText";
import MdiMagnify from "@assets/icons/MdiMagnify";
import PSelect, { POption } from "./form/PSelect";
const Paintings = () => {
  const [selectedOpt, setSelectedOpt] = useState();
  const categories = [
    {
      name: "29/03/1996",
      id: "hello",
    },
    {
      name: "29/03/1976",
      id: "hello",
    },
    {
      name: "29/03/1966",
      id: "hello",
    },
    {
      name: "29/03/1956",
      id: "hello",
    },
  ];
  return (
    <div className="container">
      <div class="w-full relative">
        <MdiMagnify className="h-6 w-6 absolute inset-y-0 left-5 my-auto text-primary-700" />
        <InputText value="" iconBefore />
      </div>

      <PSelect
        selected={selectedOpt}
        onChange={(selected) => setSelectedOpt(selected)}
        className="pc-mb-3"
      >
        {categories?.map((opt, index) => (
          <POption key={index} id={opt.id} name={opt.name} />
        ))}
      </PSelect>
    </div>
  );
};

export default Paintings;
