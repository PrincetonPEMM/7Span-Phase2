import React, { useState } from "react";

const Checkbox = (props) => {
  const {
    item: { id, key, label, isChecked },
    setFilterItem,
  } = props;

  const changeHandler = (isFocus) => {
    console.log(label, "Checkbox");
    if (isFocus)
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
      <label
        className="checkbox focus:outline-1 focus:outline-secondary-500 flex items-center"
        htmlFor={id}
      >
        <input
          type="checkbox"
          name={label + " " + id}
          checked={isChecked}
          id={id}
          defaultChecked={isChecked}
          onChange={changeHandler}
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13) changeHandler(true);
          //   if (e.keyCode === 9) changeHandler(false);
          // }}
          className={`checkbox-input  focus:outline-1 focus:outline-secondary-500 ${
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
