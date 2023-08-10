import React from "react";
import { Carousel } from "react-responsive-carousel";
import Modal from "./Modal";
import Image from "next/image";

const SliderModal = ({ sliderImg, isOpen = false, modalClose = false }) => {
  return (
    <Modal
      isOpen={isOpen}
      modalClose={modalClose}
      previewClass="pc-w-full pc-max-w-xs sm:pc-max-w-md xl:pc-max-w-xl"
    >
      <Carousel className="pc-pt-3">
        {sliderImg?.length &&
          sliderImg.map((item, index) => (
            <div
              key={index}
              className="pc-h-full pc-max-h-[320px] pc-w-full pc-max-w-xs sm:pc-max-h-[400px] sm:pc-max-w-md xl:pc-max-h-[500px] xl:pc-max-w-xl"
            >
              <Image
                src={item.url}
                alt="Pemm"
                className="pc-h-full pc-w-full pc-object-contain pc-object-center"
              />
            </div>
          ))}
      </Carousel>
    </Modal>
  );
};

export default SliderModal;
