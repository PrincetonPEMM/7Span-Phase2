"use client";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import logo from "../../assets/images/image.png";
import SliderModal from "./SliderModal";
const StoryInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
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
          <div className="pc-grid pc-grid-cols-2 pc-gap-1 pc-py-4 md:pc-grid-cols-4 md:pc-gap-3">
            {sliderImg?.length &&
              sliderImg.map((item, index) => {
                if (index <= 3) {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className="pc-relative"
                    >
                      <Image
                        src={item.url}
                        className="pc-rounded-md"
                        alt="PEMM"
                      />
                      {index === 3 && (
                        <div className="pc-absolute pc-inset-0 pc-flex pc-h-full pc-w-full pc-items-center pc-justify-center pc-rounded-md pc-bg-gray-700/50">
                          <p className="pc-flex pc-items-center pc-gap-1 pc-text-xl pc-text-white md:pc-text-2xl ">
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
            modalClose={() => setIsOpen(false)}
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
