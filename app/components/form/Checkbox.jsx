import React, { useState } from "react";

const Checkbox = (props) => {
  const {
    item: { id, label, isChecked },
    setFilterItem,
    filterItem,
  } = props;

  const changeHandler = () => {
    console.log("Hello");
    const updatedFilter = Object.values(filterItem.checkItem).map((item) => {
      if (item.label === label) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    console.log(updatedFilter, "UpdateFilter");
    setFilterItem({ ...filterItem, checkItem: updatedFilter });
  };

  return (
    <>
      <label className="checkbox flex items-center" htmlFor={id}>
        <input
          type="checkbox"
          name={id}
          checked={isChecked}
          onChange={changeHandler}
          className={`checkbox-input ${isChecked ? "checked" : ""}`}
        />
        <span className="checkmark"></span>
        {label && <span className="ml-4 text-sm">{label}</span>}
      </label>
    </>
  );
};

export default Checkbox;
