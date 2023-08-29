import React from "react";

const InputText = ({
  label,
  value,
  onChange,
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
        className="border-2 border-primary-500 bg-transparent rounded-md w-full p-3 text-lg ring-0 focus:ring-0 focus:border-primary-400 focus:ring-primary-400 outline-0 "
      />
      {iconBefore && children}
      <span>{label}</span>
      {iconAfter && children}
    </div>
  );
};

export default InputText;
