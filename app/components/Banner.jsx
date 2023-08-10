import React from "react";
import BannerDetail from "./BannerDetail";
import SubBanner from "./SubBanner";

const Banner = ({ data, setSelectedBanner, selectedBanner }) => {
  return (
    <div className="relative ">
      <button
        className="w-full aspect-auto md:h-full h-full"
        onClick={() => {
          selectedBanner.img === data.img
            ? setSelectedBanner({})
            : setSelectedBanner(data);
        }}
      >
        <div className="relative flex lg:h-full text-left z-30">
          {
            <img
              src={data.img}
              alt="Picture of the author"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%",
              }}
              property="true"
            />
          }

          <div className="absolute m-auto top-1/3 z-10 text-white px-10">
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
          <SubBanner stories={data?.storyPart} divClass="" />
        </div>
      )}
    </div>
  );
};

export default Banner;
