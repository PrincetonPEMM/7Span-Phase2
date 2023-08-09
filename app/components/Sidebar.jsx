import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import React from "react";
import Checkbox from "./form/Checkbox";
import RangeSlider from "./form/RangeSlider";

const Sidebar = () => {
  const filterItem = [
    {
      title: "Filtered Search",
      checkItem: [
        {
          name: "1",
          labelBefore: "Paintings",
        },
        {
          name: "2",
          labelBefore: "Paintings",
        },
        {
          name: "3",
          labelBefore: "Paintings",
        },
        {
          name: "4",
          labelBefore: "Paintings",
        },
      ],
    },
  ];
  return (
    <div className="font-menu bg-primary-500 w-full rounded-md text-white h-full p-4 space-y-5">
      <button>
        <MdiMenuOpen className="text-white-500" />
      </button>
      <div>
        {filterItem?.map((item, index) => (
          <div key={index}>
            <lable className="text-white text-lg block mb-3">
              {item.title}
            </lable>
            {item.checkItem?.map((item, index) => (
              <Checkbox
                labelBefore={item.labelBefore}
                key={index}
                name={item.name}
                check_class={"checkbox_input"}
              />
            ))}
          </div>
        ))}
      </div>
      <RangeSlider onChange={() => {}} min={0} max={1000} />
    </div>
  );
};

export default Sidebar;
