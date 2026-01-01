"use client";
import MdiWindowClose from "@/assets/icons/MdiWindowClose";
import {
  breakpointColumnsForMasonry,
  minSearchChar,
  pagePerLimitForPainting,
} from "@/utils/constant";
import useDebounce from "@/utils/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Dropdown from "./Dropdown";
import CustomPagination from "./Pagination";
import PaintingStoryCard from "./PaintingStoryCard";
import InputText from "./form/InputText";

const PaintingByStoryIndex = ({ list, localData, lang }) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const newParams = new URLSearchParams();
  const pageP = params.get("page");
  const pageParams = pageP > 1 ? pageP : 1;
  const searchP = params.get("search");
  const searchParams = searchP ? searchP : "";
  const { debounce } = useDebounce();
  const [isLoading, setIsLoadint] = useState(true);
  const [page, setPage] = useState(pageParams);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  let [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(searchParams);

  const paintingBy = () => [
    {
      value: localData?.all_paintings,
      key: "/paintings",
    },
    {
      value: localData?.paintings_by_manuscript,
      key: "/paintings/by-manuscript",
    },
  ];

  useEffect(() => {
    setData(list?.data);
    setTotalPage(list?.total);
  }, []);

  const fetchData = (searchKey = search) => {
    setIsLoadint(true);
    if (searchKey.length > minSearchChar) {
      setFilterInParams("search", searchKey, false);
    }
    if (searchKey.length === 0) {
      setFilterInParams("search", searchKey, true);
    }

    if (page !== 1) {
      setFilterInParams("page", page, false);
    } else {
      setFilterInParams("page", page, true);
    }
    fetch(
      `${
        process.env.NEXT_PUBLIC_DIRECTUS_URL
      }paintings/by-story?language=${lang}&page=${page}&perPage=${perPage}&filters[search]=${
        searchKey.length > minSearchChar ? searchKey : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setTotalPage(data.total);
        setIsLoadint(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setIsLoadint(false);
      });
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

  const setFilterInParams = (key, value, isRemove = false) => {
    if (isRemove || !value) {
      newParams.delete(key);
      router.push(`${pathname}?${newParams.toString()}`);
      return;
    }
    newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="container-fluid py-4 lg:py-10">
      <div className="mb-10 flex items-start space-x-4 sticky top-0 bg-offWhite-500 z-10 py-3">
        <div className="sm:grid lg:grid-cols-6 sm:grid-cols-2 gap-2 w-full items-center font-body">
          <fieldset className="relative w-full col-span-2  max-w-4xl mx-auto mb-3 lg:mb-0">
            <legend
              htmlFor="SearchPaintingByStory"
              className="bg-offWhite-500 px-1 absolute -top-2 left-4 text-sm text-primary-500"
            >
              {localData.search_painting_descriptions}
            </legend>
            <label htmlFor="SearchPaintingByStory" className="sr-only">
              {localData.search_painting_descriptions}
            </label>
            <InputText
              area-label="Search here painting descriptions by story "
              id="SearchPaintingByStory"
              value={search}
              data-eqoutlinebind="0"
              onChange={(e) => {
                const query = e.target.value;
                setSearch(query);
                if (query.length > minSearchChar) {
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
          </fieldset>
          <div className=" lg:col-span-2 lg:text-center grid justify-items-center sm:justify-items-start lg:justify-items-center">
            <CustomPagination
              className="pagination-tablet"
              currentPage={+page}
              totalPages={Math.ceil(totalPage / perPage)}
              onPageChange={(num) => {
                setPage(num);
              }}
              localData={localData}
            />
          </div>
          <div className="lg:col-span-1 my-3 sm:my-0">
            <div
              id="announce"
              aria-live="polite"
              results={(() => {
                totalPage = totalPage ? totalPage : 0;
                return eval(`\`${localData?.total_records}\``);
              })()}
              className="text-offBlack-400 text-center font-medium font-body pl-2 text-xs sm:text-center xl:text-sm"
            >
              {(() => {
                totalPage = totalPage ? totalPage : 0;
                return eval(`\`${localData?.results_total_records}\``);
              })()}
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Dropdown
              title={localData?.paintings_by_story}
              options={paintingBy()}
              isMultiple={false}
              isRedirection={true}
            />
          </div>
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsForMasonry}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data?.map((item, index) => (
          <div
            key={item.image_link + index}
            className={`rounded-lg text-offWhite-500 font-body mb-4 mx-auto  inline-block relative overflow-hidden w-full`}
          >
            <PaintingStoryCard
              key={item.image_link + index}
              lang={lang}
              item={item}
              image={item.image_link}
              title={item?.pemm_short_title}
              content={`${
                item?.manuscript_date_range_start &&
                item?.manuscript_date_range_end
                  ? item.manuscript_date_range_start ===
                    item.manuscript_date_range_end
                    ? item.manuscript_date_range_start + localData.s
                    : item.manuscript_date_range_start +
                      "-" +
                      item.manuscript_date_range_end
                  : "-"
              }${item?.manuscript ? ", " + item.manuscript : ""}${
                item?.painting_folio
                  ? `, ${localData.f}. ` + item.painting_folio
                  : ""
              }${
                item?.painting_scan
                  ? `, ${localData.s}. ` + item.painting_scan
                  : ""
              }`}
              btnText={(() => {
                const is_painting_count_more_then_one = item.painting_count > 1;
                const painting_count = item.painting_count;
                return eval(
                  `\`${localData?.button_text_for_paiting_by_story_card}\``
                );
              })()}
              btnLink={` ${
                item.painting_count > 1
                  ? `/${lang}/paintings/by-story/` + item.canonical_story_id
                  : `/${lang}/paintings/${item.web_page_address}_${item.painting_unique_id}`
              }`}
              localData={localData}
              canonicalStoryId={`(${localData?.id} ${item?.canonical_story_id})`}
            />
          </div>
        ))}
      </Masonry>
      {Boolean(!data?.length) && (
        <div className="flex items-center py-36 justify-center  w-full text-2xl text-primary-500 font-bold">
          {isLoading ? (
            <h1>{localData?.loading}...</h1>
          ) : (
            <h1>{localData?.records_not_found}</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default PaintingByStoryIndex;
