import MdiClose from "@/assets/icons/MdiClose";
import React from "react";

const BannerDetail = ({
  img,
  title,
  text,
  data,
  areaLabel,
  divClass,
  clsBtnCondition,
  setSelectedBanner,
}) => {
  console.log(areaLabel, "areaLabel");
  return (
    <div className="relative pt-5 bg-secondary-500 text-center md:text-center md:pt-0 block">
      <div className="w-full col-span-2 flex text-offBlack-500 bg-secondary-500">
        <div className="z-10 space-y-2 p-5 md:p-10 max-w-6xl mx-auto">
          <h3 className="text-xl font-header sm:text-3xl xl:text-4xl">
            {title}
          </h3>
          <p
            className="text-sm font-body md:text-lg xl:text-2xl banner-detail"
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          ></p>
        </div>
        <button
          className="absolute top-5 right-5 left-auto bottom-auto text-black z-10"
          onClick={() => {
            clsBtnCondition ? setSelectedBanner({}) : setSelectedBanner(data);
          }}
          area-label={areaLabel}
        >
          <MdiClose className=" text-black" />
        </button>
      </div>
    </div>
  );
};

export default BannerDetail;
