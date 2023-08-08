import React, { useState } from "react";
import MdiClose from "@/assets/icons/MdiClose";

const Banner = ({
  image,
  title,
  description,
  data,
  setSelectedBanner,
  selectedBanner,
}) => {
  return (
    <div className="relative ">
      <button
        className="w-full aspect-auto md:h-full"
        onClick={() => {
          selectedBanner.img === data.img
            ? setSelectedBanner({})
            : setSelectedBanner(data);
        }}
      >
        <div className="relative flex h-full text-left z-30">
          {
            <img
              src={image}
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
              {title.split(" ")[0]}
            </span>
            <h3
              className="text-2xl lg:text-5xl leading-tight font-header uppercase"
              onClick={() => toggleContent(index)}
            >
              {title.split(" ")[1]}
            </h3>

            <p className="text-xs lg:text-base mt-1">{description}</p>
          </div>
        </div>
      </button>
      {/* Show the detailed view for the clicked item */}
      {selectedBanner.img === data.img && (
        <div className="md:hidden block">
          <div className="md:flex relative bg-secondary-500 text-center md:text-left">
            <div className="relative aspect-square lg:aspect-auto max-w-xs lg:max-w-none mx-auto md:mr-0 md:w-3/6 lg:max-h-[600px]">
              <img
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.img}`}
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
                <h3 className="text-2xl lg:text-5xl font-bold font-body">
                  Featured {data.title}
                </h3>
                <p className="text-sm md:text-base lg:text-xl">{data.text}</p>
              </div>
              <button
                className="absolute top-5 right-5 left-auto bottom-auto text-black"
                onClick={() => {
                  selectedBanner.img === data.img
                    ? setSelectedBanner({})
                    : setSelectedBanner(data);
                }}
              >
                <MdiClose />
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3">
            {data.storyPart &&
              data.storyPart.map((data, subIndex) => (
                <div
                  className="relative items-center justify-center uppercase text-center"
                  key={subIndex}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.img}`}
                    alt="Picture of the author"
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 30vw"
                  />
                  <div className="absolute flex items-center justify-center z-10 text-white space-y-4 px-10 w-full inset-0 bg-black bg-opacity-50 ">
                    <span className="text-lg lg:text-2xl font-bold font-body">
                      Story 1{data.title}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
