import MdiChevronDoubleLeft from "@/assets/icons/MdiChevronDoubleLeft";
import MdiChevronDoubleRight from "@/assets/icons/MdiChevronDoubleRight";
import MdiChevronLeft from "@/assets/icons/MdiChevronLeft";
import MdiChevronRight from "@/assets/icons/MdiChevronRight";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

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

function CustomPagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  localData = { of: "of", showing_result_of_page: "Showing result of page" },
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
        area-label={`${localData?.showing_result_of_page} ${inputValue} ${localData?.of} ${totalPages}`}
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
        {localData?.of} {totalPages ? totalPages : 0}
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
