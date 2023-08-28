"use client";
import { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const SliderModal = ({ sliderImg }) => {
  const images = sliderImg.map((item, index) => ({
    original: item,
    thumbnail: item,
  }));

  const [openImage, setOpenImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function imageClick(e) {
    setOpenImage(e.target.src);
    setIsOpen(true);
  }
  return images.length ? (
    <>
      <hr />
      <ImageGallery
        items={images}
        infinite={true}
        autoPlay={true}
        onClick={imageClick}
      />
      <Modal
        isOpen={isOpen}
        modalClose={() => {
          setIsOpen(false);
          setOpenImage("");
        }}
        previewClass="w-full max-w-xs sm:max-w-md xl:max-w-xl"
      >
        <hr />
        <img
          src={openImage}
          alt="pricenton ethiopian eritrean & egyptian miracles of marry project "
          className="h-full w-full object-contain object-center"
        />
      </Modal>
    </>
  ) : null;
};

export default SliderModal;
