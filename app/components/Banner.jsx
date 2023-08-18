import React from "react";
import BannerDetail from "./BannerDetail";
import SubBanner from "./SubBanner";
import MdiChevronDown from "@/assets/icons/MdiChevronDown";

const Banner = ({ data, setSelectedBanner, selectedBanner }) => {

  return (
    <div className="relative flex flex-col ">
      <button
        className="w-full aspect-auto banner-image"
        onClick={() => {
          selectedBanner.img === data.img
            ? setSelectedBanner({})
            : setSelectedBanner(data);
        }}
      >
        <div
          className="relative flex justify-start items-center bg-cover bg-top h-full text-left z-30"
          style={{ backgroundImage: `url(${data.img})` }}
        >
          <div className="z-10 text-white px-5 lg:px-10 pt-96 lg:pt-80 2xl:pt-72 ">
            <span className="text-sm lg:text-xl font-bold uppercase mr-1">
              {data.title.split(" ")[0]}
            </span>
            <h3
              className="text-2xl lg:text-5xl leading-tight font-header uppercase"
              // onClick={() => toggleContent(index)}
            >
              {data.title.split(" ")[1]}
            </h3>
            <div className="banner-content">
              <p className="text-xs lg:text-base mt-1">{data.description}</p>
              <a
                href={data.id}
                className={`text-background-500 text-3xl lg:text-6xl delay-75${
                  selectedBanner ? "rotate-90 " : "rotate-0"
                }`}
              >
                <MdiChevronDown />
              </a>
            </div>
          </div>
        </div>
      </button>
      {/* Show the detailed view for the clicked item */}
      {selectedBanner.img === data.img && (
        <div className="md:hidden block">
          <BannerDetail
            img={data?.img}
            title={data?.title}
            text={data?.text}
            data={data}
            setSelectedBanner={setSelectedBanner}
            clsBtnCondition={selectedBanner.img === data.img}
          />
          <SubBanner stories={data?.storyPart} />
        </div>
      )}
    </div>
  );
};

export default Banner;
