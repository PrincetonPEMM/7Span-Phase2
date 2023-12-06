import React from "react";
import MdiLocateIcon from "@/assets/icons/MdiMenuIcon copy";

const InputIcon = (props) => {
  const { item, itemList, setItemList } = props;

  const clickHandler = (isFocus) => {
    if (isFocus)
      if (itemList.isCheckbox) {
        const updatedPlace = itemList.checkItem.map((temp) => {
          if (temp.label === item?.label) {
            return { ...temp, isChecked: !item.isChecked };
          }
          return temp;
        });
        setItemList({ ...itemList, checkItem: updatedPlace });
      } else {
        const updatedPlace = itemList.checkItem.map((temp) => {
          if (temp.label === item?.label) {
            return { ...temp, isChecked: !item.isChecked };
          }
          return { ...temp, isChecked: false };
        });
        setItemList({ ...itemList, checkItem: updatedPlace });
      }
  };

  return (
    <label
      for={item?.label}
      className={`inline-flex m-1 items-center cursor-pointer py-1 px-2 h-6 relative iconcheck  ${
        item.icon ? "space-x-1 lg:space-x-0" : ""
      } ${item?.isChecked ? "isChecked" : "isNotChecked"}`}
      onClick={() => clickHandler(true)}
    >
      <input
        type="checkbox"
        name={item?.id}
        id={item?.label}
        checked={item?.isChecked}
        className={`absolute appearance-none opacity-0  cursor-pointer bg-transparent z-30 rounded-full 
        inset-0 border-0 h-full w-full focus-visible:bg-none focus:ring-1 focus:ring-secondary-500
        focus-visible:outline-1 focus-visible:bg-transparent focus-visible:border-0 ${
          item.icon ? " ml-0" : ""
        }
        focus:ring-1`}
        onKeyDown={(e) => {
          console.log(e, "Maulik Savaliya");
          if (e.key === "Enter") clickHandler(true);
          if (e.key === "Tab") clickHandler(false);
        }}
      />
      {item?.icon && (
        <span
          className={`w-4 h-4 relative z-10 mr-1 ${
            item?.isChecked ? "text-black" : ""
          } `}
        >
          <MdiLocateIcon
            className={` ${item?.isChecked ? "text-black" : "text-black"}`}
          />
        </span>
      )}
      {item?.label && (
        <>
          <span className="text-sm capitalize text-black leading-none z-10 ">
            {item?.label}
          </span>
          <span className="inputBefore"></span>
        </>
      )}
    </label>
  );
};

export default React.memo(InputIcon);
