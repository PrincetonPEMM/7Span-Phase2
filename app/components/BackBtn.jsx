"use client";
import MdiKeyboardBackspace from "@/assets/icons/MdiKeyboardBackspace";
import { useRouter } from "next/navigation";
import React from "react";

const BackBtn = () => {
  //   const route = useRouter();
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
