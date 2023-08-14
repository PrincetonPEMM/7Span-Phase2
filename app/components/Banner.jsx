import React from "react";
import BannerDetail from "./BannerDetail";
import SubBanner from "./SubBanner";

const Banner = ({ data, setSelectedBanner, selectedBanner }) => {
  return (
    <div className="relative flex flex-col">
      <button
        className="w-full aspect-auto md:h-full lg:h-full"
        onClick={() => {
          selectedBanner.img === data.img
            ? setSelectedBanner({})
            : setSelectedBanner(data);
        }}
      >
        <div
          className="relative flex justify-center items-center bg-cover bg-top h-screen text-left z-30"
          style={{ backgroundImage: `url(${data.img})` }}
        >
          <div className="m-auto z-10 text-white px-10">
            <span className="text-sm lg:text-xl font-bold uppercase mr-1">
              {data.title.split(" ")[0]}
            </span>
            <h3
              className="text-2xl lg:text-5xl leading-tight font-header uppercase"
              onClick={() => toggleContent(index)}
            >
              {data.title.split(" ")[1]}
            </h3>

            <p className="text-xs lg:text-base mt-1">{data.description}</p>
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
            divClass=""
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
