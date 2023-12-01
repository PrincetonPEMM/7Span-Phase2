import React, { useState } from "react";

const Checkbox = (props) => {
  const {
    item: { id, key, label, isChecked },
    setFilterItem,
  } = props;

  const changeHandler = () => {
    setFilterItem((prevState) => ({
      ...prevState,
      checkItem: {
        ...prevState.checkItem,
        [key]: {
          ...prevState.checkItem[key],
          isChecked: !isChecked,
        },
      },
    }));
  };

  return (
    <>
      <label className="checkbox flex items-center" htmlFor={label + " " + id}>
        <input
          type="checkbox"
          name={label + " " + id}
          checked={isChecked}
          defaultChecked={isChecked}
          onChange={changeHandler}
          className={`checkbox-input  focus:ring-0 ${
            isChecked ? "checked" : ""
          }`}
        />
        <span className="checkmark"></span>
        {label && <span className="ml-4 text-sm">{label}</span>}
      </label>
    </>
  );
};

export default Checkbox;
