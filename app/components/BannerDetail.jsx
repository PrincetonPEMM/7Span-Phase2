import MdiClose from "@/assets/icons/MdiClose";
import React from "react";

const BannerDetail = ({
  img,
  title,
  text,
  data,
  divClass,
  clsBtnCondition,
  setSelectedBanner,
}) => {
  return (
    <div className="md:flex relative bg-secondary-500 text-center md:text-left">
      <div
        className={`relative aspect-square lg:aspect-auto max-w-xs lg:max-w-none mx-auto md:mr-0 md:w-3/6 lg:max-h-[600px] ${divClass}`}
      >
        <img
          src={img}
          alt="Picture of the author"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            width: "100%",
            height: "100%",
            "@media (max-width: 1024px)": {
              height: "auto",
              aspectRaio: "1/1",
              maxWidth: "100%",
            },
          }}
        />
      </div>
      <div className="w-full col-span-2 flex text-white bg-secondary-500">
        <div className=" z-10 space-y-4 p-10 max-w-3xl">
          <h3 className="text-2xl lg:text-5xl font-bold font-body">{title}</h3>
          <p className="text-sm md:text-base lg:text-xl">{text}</p>
        </div>
        <button
          className="absolute top-5 right-5 left-auto bottom-auto text-black"
          onClick={() => {
            clsBtnCondition ? setSelectedBanner({}) : setSelectedBanner(data);
          }}
        >
          <MdiClose />
        </button>
      </div>
    </div>
  );
};

export default BannerDetail;
