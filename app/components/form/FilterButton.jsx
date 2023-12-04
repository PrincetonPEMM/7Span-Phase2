import MdiMenuOpen from "@/assets/icons/MdiMenuOpen";
import React from "react";

const FilterButton = ({ onClick, areaLabel, className }) => {
  console.log(areaLabel, "-----------------", className);
  return (
    <button onClick={onClick} area-label={areaLabel} className={className}>
      <MdiMenuOpen className="text-white-500 h-6 w-6 text-inherit" />
    </button>
  );
};

export default FilterButton;
