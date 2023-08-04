import React from "react";
import img1 from "../../assets/images/stories-bg.png";
import img2 from "../../assets/images/menuscript-bg.png";
import img from "../../assets/images/paintings-bg.png";
import Image from "next/image";
const Hero = () => {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="relative flex items-center justify-center uppercase text-center">
          <Image src={img1} alt="Picture of the author" />

          <div className="absolute m-auto z-10 text-white space-y-4 px-10">
            <span className="text-2xl ">featured</span>
            <h3 className="text-5xl font-medium">Stories</h3>
            <p className="text-base">
              Stories about the Virgin Mary in Ethiopia, Eritrea, and Egypt are
              vivid, profound, and sometimes historically valuable. The staff of
              PEMM has selected three stories that best represent the genre
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center uppercase text-center">
          <Image src={img2} alt="Picture of the author" />
          <div className="absolute m-auto z-10 text-white space-y-4 px-10">
            <span className="text-2xl ">featured</span>
            <h3 className="text-5xl font-medium">MenuScripts</h3>
            <p className="text-base">
              Stories about the Virgin Mary in Ethiopia, Eritrea, and Egypt are
              vivid, profound, and sometimes historically valuable. The staff of
              PEMM has selected three stories that best represent the genre
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center uppercase text-center">
          <Image src={img} alt="Picture of the author" />
          <div className="absolute m-auto z-10 text-white space-y-4 px-10">
            <span className="text-2xl ">featured</span>
            <h3 className="text-5xl font-medium">Paintings</h3>
            <p className="text-base">
              Stories about the Virgin Mary in Ethiopia, Eritrea, and Egypt are
              vivid, profound, and sometimes historically valuable. The staff of
              PEMM has selected three stories that best represent the genre
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
