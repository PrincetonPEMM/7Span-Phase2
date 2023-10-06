import React, { useEffect, useState } from "react";
import PaintingDetail from "@assets/images/painting-detail.jpg";
import Link from "next/link";
import { defaultImageforPainting } from "@/utils/constant";

const PaintingStoryCard = ({
  image,
  isTitle = true,
  title,
  content,
  desc,
  btnText,
  btnLink,
  lastLine,
  className = "",
}) => {
  const [isImgload, setIsImgLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsImgLoad(true);
    }, [5000]);
  }, []);

  return (
    <>
      <div className="aspect-square bg-offWhite-500">
        <img
          src={Boolean(image) ? image : defaultImageforPainting}
          alt="PEMM"
          className="w-full h-full object-cover"
          onLoad={() => {
            setIsImgLoad(true);
          }}
        />
      </div>
      {isImgload && (
        <div className="bg-black p-5">
          {isTitle && (
            <h2
              className={`font-bold  lg:text-2xl ${
                isImgload ? "mt-0" : "mt-3"
              }`}
            >
              {title ? title : "PEMM title not found"}
            </h2>
          )}
          <p className={`text-sm break-words ${className}`}>{content}</p>
          {desc && <p className={`text-sm break-words ${className}`}>{desc}</p>}
          {lastLine && <p className={`text-sm break-words `}>{lastLine}</p>}
          {btnText && btnLink && (
            <Link
              href={btnLink}
              className="border border-offWhite-500 my-4 inline-block py-2 px-3 text-xs hover:transition-all rounded-md hover:border-black 
        transition-all hover hover:bg-secondary-500 hover:text-offBlack-500 md:text-sm"
            >
              {btnText}
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default PaintingStoryCard;
