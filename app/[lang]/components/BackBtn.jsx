"use client";
import MdiKeyboardBackspace from "@/assets/icons/MdiKeyboardBackspace";
import React from "react";

const BackBtn = () => {
  return (
    <button
      onClick={() => window?.history?.back()}
      area-label="Back to previous page"
      className="inline-flex items-center back-btn cursor-pointer mb-4 lg:hidden"
    >
      <MdiKeyboardBackspace />
      <span className="ml-2">Back</span>
    </button>
  );
};

export default BackBtn;
