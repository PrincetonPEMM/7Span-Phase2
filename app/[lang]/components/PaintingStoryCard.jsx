import {
  defaultImageforPainting,
  defaultImageforPaintingAhm,
} from "@/utils/constant";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  localData,
  lang = "en-us",
  item,
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
          src={
            Boolean(image)
              ? image
              : lang === "am-et"
              ? defaultImageforPaintingAhm
              : defaultImageforPainting
          }
          alt="PEMM"
          className="w-full h-full object-cover"
          onLoad={() => {
            setIsImgLoad(true);
          }}
        />
      </div>
      {isImgload && (
        <div className="bg-black p-5 font-body">
          {isTitle && (
            <h3
              className={`font-semibold lg:text-xl tracking-wide ${
                isImgload ? "mt-0" : "mt-3"
              }`}
            >
              {title ? title : localData.pemm_title_not_found} ({localData?.id}{" "}
              {item?.canonical_story_id})
            </h3>
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
