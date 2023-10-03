import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import React, { useRef } from "react";
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
  translatedItem = "",
  setTranslatedItem = () => {},
  onClick,
  resetFilter,
}) => {
  const slider1InitMin =
    isPageName === STORIES
      ? rangeSliderMinForStoriesStoriesPage
      : rangeSliderMinDateOfCreationManuscriptsPage;
  const slider1InitMax =
    isPageName === STORIES
      ? rangeSliderMaxForStoriesStoriesPage
      : rangeSliderMaxDateOfCreationManuscriptsPage;
  const slider2InitMin =
    isPageName === STORIES
      ? rangeSliderMinForManuscriptsStoriesPage
      : rangeSliderMinNoOfStoriesManuscriptsPage;
  const slider2InitMax =
    isPageName === STORIES
      ? rangeSliderMaxForManuscriptsStoriesPage
      : rangeSliderMaxNoOfStoriesManuscriptsPage;
  const slider3InitMin =
    isPageName === STORIES
      ? rangeSliderMinForPaintingsStoriesPage
      : rangeSliderMinNoOfPaintingsManuscriptsPage;
  const slider3InitMax =
    isPageName === STORIES
      ? rangeSliderMaxForPaintingsStoriesPage
      : rangeSliderMaxNoOfPaintingsManuscriptsPage;
  const slider4InitMin = rangeSliderMinUniqueStoriesManuscriptsPage;
  const slider4InitMax = rangeSliderMaxUniqueStoriesManuscriptsPage;
  const childRef1 = useRef();
  const childRef2 = useRef();
  const childRef3 = useRef();
  const childRef4 = useRef();

  const resetHandler = () => {
    resetFilter();
    childRef1?.current?.reset();
    childRef2?.current?.reset();
    childRef3?.current?.reset();
    childRef4?.current?.reset();
  };

  return (
    <div className=" w-full rounded-md text-white">
      <div className="flex items-center justify-between sticky z-20 top-0 bg-primary-500">
        <button
          onClick={onClick}
          className="sticky top-0 block py-2 bg-primary-500 z-20"
        >
          <MdiMenuOpen className="text-white-500 h-6 w-6" />
        </button>
        <button
          onClick={resetHandler}
          className="sticky top-0 py-2 text-offWhite-500 inline-flex items-center z-20 text-sm"
        >
          Clear All <MdiReload className="text-white-500 h-5 w-5 ml-2" />
        </button>
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
          min={slider1InitMin}
          max={slider1InitMax}
          onChange={onChangeStory}
          ref1={childRef1}
        />
      </div>
      <div className="block mt-10">
        <lable className="text-white text-lg block mb-3">
          {isPageName === STORIES && " Manuscripts with Story"}
          {isPageName === MANUSCRIPTS && "Manuscript's No. of Stories"}
        </lable>
        <RangeSlider
          min={slider2InitMin}
          max={slider2InitMax}
          onChange={onChangeManuscript}
          ref1={childRef2}
        />
      </div>
      <div className="block mt-10">
        <lable className="text-white text-lg block mb-3">
          {isPageName === STORIES && " Paintings of Story"}
          {isPageName === MANUSCRIPTS && "Manuscript's No. of Paintings"}
        </lable>
        <RangeSlider
          min={slider3InitMin}
          max={slider3InitMax}
          onChange={onChangePainting}
          ref1={childRef3}
        />
      </div>
      {isPageName === MANUSCRIPTS && (
        <div className="block mt-10">
          <lable className="text-white text-lg block mb-3">
            Manuscript's No. of Unique Stories
          </lable>
          <RangeSlider
            min={slider4InitMin}
            max={slider4InitMax}
            onChange={onChangeUnique}
            ref1={childRef4}
          />
        </div>
      )}
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
            key={index}
            item={item}
            itemList={langItem}
            setItemList={setLangItem}
          />
        ))}
      </div>
      {isPageName === STORIES && (
        <div className="block mt-10">
          <lable className="text-white text-lg block mb-3">
            {translatedItem.title}
          </lable>

          {translatedItem?.checkItem.map((item, index) => (
            <InputIcon
              key={index}
              item={item}
              itemList={translatedItem}
              setItemList={setTranslatedItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
