import React, { useState } from "react";

const Radio = (props) => {
  const {
    item: { id, key, label, isChecked },
    name,
    setFilterItem,
  } = props;

  const changeHandler = (isFocus) => {
    if (isFocus)
      setFilterItem((prevState) => {
        const data = Object.values(prevState.checkItem).map((item) => {
          if ((item?.name === name) & (item.key !== key)) {
            return { [item.key]: { ...item, isChecked: false } };
          }
          if (item?.name === name) {
            return { [item.key]: { ...item, isChecked: true } };
          }
          return { [item.key]: item };
        });
        const resultObject = {};
        data.forEach((item) => {
          const key = Object.keys(item)[0];
          resultObject[key] = item[key];
        });
        return {
          ...prevState,
          checkItem: {
            ...resultObject,
          },
        };
      });
  };

  return (
    <>
      <label className="radiobox flex items-center" htmlFor={id}>
        <input
          type="radio"
          id={id}
          name={name}
          checked={isChecked}
          onChange={changeHandler}
          defaultChecked
          className={`radiobox-input ${isChecked ? "checked" : ""}`}
          onKeyDown={(e) => {
            if (e.keyCode === 13) changeHandler(true);
            if (e.keyCode === 9) changeHandler(false);
          }}
        />
        <span className="radiomark"></span>
        {label && (
          <span
            className={`ml-4 text-sm ${
              isChecked ? "checked text-secondary-500" : ""
            }`}
          >
            {label}
          </span>
        )}
      </label>
    </>
  );
};

export default Radio;
