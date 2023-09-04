"use client";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const SliderModal = ({ sliderImg }) => {
  const images = sliderImg.map((item, index) => ({
    original: item,
    thumbnail: item,
  }));

  return images.length ? (
    <>
      <hr />
      <ImageGallery items={images} infinite={true} autoPlay={true} />
    </>
  ) : null;
};

export default SliderModal;
