import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import React from "react";
import Checkbox from "./form/Checkbox";
import RangeSlider from "./form/RangeSlider";
import InputIcon from "./form/InputIcon";
import {
  MANUSCRIPTS,
  STORIES,
  rangeSliderMaxForManuscriptsStoriesPage,
  rangeSliderMaxForPaintingsStoriesPage,
  rangeSliderMaxForStoriesStoriesPage,
  rangeSliderMinForManuscriptsStoriesPage,
  rangeSliderMinForPaintingsStoriesPage,
  rangeSliderMinForStoriesStoriesPage,
  rangeSliderMinDateOfCreationManuscriptsPage,
  rangeSliderMaxDateOfCreationManuscriptsPage,
  rangeSliderMinNoOfStoriesManuscriptsPage,
  rangeSliderMaxNoOfStoriesManuscriptsPage,
  rangeSliderMinNoOfPaintingsManuscriptsPage,
  rangeSliderMaxNoOfPaintingsManuscriptsPage,
  rangeSliderMinUniqueStoriesManuscriptsPage,
  rangeSliderMaxUniqueStoriesManuscriptsPage,
} from "@/utils/constant";

const Sidebar = ({
  isPageName,
  onChangeStory,
  onChangeManuscript,
  onChangePainting,
  onChangeUnique,
  filterItem,
  setFilterItem,
  placeItem,
  setPlaceItem,
  langItem,
  setLangItem,
  onClick,
}) => {
  return (
    <div className="font-menu bg-primary-500 w-full rounded-md text-white">
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
          {isPageName === STORIES && "Story's Century of Origin"}
          {isPageName === MANUSCRIPTS && "Manuscript's Date of Creation"}
        </lable>
        <RangeSlider
          min={
            isPageName === STORIES
              ? rangeSliderMinForStoriesStoriesPage
              : rangeSliderMinDateOfCreationManuscriptsPage
          }
          max={
            isPageName === STORIES
              ? rangeSliderMaxForStoriesStoriesPage
              : rangeSliderMaxDateOfCreationManuscriptsPage
          }
          onChange={onChangeStory}
        />
      </div>
      {isPageName === STORIES && (
        <div className="block mt-10">
          <lable className="text-white text-lg block">{placeItem?.title}</lable>
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
      )}
      <div className="block mt-10">
        <lable className="text-white text-lg block mb-3">
          {isPageName === STORIES && " Manuscripts with Story"}
          {isPageName === MANUSCRIPTS && "Manuscript's Number of Stories"}
        </lable>
        <RangeSlider
          min={
            isPageName === STORIES
              ? rangeSliderMinForManuscriptsStoriesPage
              : rangeSliderMinNoOfStoriesManuscriptsPage
          }
          max={
            isPageName === STORIES
              ? rangeSliderMaxForManuscriptsStoriesPage
              : rangeSliderMaxNoOfStoriesManuscriptsPage
          }
          onChange={onChangeManuscript}
        />
      </div>
      <div className="block mt-10">
        <lable className="text-white text-lg block mb-3">
          {isPageName === STORIES && " Paintings of Story"}
          {isPageName === MANUSCRIPTS && "Manuscript's Number of Paintings"}
        </lable>
        <RangeSlider
          min={
            isPageName === STORIES
              ? rangeSliderMinForPaintingsStoriesPage
              : rangeSliderMinNoOfPaintingsManuscriptsPage
          }
          max={
            isPageName === STORIES
              ? rangeSliderMaxForPaintingsStoriesPage
              : rangeSliderMaxNoOfPaintingsManuscriptsPage
          }
          onChange={onChangePainting}
        />
      </div>
      {isPageName === MANUSCRIPTS && (
        <div className="block mt-10">
          <lable className="text-white text-lg block mb-3">
            Manuscript's Number of Unique Paintings
          </lable>
          <RangeSlider
            min={rangeSliderMinUniqueStoriesManuscriptsPage}
            max={rangeSliderMaxUniqueStoriesManuscriptsPage}
            onChange={onChangeUnique}
          />
        </div>
      )}
      {isPageName === MANUSCRIPTS && (
        <div className="block mt-10">
          <lable className="text-white text-lg block">{placeItem?.title}</lable>
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
      )}
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
