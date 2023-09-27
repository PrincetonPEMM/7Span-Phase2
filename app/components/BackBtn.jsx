"use client";
import MdiKeyboardBackspace from "@/assets/icons/MdiKeyboardBackspace";
import React from "react";

const BackBtn = () => {
  return (
    <div
      onClick={() => window?.history?.back()}
      className="inline-flex items-center back-btn cursor-pointer"
    >
      <MdiKeyboardBackspace />
      <span className="ml-2">Back</span>
    </div>
  );
};

export default BackBtn;
