import React from "react";
import Image from "next/image";
const PaintingCard = ({ title, id, description, cardImg }) => {
  return (
    <div
      className={`rounded-lg text-background-500 font-body relative overflow-hidden inline-block  card-background w-full`}
    >
      <div className=" bg-offWhite-500">
        <img src={cardImg} alt="PEMM" className="w-full object-cover " />
      </div>
      <div className="bg-black p-5">
        <p className="text-xs">{id}</p>
        <h2 className="lg:text-2xl font-bold mt-3">{title}</h2>
        <p className="pt-2">{description}</p>
      </div>
    </div>
  );
};

export default PaintingCard;
