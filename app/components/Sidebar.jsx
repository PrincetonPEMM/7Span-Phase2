import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import React from "react";
import Checkbox from "./form/Checkbox";
import RangeSlider from "./form/RangeSlider";
import InputIcon from "./form/InputIcon";
import {
  rangeSliderMaxForManuscripts,
  rangeSliderMaxForPaintings,
  rangeSliderMaxForStories,
  rangeSliderMinForManuscripts,
  rangeSliderMinForPaintings,
  rangeSliderMinForStories,
} from "@/utils/constant";

const Sidebar = ({
  onChangeStory,
  onChangeManuscript,
  onChangePainting,
  filterItem,
  setFilterItem,
  placeItem,
  setPlaceItem,
  langItem,
  setLangItem,
  onClick,
}) => {
  return (
    <div className="font-menu bg-primary-500 w-full rounded-md text-white  ">
      <button onClick={onClick} className="">
        <MdiMenuOpen className="text-white-500 h-6 w-6" />
      </button>
      <div className="block mt-3">
        <div>
          <lable className="text-white text-lg block mb-3">
            {filterItem.title}
          </lable>
          {Object.values(filterItem.checkItem)?.map((item, index) => (
            <Checkbox item={item} key={index} setFilterItem={setFilterItem} />
          ))}
        </div>
      </div>

      <div className="block mt-7">
        <lable className="text-white text-lg block mb-3">
          Story's Century of Origin
        </lable>
        <RangeSlider
          min={rangeSliderMinForStories}
          max={rangeSliderMaxForStories}
          onChange={onChangeStory}
        />
      </div>

      <div className="block mt-10">
        <lable className="text-white text-lg block">
          {placeItem?.title} hello
        </lable>
        <div className="mt-5">
          {placeItem?.checkItem.map((item, index) => (
            <InputIcon
              key={index}
              item={item}
              itemList={placeItem}
              setItemList={setPlaceItem}
            />
          ))}
        </div>
      </div>

      <div className="block mt-10">
        <lable className="text-white text-lg block mb-3">
          Manuscripts with Story
        </lable>
        <RangeSlider
          min={rangeSliderMinForManuscripts}
          max={rangeSliderMaxForManuscripts}
          onChange={onChangeManuscript}
        />
      </div>
      <div className="block mt-10">
        <lable className="text-white text-lg block mb-3">
          Paintings of Story
        </lable>
        <RangeSlider
          min={rangeSliderMinForPaintings}
          max={rangeSliderMaxForPaintings}
          onChange={onChangePainting}
        />
      </div>

      <div className="block mt-10">
        <lable className="text-white text-lg block mb-3">
          {langItem.title}
        </lable>

        {langItem?.checkItem.map((item, index) => (
          <InputIcon
            label="input"
            key={index}
            item={item}
            itemList={langItem}
            setItemList={setLangItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
