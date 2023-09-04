import React from "react";

const InputText = ({
  label,
  value,
  onChange,
  placeholderText,
  previewClass,
  iconBefore,
  iconAfter,
  children,
}) => {
  return (
    <div className="w-full">
      {label && <label className={previewClass}>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
        className="border-2 border-primary-500 bg-transparent rounded-sm w-full p-2 pl-7 md:pl-12 text-sm md:text-lg ring-0 focus:ring-0 focus:border-primary-400 focus:ring-primary-400 outline-0 "
      />
      {iconBefore && children}
      <span>{label}</span>
      {iconAfter && children}
    </div>
  );
};

export default InputText;
