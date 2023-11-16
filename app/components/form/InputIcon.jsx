import React from "react";
import MdiLocateIcon from "@/assets/icons/MdiMenuIcon copy";

const InputIcon = (props) => {
  const { item, itemList, setItemList } = props;

  const clickHandler = () => {
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
    <div
      className={`inline-flex m-1 items-center cursor-pointer py-1 px-2 h-6 relative iconcheck  ${
        item.icon ? "space-x-1 lg:space-x-0" : ""
      } ${item?.isChecked && "isChecked"}`}
      onClick={clickHandler}
    >
      {item?.icon && (
        <span
          className={`w-4 h-4 relative z-10  mr-1 ${
            item?.isChecked ? "text-white" : ""
          } `}
        >
          <MdiLocateIcon
            className={` ${item?.isChecked ? "text-white" : "text-black"}`}
          />
        </span>
      )}
      <input
        type="checkbox"
        name={item?.id}
        checked={item?.isChecked}
        className={`absolute appearance-none  cursor-pointer rounded-full inset-0 border-0 h-full w-full focus-visible:bg-none focus-visible:outline-0 focus-visible:bg-transparent focus-visible:border-0 ${
          item.icon ? " ml-0" : ""
        }
        focus:ring-0`}
      />
      {item?.label && (
        <span className="text-sm capitalize leading-none ">{item?.label}</span>
      )}
    </div>
  );
};

export default React.memo(InputIcon);
