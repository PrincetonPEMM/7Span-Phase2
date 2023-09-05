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
import Radio from "./form/Radio";
import MdiReload from "@/assets/icons/MdiReload";

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
  onReset,
}) => {
  return (
    <div className=" w-full rounded-md text-white">
      <div className="flex items-center justify-between sticky z-10 top-0 bg-primary-500">
        <button
          onClick={onClick}
          className="sticky top-0 block py-2 bg-primary-500 z-20 "
        >
          <MdiMenuOpen className="text-white-500 h-6 w-6" />
        </button>
        {/* <button
          onClick={onReset}
          className="sticky top-0 py-2 text-offWhite-500 inline-flex items-center z-20 text-sm"
        >
          Clear All <MdiReload className="text-white-500 h-5 w-5 ml-2" />
        </button> */}
      </div>

      <div className="block mt-3">
        <div>
          <lable className="text-white text-lg block mb-3">
            {filterItem.title}
          </lable>
          {Object.values(filterItem.checkItem)?.map((item, index) =>
            item.isCheckbox ? (
              <Checkbox item={item} key={index} setFilterItem={setFilterItem} />
            ) : (
              <Radio
                item={item}
                key={index}
                setFilterItem={setFilterItem}
                name={item.name}
              />
            )
          )}
        </div>
      </div>
      <div className="block mt-7">
        <lable className="text-white text-lg block mb-3">
          {isPageName === STORIES && "Story's Date of Origin"}
          {isPageName === MANUSCRIPTS && "Manuscript's Date of Creation"}
        </lable>
        <RangeSlider
          isPageName={isPageName}
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
          <div className="mt-5 flex items-start flex-wrap">
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
          isPageName={isPageName}
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
          isPageName={isPageName}
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
            Manuscript's Number of Unique Stories
          </lable>
          <RangeSlider
            isPageName={isPageName}
            min={rangeSliderMinUniqueStoriesManuscriptsPage}
            max={rangeSliderMaxUniqueStoriesManuscriptsPage}
            onChange={onChangeUnique}
          />
        </div>
      )}
      {isPageName === MANUSCRIPTS && (
        <div className="block mt-10">
          <lable className="text-white text-lg block">{placeItem?.title}</lable>
          <div className="mt-5 flex items-start flex-wrap">
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
