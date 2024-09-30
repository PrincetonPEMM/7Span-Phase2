"use client"
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const RangeSlider = ({ min, max, onChange, ref1, areaLabel }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Calculate the minimum allowed difference (2% of the range)
  const minDifference = useCallback(
    () => Math.ceil((max - min) * 0.1),
    [min, max]
  );

  useImperativeHandle(ref1, () => ({
    reset() {
      setMinVal(min);
      setMaxVal(max);
      maxValRef.current = max;
      minValRef.current = min;
      return null;
    },
    set(minP, maxP) {
      setMinVal(minP);
      setMaxVal(maxP);
      minValRef.current = minP;
      maxValRef.current = maxP;
      return null;
    },
  }));

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    let min, max;
    min = Math.round(minVal);
    max = Math.round(maxVal);

    onChange({ min, max });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full block py-3 my-5">
      <label htmlFor={`Minimum value ${minVal} of ${areaLabel}`}>
        <input
          type="range"
          min={min}
          max={max}
          value={+minVal}
          onChange={(event) => {
            const value = Math.min(
              Number(event.target.value),
              +maxVal - minDifference()
            );
            setMinVal(value);
            minValRef.current = value;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" && +minVal > min) {
              const newValue = Math.max(+minVal - 1, min);
              setMinVal(newValue);
              minValRef.current = newValue;
            } else if (
              event.key === "ArrowRight" &&
              +minVal < +maxVal - minDifference()
            ) {
              const newValue = Math.min(+minVal + 1, +maxVal - minDifference());
              setMinVal(newValue);
              minValRef.current = newValue;
            }
          }}
          className="thumb thumb--left bg-offWhite-500 "
          style={{ zIndex: +minVal > max - 100 && "5" }}
        />
      </label>
      <label
        htmlFor={`Maximum value is ${maxVal} of ${areaLabel}`}
        className="rangeInput"
      >
        <input
          type="range"
          min={min}
          max={max}
          value={+maxVal}
          onChange={(event) => {
            const value = Math.max(
              Number(event.target.value),
              +minVal + minDifference()
            );
            setMaxVal(value);
            maxValRef.current = value;
          }}
          onKeyDown={(event) => {
            if (
              event.key === "ArrowLeft" &&
              +maxVal > +minVal + minDifference()
            ) {
              const newValue = Math.max(+maxVal - 1, +minVal + minDifference());
              setMaxVal(newValue);
              maxValRef.current = newValue;
            } else if (event.key === "ArrowRight" && +maxVal < max) {
              const newValue = Math.min(+maxVal + 1, max);
              setMaxVal(newValue);
              maxValRef.current = newValue;
            }
          }}
          className="thumb thumb--right  "
        />
        <span></span>
      </label>

      <div className="slider">
        <div className="slider__track inline-block" />
        <button ref={range} className="slider__range inline-block" />
        <div className="slider__left-value inline-block">{minVal}</div>
        <div className="slider__right-value inline-block">{maxVal}</div>
      </div>
    </div>
  );
};

export default React.memo(RangeSlider);
