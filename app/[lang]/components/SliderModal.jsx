"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const SliderModal = ({ sliderImg }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const route = useRouter();
  const images = sliderImg.map((item, index) => ({
    original: item.image_link,
    thumbnail: item.image_link,
    // description: item.web_address,
    web_address: item.web_address,
  }));

  return images.length ? (
    <>
      <hr />
      <ImageGallery
        items={images}
        infinite={true}
        autoPlay={false}
        startIndex={currentIndex}
        showPlayButton={images.length > 1 ? true : false}
        showThumbnails={images.length > 1 ? true : false}
        onSlide={setCurrentIndex}
        onClick={(e) => {
          const url = images.find(
            (img, ind) => img.original === e.target.src && ind === currentIndex
          );
          route.push(`/paintings/${url.web_address}`);
        }}
      />
    </>
  ) : null;
};

export default SliderModal;
