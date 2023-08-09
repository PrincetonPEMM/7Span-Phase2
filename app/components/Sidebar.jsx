import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import React from "react";
import Checkbox from "./form/Checkbox";
import RangeSlider from "./form/RangeSlider";
import InputIcon from "./form/InputIcon";
import MdiLocateIcon from "@/assets/icons/MdiMenuIcon copy";

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
  const checkItem = [
    {
      name: "1",
      icon: <MdiLocateIcon />,
    },
    {
      name: "2",
      icon: <MdiLocateIcon />,
    },
    {
      name: "3",
      icon: <MdiLocateIcon />,
    },
    {
      name: "4",
      icon: <MdiLocateIcon />,
    },
  ];
  const storyLang = [
    {
      name: "1",
      icon: <MdiLocateIcon />,
    },
    {
      name: "2",
      icon: <MdiLocateIcon />,
    },
    {
      name: "3",
      icon: <MdiLocateIcon />,
    },
    {
      name: "4",
      icon: <MdiLocateIcon />,
    },
  ];

  return (
    <div className="font-menu bg-primary-500 w-full h-full rounded-md text-white p-4 ">
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
                checkClass={"checkbox-input"}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="block">
        <RangeSlider onChange={() => {}} min={0} max={1000} />
      </div>

      <div className="block mt-10  ">
        <lable className="text-white text-lg block mb-3">
          Story's Place of Origin
        </lable>

        {checkItem?.map((item, index) => (
          <InputIcon
            label="input"
            key={index}
            name={item.name}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="block">
        <RangeSlider onChange={() => {}} min={0} max={1000} />
      </div>

      <div className="block mt-10  ">
        <lable className="text-white text-lg block mb-3">
          Languages of Story
        </lable>

        {storyLang?.map((item, index) => (
          <InputIcon label="input" key={index} name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
