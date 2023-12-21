import MdiMagnify from "@/assets/icons/MdiMagnify";
import React from "react";

const InputText = ({
  id,
  label,
  value,
  onChange,
  magnify = false,
  placeholderText,
  previewClass,
  iconBefore,
  iconAfter,
  children,
  onKeyDown = () => {},
}) => {
  return (
    <fieldset className="w-full">
      {label && <legend className={previewClass}>{label}</legend>}
      {magnify && (
        <MdiMagnify className="h-4 w-4 md:h-6 md:w-6 absolute inset-y-0 left-3 md:left-5 my-auto text-primary-700" />
      )}
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
        className={`border-2 border-primary-500 bg-transparent focus:bg-transparent active:bg-transparent focus-visible:bg-transparent rounded-md w-full  text-sm md:text-lg ring-0 focus:ring-0 focus:border-primary-400 focus:ring-primary-400 outline-0 ${
          magnify ? "pl-7 md:pl-12 p-2" : "pl-5"
        }  ${iconAfter ? "pr-8 md:pr-12" : "pr-10"}`}
        onKeyDown={onKeyDown}
      />
      {iconBefore && children}
      <span>{label}</span>
      {iconAfter && children}
    </fieldset>
  );
};

export default InputText;
