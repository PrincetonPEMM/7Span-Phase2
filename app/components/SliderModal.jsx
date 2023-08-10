"use client";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Modal from "./Modal";
import Image from "next/image";

const SliderModal = ({
  sliderImg,
  isOpen = false,
  modalClose = false,
  openImage = "",
}) => {
  return (
    <>
      <Carousel className="pt-3">
        {sliderImg?.length &&
          sliderImg.map((item, index) => (
            <div
              key={index}
              className="h-full max-h-[320px] w-full max-w-xs sm:max-h-[400px] sm:max-w-md xl:max-h-[500px] xl:max-w-xl"
            >
              {item.url && (
                <Image
                  src={item.url}
                  alt="Pemm"
                  className="h-full w-full object-contain object-center"
                />
              )}
            </div>
          ))}
      </Carousel>

      <Modal
        isOpen={isOpen}
        modalClose={modalClose}
        previewClass="w-full max-w-xs sm:max-w-md xl:max-w-xl"
      >
        {openImage && (
          <Image
            src={openImage}
            alt="Pemm"
            className="h-full w-full object-contain object-center"
          />
        )}
      </Modal>
    </>
  );
};

export default SliderModal;
