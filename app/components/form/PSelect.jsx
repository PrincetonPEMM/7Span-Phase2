"use client";
import { Listbox } from "@headlessui/react";
import MdiChevronDown from "@assets/icons/MdiChevronDown";
const PSelect = ({
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
    <div className={`select w-full md:min-w-[150px] ${previewClass}`}>
      <Listbox value={selected} onChange={onChange}>
        <Listbox.Label className="mb-1 block text-base font-medium text-primary-500">
          {label}
        </Listbox.Label>
        <div
          className={`relative w-full rounded-md border border-gray-300 text-xs font-medium tracking-wide text-primary-500 placeholder:text-slate-400 ${
            disabled ? "cursor-not-allowed" : ""
          }`}
        >
          <div>
            <Listbox.Button
              className={`relative block w-full overflow-auto rounded-md bg-background-500 py-2 pl-4 pr-6 text-left text-sm focus-visible:outline-0 ${
                disabled ? "pointer-events-none" : ""
              }`}
            >
              <span className={selected?.name ? "" : "text-slate-400"}>
                {selected?.name ? selected.name : placeholder}
              </span>
              <span className="absolute inset-y-0 left-auto right-1 flex w-8 items-center justify-center text-xl">
                <MdiChevronDown className="w-4" />
              </span>
            </Listbox.Button>
          </div>
          <Listbox.Options className="select-option shadow absolute inset-x-0 top-10 z-20 max-h-40 cursor-pointer overflow-y-auto border-primary-500  bg-background-500 text-xs outline-0 focus-visible:outline-0">
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
        className="listoption px-4 py-1 text-sm text-primary-500 "
      >
        {optName}
      </Listbox.Option>
    </>
  );
};

PSelect.defaultProps = {
  placeholder: "Select",
  previewClass: "",
};

export default PSelect;
