"use client";
import { Listbox } from "@headlessui/react";
import MdiChevronDown from "@assets/icons/MdiChevronDown";
const Select = ({
  selected,
  label,
  onChange,
  children,
  errorMsg,
  touched,
  disabled,
  previewClass,
  placeholder,
}) => {
  return (
    <div className={`select w-full  ${previewClass}`}>
      <Listbox value={selected} onChange={onChange}>
        <Listbox.Label className="mb-1 block text-base font-body font-medium text-primary-500">
          {label}
        </Listbox.Label>
        <div
          className={`relative w-full rounded-md font-body border placeholder:text-white border-gray-300 text-xs font-medium tracking-wide text-primary-500  ${
            disabled ? "cursor-not-allowed" : ""
          }`}
        >
          <div>
            <Listbox.Button
              className={`relative block w-full rounded-md overflow-auto text-white bg-primary-500 py-2 pl-4 pr-6 text-left text-sm focus-visible:outline-0 ${
                disabled ? "pointer-events-none" : ""
              }`}
            >
              <span className={selected?.name ? "" : "text-white"}>
                {selected?.name ? selected.name : placeholder}
              </span>
              <span className="absolute inset-y-0 left-auto right-1 flex w-8 items-center justify-center text-xl">
                <MdiChevronDown className="w-4" />
              </span>
            </Listbox.Button>
          </div>
          <Listbox.Options className="select-option shadow absolute inset-x-0 top-10 z-20 max-h-40 cursor-pointer overflow-y-auto border-primary-500 text-white bg-primary-500 text-xs outline-0 focus-visible:outline-0">
            {children}
          </Listbox.Options>
        </div>
      </Listbox>
      {errorMsg && touched ? (
        <span className="error mt-1 text-xs text-danger-500">{errorMsg}</span>
      ) : null}
    </div>
  );
};

export const POption = ({ id: optId, name: optName }) => {
  return (
    <>
      <Listbox.Option
        value={{
          id: optId,
          name: optName,
        }}
        className="listoption px-4 py-1 text-sm text-primary-500 transition-all duration-100 hover:transition-all bg-white hover:bg-primary-500 hover:text-white"
      >
        {optName}
      </Listbox.Option>
    </>
  );
};

Select.defaultProps = {
  placeholder: "Select",
  previewClass: "",
};

export default Select;
