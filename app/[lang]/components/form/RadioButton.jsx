import React from "react";

const RadioButton = ({ label, value, checked, onChange }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
