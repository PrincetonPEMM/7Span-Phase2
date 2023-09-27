"use client";
import { useRouter } from "next/navigation";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const SliderModal = ({ sliderImg }) => {
  const route = useRouter();
  const images = sliderImg.map((item, index) => ({
    original: item.image_link,
    thumbnail: item.image_link,
    description: item.web_address,
    web_address: item.web_address,
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
        // onClick={(e) => {
        //   const url = images.find((img,ind) => img.original === e.target.src);
        //   // // route.push(`/paintings/${url[0].web_address}`);
        //   console.log(url, "URL", url[0].web_address);
        //   console.log(e, "ee");
        // }}
      />
    </>
  ) : null;
};

export default SliderModal;
