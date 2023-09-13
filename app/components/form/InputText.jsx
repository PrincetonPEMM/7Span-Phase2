import MdiMagnify from "@/assets/icons/MdiMagnify";
import React from "react";

const InputText = ({
  label,
  value,
  onChange,
  magnify = false,
  placeholderText,
  previewClass,
  iconBefore,
  iconAfter,
  children,
}) => {
  console.log(magnify ? "md:pl-10 lg:pl-20 p-2" : " md:pl-5");
  return (
    <div className="w-full">
      {label && <label className={previewClass}>{label}</label>}
      {magnify && (
        <MdiMagnify className="h-4 w-4 md:h-6 md:w-6 absolute inset-y-0 left-3 md:left-5 my-auto text-primary-700" />
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
        className={`border-2 border-primary-500 bg-transparent rounded-md w-full  text-sm md:text-lg ring-0 focus:ring-0 focus:border-primary-400 focus:ring-primary-400 outline-0 ${
          magnify ? "pl-7 md:pl-12 p-2" : "pl-5"
        }`}
      />
      {iconBefore && children}
      <span>{label}</span>
      {iconAfter && children}
    </div>
  );
};

export default InputText;
