import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import React, { useState } from "react";
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
import { useAmp } from "next/amp";
import FilterButton from "./form/FilterButton";

const Sidebar = ({
  childRef1,
  childRef2,
  childRef3,
  childRef4 = null,
  isPageName,
  areaLabel,
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
        {/* <button
          onClick={onClick}
          className="sticky top-0 block py-2 bg-primary-500 z-20"
          area-label={areaLabel}
        >
          <MdiMenuOpen className="text-white-500 h-6 w-6" />
        </button> */}
        <FilterButton
          onClick={onClick}
          area-label={areaLabel}
          className="sticky top-0 block py-2 bg-primary-500 z-20"
        />
        <button
          onClick={resetHandler}
          area-label="Clear all selected values"
          className="sticky top-0 py-2 text-offWhite-500 inline-flex items-center z-20 text-sm"
        >
          Clear All <MdiReload className="text-white-500 h-5 w-5 ml-2" />
        </button>
      </div>

      <div className="block mt-3">
        <div>
          <p className="text-white text-lg block mb-3">{filterItem.title}</p>
          {Object.values(filterItem.checkItem)?.map((item, index) =>
            item.isCheckbox ? (
              <Checkbox item={item} key={index} setFilterItem={setFilterItem} />
            ) : (
              <>
                {item.isFirstBreak && (
                  <div className="border-t mb-1 border-t-offWhite-500"></div>
                )}
                <Radio
                  item={item}
                  key={index}
                  setFilterItem={setFilterItem}
                  name={item.name}
                />
              </>
            )
          )}
        </div>
      </div>
      <div className="block mt-7">
        <p className="text-white text-lg block mb-3">
          {isPageName === STORIES && "Story's Earliest Date"}
          {isPageName === MANUSCRIPTS && "Manuscript's Date of Creation"}
        </p>
        <RangeSlider
          min={slider1InitMin}
          max={slider1InitMax}
          onChange={onChangeStory}
          ref1={childRef1}
        />
      </div>
      <div className="block mt-10">
        <p className="text-white text-lg block mb-3">
          {isPageName === STORIES && " Manuscripts with Story"}
          {isPageName === MANUSCRIPTS && "Manuscript's No. of Stories"}
        </p>
        <RangeSlider
          min={slider2InitMin}
          max={slider2InitMax}
          onChange={onChangeManuscript}
          ref1={childRef2}
        />
      </div>
      <div className="block mt-10">
        <p className="text-white text-lg block mb-3">
          {isPageName === STORIES && " Paintings of Story"}
          {isPageName === MANUSCRIPTS && "Manuscript's No. of Paintings"}
        </p>
        <RangeSlider
          min={slider3InitMin}
          max={slider3InitMax}
          onChange={onChangePainting}
          ref1={childRef3}
        />
      </div>
      {isPageName === MANUSCRIPTS && (
        <div className="block mt-10">
          <p className="text-white text-lg block mb-3">
            Manuscript's No. of Unique Stories
          </p>
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
          <p className="text-white text-lg block">{placeItem?.title}</p>
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
          <p className="text-white text-lg block">{placeItem?.title}</p>
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
      <div className="mt-5 flex items-start flex-wrap">
        <p className="text-white text-lg block mb-3">{langItem.title}</p>

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
          <p className="text-white text-lg block mb-3">
            {translatedItem.title}
          </p>

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
