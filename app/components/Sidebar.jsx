import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import React from "react";
import Checkbox from "./form/Checkbox";
import RangeSlider from "./form/RangeSlider";
import InputIcon from "./form/InputIcon";

const Sidebar = ({
  filterItem,
  setFilterItem,
  placeItem,
  setPlaceItem,
  langItem,
  setLangItem,
  storyMin,
  setStoryMin,
  storyMax,
  setStoryMax,
  manuscriptsMin,
  setManuscriptsMin,
  manuscriptsMax,
  setManuscriptsMax,
  paintingMin,
  setPaintingMin,
  paintingMax,
  setPaintingMax,
}) => {
  return (
    <div className="font-menu bg-primary-500 w-full rounded-md text-white p-4 ">
      <button>
        <MdiMenuOpen className="text-white-500" />
      </button>
      <div>
        <div>
          <lable className="text-white text-lg block mb-3">
            {filterItem.title}
          </lable>
          {Object.values(filterItem.checkItem)?.map((item, index) => (
            <Checkbox
              item={item}
              key={index}
              setFilterItem={setFilterItem}
              filterItem={filterItem}
            />
          ))}
        </div>
      </div>

      <div className="block">
        <lable className="text-white text-lg block mb-3">
          Story's Century of Origin
        </lable>
        <RangeSlider
          onChange={() => {}}
          minVal={storyMin}
          setMinVal={setStoryMin}
          maxVal={storyMax}
          setMaxVal={setStoryMax}
        />
      </div>

      <div className="block mt-10  ">
        <lable className="text-white text-lg block mb-3">
          {placeItem?.title}
        </lable>

        {placeItem?.checkItem.map((item, index) => (
          <InputIcon
            key={index}
            item={item}
            itemList={placeItem}
            setItemList={setPlaceItem}
          />
        ))}
      </div>

      <div className="block">
        <lable className="text-white text-lg block mb-3">
          Manuscripts with Story
        </lable>
        <RangeSlider
          onChange={() => {}}
          minVal={manuscriptsMin}
          setMinVal={setManuscriptsMin}
          maxVal={manuscriptsMax}
          setMaxVal={setManuscriptsMax}
        />
      </div>
      <div className="block">
        <lable className="text-white text-lg block mb-3">
          Paintings of Story
        </lable>
        <RangeSlider
          onChange={() => {}}
          minVal={paintingMin}
          setMinVal={setPaintingMin}
          maxVal={paintingMax}
          setMaxVal={setPaintingMax}
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
