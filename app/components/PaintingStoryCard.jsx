import React from "react";
import PaintingDetail from "@assets/images/painting-detail.jpg";
import Image from "next/image";
const PaintingStoryCard = ({ title, text, content }) => {
  return (
    <div
      className={`rounded-lg text-offWhite-500 font-body relative overflow-hidden inline-block card-background w-full`}
    >
      <div className=" bg-offWhite-500 aspect-square">
        <Image
          src={PaintingDetail}
          alt="PEMM"
          className="w-full object-cover"
        />
      </div>
      <div className="bg-black p-5">
        <p className="text-xs">{text}</p>
        <h2 className="lg:text-2xl font-bold mt-3">{title}</h2>
        <p className="pt-2 mb-3">{content}</p>
        <button
          className="border border-offWhite-500 py-2 px-3 text-sm hover:transition-all rounded-md hover:border-black 
        transition-all hover hover:bg-secondary-500 hover:text-offBlack-500"
        >
          View all Images
        </button>
      </div>
    </div>
  );
};

export default PaintingStoryCard;
