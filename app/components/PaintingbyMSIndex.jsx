"use client";
import PaintingStoryCard from "@/app/components/PaintingStoryCard";
import {
  breakpointColumnsForMasonry,
  pagePerLimitForPainting,
} from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { TablePagination } from "./Pagination";
import Masonry from "react-masonry-css";
import InputText from "./form/InputText";
import MdiMagnify from "@/assets/icons/MdiMagnify";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import useDebounce from "@/utils/useDebounce";

const PaintingbyMSIndex = ({ list }) => {
  const { debounce } = useDebounce();
  const [isLoading, setIsLoadint] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setData(list?.data);
    setTotalPage(list?.total);
  }, []);

  const fetchData = async (searchKey = "") => {
    fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-manuscript?page=${page}&perPage=${perPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setTotalPage(data.total);
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    fetchData(search);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const debouncedFetchData = debounce((e) => {
    fetchData(e);
    setPage(1);
  }, 300);

  return (
    <div className="py-10 container">
      <div className="mb-10 flex items-start space-x-4 ">
        <div className="relative w-full max-w-4xl mx-auto">
          <MdiMagnify className="h-4 w-4 md:h-6 md:w-6 absolute inset-y-0 left-3 md:left-5 my-auto text-primary-700" />
          <InputText
            value={search}
            iconBefore
            placeholderText="Search"
            onChange={(e) => {
              const query = e.target.value;
              setSearch(query);
              if (query.length > 3) {
                debouncedFetchData(query);
              }
              if (query.length === 0) {
                debouncedFetchData(query);
              }
            }}
          />

          {search && (
            <MdiWindowClose
              className="h-3 w-3 md:h-4 md:w-4 absolute cursor-pointer inset-y-0 right-5 my-auto text-primary-700"
              onClick={() => {
                setSearch("");
                debouncedFetchData("");
              }}
            />
          )}
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsForMasonry}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((item, index) => (
          <PaintingStoryCard key={index} item={item} />
        ))}
      </Masonry>
      {Boolean(!data?.length) && (
        <div className="flex items-center py-36 justify-center  w-full text-2xl text-primary-500 font-bold">
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

export default PaintingbyMSIndex;
