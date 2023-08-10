"use client";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import logo from "../../assets/images/image.png";
import SliderModal from "./SliderModal";
const StoryInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openImage, setOpenImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!setIsOpen);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchPosts({
      page: 1,
    });
  };
  const sliderImg = [
    {
      url: logo,
    },
    {
      url: logo,
    },
  ];
  return (
    <div className="px-8">
      <h3 className="font-menu text-5xl max-w-7xl leading-tight">
        The composition of the Miracles of Mary book by Bishop Hildephonsus of
        Toledo
      </h3>
      <div className="grid grid-cols-3 gap-5 ">
        {/* Image portion  */}
        <div>
          <div className="grid grid-cols-2 gap-1 py-4 md:grid-cols-4 md:gap-3">
            {sliderImg?.length &&
              sliderImg.map((item, index) => {
                if (index <= 3) {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setIsOpen(true);
                        setOpenImage(item.url);
                      }}
                      className="relative"
                    >
                      <Image
                        src={item.url}
                        className="rounded-md"
                        alt="PEMM"
                      />
                      {index === 3 && (
                        <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-md bg-gray-700/50">
                          <p className="flex items-center gap-1 text-xl text-white md:text-2xl ">
                            <span>{sliderImg.length - 3}</span>
                          </p>
                        </div>
                      )}
                    </button>
                  );
                }
              })}
          </div>
          <SliderModal
            sliderImg={sliderImg}
            isOpen={isOpen}
            openImage={openImage}
            modalClose={() => {
              setIsOpen(false)
              setOpenImage("");
            }}
          />
        </div>

        {/* Right side content portion */}
        <div className="col-span-2">
          <h3>
            The composition of the Miracles of Mary book by Bishop Hildephonsus
            of Toledo
          </h3>
          <h3>
            The composition of the Miracles of Mary book by Bishop Hildephonsus
            of Toledo
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StoryInfo;
