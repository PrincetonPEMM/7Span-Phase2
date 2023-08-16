import React from "react";
import MdiLocateIcon from "@/assets/icons/MdiMenuIcon copy";

const InputIcon = (props) => {
  const { item, itemList, setItemList } = props;

  const clickHandler = () => {
    const updatedPlace = itemList.checkItem.map((temp) => {
      if (temp.label === item?.label) {
        return { ...temp, isChecked: !item.isChecked };
      }
      return temp;
    });
    setItemList({ ...itemList, checkItem: updatedPlace });
  };

  return (
    <div
      className={`inline-flex m-1 items-center cursor-pointer py-1 px-2 relative iconcheck ${
        item.icon ? " space-x-1" : ""
      }`}
      onClick={clickHandler}
    >
      {item?.icon && (
        <span className={`w-3 h-3 relative z-10 `}>
          {item?.icon && <MdiLocateIcon />}
        </span>
      )}
      <input
        type="checkbox"
        name={item?.id}
        checked={item?.isChecked}
        className={`absolute appearance-none  cursor-pointer rounded-full inset-0  border-0 h-full w-full  
        `}
      />

      {item?.label && (
        <span className=" text-sm capitalize ">{item?.label}</span>
      )}
    </div>
  );
};

export default InputIcon;
