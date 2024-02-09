import MdiArrowUp from "@/assets/icons/MdiArrowUp";
import MdiChevronRight from "@/assets/icons/MdiChevronRight";
import MdiChevronLeft from "@/assets/icons/MdiChevronLeft";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import MdiChevronDoubleRight from "@/assets/icons/MdiChevronDoubleRight";
import MdiChevronDoubleLeft from "@/assets/icons/MdiChevronDoubleLeft";

export const TablePagination = ({ meta, isOpen, onPageChange, ...rest }) => {
  let pageCount = Math.ceil(meta.total / meta.per_page);
  return (
    <>
      {pageCount > 1 ? (
        <Pagination
          activePage={meta.page}
          itemsCountPerPage={meta.per_page}
          totalItemsCount={meta.total}
          pageRangeDisplayed={3}
          onChange={(e) => {
            onPageChange(e);
          }}
        />
      ) : null}
    </>
  );
};
// export const PaginationLoader = () => {
//   return (
//     <>
//       <div className="relative h-10">
//         <div className="mb-4 flex h-1.5 overflow-hidden text-xs">
//           <div
//             style={{ width: "100%" }}
//             className="h-full w-0 animate-ping bg-blue-500"
//           ></div>
//         </div>
//       </div>
//     </>
//   );
// };
// const NextPage = ({ meta }) => {
//   return (
//     <>
//       <span
//         className={`flex h-10 min-w-[50px] items-center justify-center p-2 text-base ${
//           meta.current_page === meta.last_page
//             ? " text-slate-300"
//             : "text-primary-400"
//         }`}
//       >
//         <MdiArrowUp className="h-6 w-6 rotate-90" />
//       </span>
//     </>
//   );
// };
// const PrevPage = ({ meta }) => {
//   return (
//     <>
//       <span
//         className={`flex h-10 min-w-[50px] items-center justify-center p-2 text-base ${
//           meta.current_page === 1 ? " text-slate-300" : "text-primary-400"
//         }`}
//       >
//         <MdiArrowUp className="h-6 w-6 -rotate-90" />
//       </span>
//     </>
//   );
// };
function CustomPagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const [inputValue, setInputValue] = useState(currentPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setInputValue(newPage);
      onPageChange(newPage);
    }
  };

  useEffect(() => {
    if (inputValue === "") {
      setInputValue("");
      onPageChange(currentPage);
    } else {
      if (+currentPage <= 1) {
        setInputValue(1);
        onPageChange(1);
      } else if (+currentPage > +totalPages) {
        setInputValue(totalPages);
        onPageChange(totalPages);
      } else {
        setInputValue(currentPage);
        onPageChange(currentPage);
      }
    }
  }, [currentPage, totalPages]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setInputValue("");
      onPageChange(currentPage);
    } else {
      setInputValue(value);
      onPageChange(value);
    }
  };
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      const value = parseInt(inputValue);
      if (!isNaN(value)) {
        handlePageChange(value);
      }
    }
  };
  return totalPages > 1 ? (
    <div className={`pagination-container ${className}`}>
      <button
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(1)}
        area-label={`${currentPage === 1 ? "disabled" : "Move to first page"}`}
        area-disabled={`${currentPage === 1 ? "true" : "false"}`}
      >
        <MdiChevronDoubleLeft className="text-base" />
      </button>

      {/* button previoud start */}
      <button
        className={`pagination-button ${
          currentPage === 1 ? "disabled cursor-not-allowed" : ""
        }`}
        area-label={`Click here to go to previous page ${
          currentPage === 1 ? "disabled" : ""
        }`}
        area-disabled={`${currentPage === 1 ? "true" : "false"}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <MdiChevronLeft className="text-base" />
      </button>

      {/* pagination input value here  */}
      <label
        area-label={`Showing result of page ${inputValue} of ${totalPages}`}
      >
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          // min={1}
          // placeholder={`Page ${currentPage}`}
        />
      </label>

      <span className="page-total text-primary-600 flex-none">
        of {totalPages ? totalPages : 0}
      </span>
      <button
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        area-label={`Click here to go to next page ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        area-disabled={`${currentPage === totalPages ? "true" : "false"}`}
      >
        <MdiChevronRight className="text-base" />
      </button>
      <button
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handlePageChange(totalPages)}
        area-label={`Move to last page ${currentPage === 1 ? "enab" : ""}`}
        area-disabled={`${currentPage === totalPages ? "true" : "false"}`}
      >
        <MdiChevronDoubleRight className="text-base" />
      </button>
    </div>
  ) : null;
}
export default CustomPagination;
