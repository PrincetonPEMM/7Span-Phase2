import React, { useState } from "react";

const Radio = (props) => {
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
      <label className="radiobox flex items-center" htmlFor={id}>
        <input
          type="radio"
          name={id}
          checked={isChecked}
          onChange={changeHandler}
          defaultChecked
          className={`radiobox-input ${isChecked ? "checked" : ""}`}
        />
        <span className="radiomark"></span>
        {label && <span className="ml-4 text-sm">{label}</span>}
      </label>
    </>
  );
};

export default Radio;
