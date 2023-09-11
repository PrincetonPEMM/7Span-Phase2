"use client";
import Masonry from "@/app/components/Masonry";
import PaintingStoryCard from "@/app/components/PaintingStoryCard";
import { pagePerLimitForPainting } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { TablePagination } from "./Pagination";

const data1 = [
  {
    title: "British Library 520",
    text: "1700s",
  },
  {
    title: "British Library 520",
    text: "1700s",
  },
  {
    title: "British Library 520",
    text: "1700s",
  },

  {
    title: "British Library 520",
    text: "1700s",
  },
  {
    title: "British Library 520",
    text: "1700s",
  },
  {
    title: "British Library 520",
    text: "1700s",
  },

  {
    title: "British Library 520",
    text: "1700s",
  },
  {
    title: "British Library 520",
    text: "1700s",
  },
];

const PaintingByStoryIndex = async () => {
  const [isLoading, setIsLoadint] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch(
    //   `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/stories/${Id}?page=${page}&perPage=${perPage}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data.data);
    //     setTotalPage(data.total);
    //   })
    //   .catch((error) => console.error("Error", error));
    setData(data1);
    setTotalPage(50);
  }, [page]);

  return (
    <div className="py-10 container">
      <Masonry>
        {data.map((item, index) => (
          <PaintingStoryCard
            key={index}
            title={item.title}
            text={item.text}
            content={item.content}
            btnText={item.btnText}
          />
        ))}
      </Masonry>
      {Boolean(!data?.length) && (
        <div className="flex items-center justify-center  w-full text-2xl text-primary-500 font-bold">
          {isLoading ? <h1>Loading...</h1> : <h1>Records Not Found</h1>}
        </div>
      )}
      <TablePagination
        meta={{
          total: totalPage,
          per_page: perPage,
          current_page: page,
          last_page: 50,
          page: page,
        }}
        isOpen={true}
        onPageChange={(num) => {
          setPage(num);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
};

export default PaintingByStoryIndex;
