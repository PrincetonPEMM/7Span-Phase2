import React from "react";
import Image from "next/image";
const PaintingCard = ({ title, id, description, cardImg }) => {
  return (
    <div
      className={`rounded-lg text-white relative overflow-hidden inline-block  card-background w-full`}
    >
      <div className=" bg-black">
        <img src={cardImg} alt="PEMM" className="w-full object-cover " />
      </div>
      <div className="bg-black p-4">
        <p className="text-xs">{id}</p>
        <h2 className="lg:text-2xl font-bold mt-5">{title}</h2>
        <p className="pt-2 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default PaintingCard;
