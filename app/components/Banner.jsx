import React from "react";
import BannerDetail from "./BannerDetail";
import SubBanner from "./SubBanner";
import MdiChevronDown from "@/assets/icons/MdiChevronDown";
import Image from "next/image";

const Banner = ({ data, setSelectedBanner, selectedBanner }) => {
  return (
    <div className="relative flex flex-col">
      <button
        className="w-full aspect-auto h-full banner-image relative"
        onClick={() => {
          selectedBanner.img === data.img
            ? setSelectedBanner({})
            : setSelectedBanner(data);
        }}
      >
        <div className="relative hero-img">
          <Image
            src={data.img}
            width="400"
            alt={data.alt}
            height="700"
            layout="responsive"
            className="h-full bg-cover bg-top absolute inset-0"
          />
        </div>

        <div className="text-white h-auto text-left z-30 px-5 absolute bottom-3 lg:bottom-1 xl:bottom-10 2xl:bottom-12 ">
          <span className="text-sm xl:text-xl font-bold uppercase mr-1">
            {data.title.split(" ")[0]}
          </span>
          <h3
            className="text-xl leading-none font-header uppercase sm:text-3xl xl:text-5xl xl:leading-tight"
            // onClick={() => toggleContent(index)}
          >
            {data.title.split(" ")[1]}
          </h3>
          <div className="banner-content">
            <p className="text-xs mt-1 xl:text-base">{data.description}</p>
            <div
              className="mt-2 text-xs xl:mt-5"
              dangerouslySetInnerHTML={{ __html: data.credit }}
            ></div>

            <a
              href={data.id}
              className={`text-background-500 text-3xl delay-75${
                selectedBanner ? "rotate-90 " : "rotate-0"
              }`}
            >
              <MdiChevronDown />
            </a>
          </div>
        </div>
      </button>
      {/* Show the detailed view for the clicked item */}
      {selectedBanner.img === data.img && (
        <div className="md:hidden block" id="mobileScroll">
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
