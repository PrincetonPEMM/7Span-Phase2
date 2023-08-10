import ReactPaginate from "react-paginate";
import MdiArrowUp from "../assets/icons/MdiArrowUp";

export const Pagination = ({ meta, onPageChange, ...rest }) => {
  let pageCount = Math.ceil(meta.total / meta.per_page);
  return (
    <div className="pc-relative">
      {pageCount > 1 ? (
        <ReactPaginate
          className="pc-fixed pc-inset-x-0 pc-bottom-0 pc-flex pc-max-w-full pc-justify-center pc-bg-gray-50 pc-py-2 lg:pc-ml-auto lg:pc-max-w-[83%] lg:pc-py-6 "
          breakLabel="..."
          pageClassName="pc-flex pc-h-10 pc-min-w-[50px] pc-items-center pc-justify-center pc-border pc-border-primary-500 pc-p-2 pc-text-base pc-text-primary-400"
          nextLabel={<NextPage meta={meta} />}
          pageCount={Math.ceil(meta.total / meta.per_page)}
          previousLabel={<PrevPage meta={meta} />}
          renderOnZeroPageCount={null}
          onPageChange={onPageChange}
          activeClassName="!pc-bg-primary-500 !pc-text-white"
          {...rest}
        />
      ) : null}
    </div>
  );
};

export const PaginationLoader = () => {
  return (
    <>
      <div className="pc-relative">
        <div className="pc-mb-4 pc-flex pc-h-1.5 pc-overflow-hidden pc-text-xs">
          <div
            style={{ width: "100%" }}
            className="pc-h-full pc-w-0 pc-animate-ping pc-bg-blue-500"
          ></div>
        </div>
      </div>
    </>
  );
};

const NextPage = ({ meta }) => {
  return (
    <>
      <span
        className={`pc-flex pc-h-10 pc-min-w-[50px] pc-items-center pc-justify-center pc-p-2 pc-text-base   ${
          meta.current_page === meta.last_page
            ? " pc-text-slate-300"
            : "pc-text-primary-400"
        }`}
      >
        <MdiArrowUp className="pc-h-6 pc-w-6 pc-rotate-90" />
      </span>
    </>
  );
};

const PrevPage = ({ meta }) => {
  return (
    <>
      <span
        className={`pc-flex pc-h-10 pc-min-w-[50px] pc-items-center pc-justify-center pc-p-2 pc-text-base ${
          meta.current_page === 1 ? " pc-text-slate-300" : "pc-text-primary-400"
        }`}
      >
        <MdiArrowUp className="pc-h-6 pc-w-6 -pc-rotate-90" />
      </span>
    </>
  );
};
