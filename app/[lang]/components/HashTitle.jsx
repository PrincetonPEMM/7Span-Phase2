"use client";
import React, { useEffect } from "react";

const HashTitle = ({ title, id }) => {
  useEffect(() => {
    const targetDiv = document.getElementById(location?.hash.slice(1));
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [id, location?.hash]);

  return (
    <h1
      className="text-3xl font-header w-full text-left lg:text-4xl text-primary-500 mx-auto"
      id={id}
    >
      {title}
    </h1>
  );
};

export default HashTitle;
