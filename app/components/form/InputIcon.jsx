import React from "react";

const InputIcon = ({
  label,
  previewClass,
  checked,
  onChange,
  icon,
  name,
  checkClass,
}) => {
  return (
    <div className="inline-flex m-1 items-center py-1 px-2 relative space-x-1 iconcheck">
      {icon && (
        <span className={`w-4 h-4 relative z-10 ${previewClass}`}>{icon}</span>
      )}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={`absolute appearance-none  cursor-pointer rounded-full inset-0 bg-transparent border-0 h-full w-full ${checkClass}`}
      />

      {label && <span className=" text-sm capitalize">{label}</span>}
    </div>
  );
};

export default InputIcon;
