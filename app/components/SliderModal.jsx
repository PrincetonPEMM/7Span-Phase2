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
      <ImageGallery
        items={images}
        infinite={true}
        autoPlay={false}
        showPlayButton={images.length > 1 ? true : false}
        showThumbnails={images.length > 1 ? true : false}
      />
    </>
  ) : null;
};

export default SliderModal;
