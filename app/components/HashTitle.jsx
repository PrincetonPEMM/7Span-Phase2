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
    <h2
      className="text-3xl font-header text-center lg:text-4xl text-primary-500"
      id={id}
    >
      {title}
    </h2>
  );
};

export default HashTitle;
