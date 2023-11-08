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
    <div className="relative pt-5 bg-secondary-500 text-center md:text-center md:pt-0 block">
      {/*     
      <div
        className={`relative aspect-square lg:aspect-auto max-w-xs h-auto flex items-center justify-start my-auto lg:max-w-none mx-auto md:mr-0 md:w-3/6 lg:max-h-[600px] ${divClass}`}
      >
        {
          <img
            src={img}
            alt="Picture of the author"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              width: "100%",
              height: "100%",
              "@media (max-width: 768px)": {
                height: "auto",
                aspectRaio: "1/1",
                maxWidth: "100%",
              },
            }}
          />
        }
      </div> */}

      <div className="w-full col-span-2 flex text-white bg-secondary-500">
        <div className="z-10 space-y-2 p-5 md:p-10 max-w-6xl mx-auto">
          <h3 className="text-xl font-header sm:text-3xl xl:text-4xl">
            {title}
          </h3>
          <p
            className="text-sm font-body md:text-lg xl:text-2xl"
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
        >
          <MdiClose className=" text-white" />
        </button>
      </div>
    </div>
  );
};

export default BannerDetail;
