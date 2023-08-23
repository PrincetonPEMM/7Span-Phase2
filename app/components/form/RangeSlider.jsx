"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { MANUSCRIPTS, STORIES } from "@/utils/constant";

const RangeSlider = ({ isPageName, min, max, onChange }) => {
  const lowest = min;
  const largest = max;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    // For convert into 0 to 100 range.
    let min, max;
    if (isPageName === MANUSCRIPTS) {
      const total = largest - lowest;
      min = Math.round(((minVal - lowest) / total) * 100);
      max = Math.round(((maxVal - lowest) / total) * 100);
    }
    if (isPageName === STORIES) {
      min = Math.round(minVal);
      max = Math.round(maxVal);
    }
    onChange({ min, max });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full block py-3 my-5">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left bg-background-500"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track inline-block" />
        <div ref={range} className="slider__range inline-block" />
        <div className="slider__left-value inline-block">{minVal}</div>
        <div className="slider__right-value inline-block">{maxVal}</div>
      </div>
    </div>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(RangeSlider);
