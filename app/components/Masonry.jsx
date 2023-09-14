"use client";

import { useEffect, useState } from "react";

export default function Masonry(props) {
  // noOfColumns state with default value of 3
  const [noOfColumns, setNoOfColumns] = useState(
    typeof window == "undefien"
      ? window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 768
        ? 2
        : 1
      : 3
  );
  // change no of coloum on window resize
  useEffect(() => {
    window.addEventListener("resize", function () {
      setNoOfColumns(
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
      );
    });
  }, []);

  return (
    <div className="masonry columns-1 md:columns-2 lg:columns-3 ">
      {props.children.map((child, index) => {
        const total_row = Math.ceil(props.children.length / noOfColumns);
        const row = index % total_row;
        const col = Math.floor(index / total_row);
        const class_name = (col + row) % 2 ? "even" : "odd";
        return (
          <div key={index} className={`masonry-column mb-3  ${class_name}`}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
