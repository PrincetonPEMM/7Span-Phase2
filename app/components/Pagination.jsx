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
    setInputValue(currentPage);
  }, [currentPage]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    // if (+value < 1) {
    //   setInputValue(1);
    //   onPageChange(1);
    // } else {
    setInputValue(value);
    onPageChange(value);
    // }
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
      <span
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(1)}
      >
        <MdiChevronDoubleLeft className="text-base" />
      </span>
      <span
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <MdiChevronLeft className="text-base" />
      </span>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        // min={1}
        // placeholder={`Page ${currentPage}`}
      />
      <span className="page-total text-primary-600 flex-none">
        of {totalPages ? totalPages : 0}
      </span>
      <span
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <MdiChevronRight className="text-base" />
      </span>
      <span
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handlePageChange(totalPages)}
      >
        <MdiChevronDoubleRight className="text-base" />
      </span>
    </div>
  ) : null;
}

export default CustomPagination;
