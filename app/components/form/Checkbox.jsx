import React, { useState } from "react";

const Checkbox = ({ labelBefore, checkClass, name }) => {
  const [checked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  return (
    <>
      <label className="checkbox flex items-center space-x-1" for={name}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`${checkClass} ${checked ? "checked" : ""}`}
          // className={`checkbox_input ${checked ? "checked" : ""}`}
        />
        <span className="checkmark"></span>
        {labelBefore && <span className="ml-1 text-base">{labelBefore}</span>}
      </label>
    </>
  );
};

export default Checkbox;
