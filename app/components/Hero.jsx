"use client";
import React, { useState } from "react";
// Import from the correct package
import Link from "next/link";
import img1 from "@assets/images/stories-bg.png";
import img2 from "../../assets/images/menuscript-bg.png";
import img from "../../assets/images/paintings-bg.png";
import Image from "next/image";
import MdiClose from "@/assets/icons/MdiClose";

const Hero = () => {
  // ...
  const [isOpen, setisOpen] = useState({});
  const [isShow, setisShow] = useState({});
  const [bannerIndex, setBannerIndex] = useState(null);

  const bannerItems = [
    {
      img: img1,
      title: "Stories",
      text: "Stories about the Virgin Mary in Ethiopia, Eritrea, and Egypt are vivid, profound, and sometimes historicallyvaluable. The staff of PEMM has selected three stories that best represent thegenre",
    },
    {
      img: img2,
      title: "MenuScripts",
      text: "Stories about the Virgin Mary in Ethiopia, Eritrea, and Egypt are vivid, profound, and sometimes historically valuable. The staff of PEMM has selected three stories that best represent thegenre",
    },
    {
      img: img,
      title: "Paintings",
      text: "Stories about the Virgin Mary in Ethiopia, Eritrea, and Egypt are vivid, profound, and sometimes historically valuable. The staff of PEMM has selected three stories that best represent thegenre",
    },
  ];

  const toggleContent = (index) => {
    setisOpen((prevState) => ({
      ...prevState,

      [index]: !prevState[index],
    }));
  };

  const toggleseDesc = (index) => {
    setisShow((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const stories = [
    {
      img: img1,
      title: "Stories",
      text: "Stories about the Virgin Mary in Ethiopia, Eritrea, and Egypt are vivid, profound, and sometimes historically valuable. The staff of PEMM has selected three stories that best represent the genre (from among the 506 translations of 753 stories in the PEMM database). One is about a girl's education (from Egypt), one is about kindness to animals (from Ethiopia), and one is about a speaking icon (from Ethiopia)",

      storyPart: [
        {
          img: img1,
          title: "story1",
        },
        {
          img: img,
          title: "story1",
        },
        {
          img: img1,
          title: "story1",
        },
      ],
    },
  ];

  return (
    <>
      <div className="grid md:grid-cols-3">
        {bannerItems.map((item, index) => (
          <div key={index} className="relative">
            <button
              className="relative flex h-full text-left z-30"
              onClick={() => {
                bannerIndex || bannerIndex === 0
                  ? setBannerIndex(null)
                  : setBannerIndex(index);
                toggleseDesc(index); // Toggle the detailed view
                toggleContent(index); // Also toggle the main content if needed
              }}
            >
              <Image
                src={item.img}
                alt="Picture of the author"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
              <div className="absolute m-auto top-1/3 z-10 text-white px-10">
                <span className="text-sm lg:text-xl font-bold uppercase mr-1">
                  featured
                </span>
                <h3
                  className="text-2xl lg:text-5xl leading-tight font-header uppercase"
                  onClick={() => toggleContent(index)}
                >
                  {item.title}
                </h3>
                {isOpen[index] && (
                  <p
                    className={`text-xs lg:text-base mt-1 ${
                      isOpen ? "slide-in" : "slide-out"
                    }`}
                  >
                    {item.text}
                  </p>
                )}
              </div>
            </button>
            {/* Show the detailed view for the clicked item */}
          </div>
        ))}
      </div>

      {/* The below section will appear when each story event triggers */}
      <div>
        {stories &&
          stories.map((item, index) => {
            return index === bannerIndex ? (
              <React.Fragment key={index}>
                <div className="md:flex relative bg-secondary-500 text-center md:text-left">
                  <div className="relative aspect-square lg:aspect-auto max-w-xs lg:max-w-none mx-auto md:mr-0 md:w-3/6 lg:max-h-[600px]">
                    <Image
                      src={item.img}
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
                        Featured{item.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-xl">
                        {item.text}
                      </p>
                    </div>
                    <button
                      className="absolute top-5 right-5 left-auto bottom-auto text-black"
                      onClick={() => {
                        setBannerIndex(null);
                      }}
                    >
                      <MdiClose />
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-3">
                  {item.storyPart &&
                    item.storyPart.map((data, subIndex) => (
                      <div
                        className="relative items-center justify-center uppercase text-center"
                        key={subIndex}
                      >
                        <Image
                          src={data.img}
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
              </React.Fragment>
            ) : (
              <div className="flex items-center justify-normal text-2xl">
                <p>No data found</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Hero;
