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
      className={`inline-flex m-1 items-center cursor-pointer py-1 px-3 relative iconcheck   ${
        item?.isChecked && "isChecked"
      }`}
      onClick={clickHandler}
    >
      {item?.icon && (
        <span
          className={`w-3 h-3 mr-1 relative z-10 ${
            item?.isChecked ? "text-white" : ""
          } `}
        >
          <MdiLocateIcon
            className={` ${item?.isChecked ? "text-white " : "text-black"}`}
          />
        </span>
      )}
      <input
        type="checkbox"
        name={item?.id}
        checked={item?.isChecked}
        className={`absolute appearance-none  cursor-pointer rounded-full inset-0 border-0 h-full w-full ${
          item.icon ? " ml-0" : ""
        }
        focus:ring-0`}
      />

      {item?.label && (
        <span className="text-sm capitalize ">{item?.label}</span>
      )}
    </div>
  );
};

export default React.memo(InputIcon);
