import React from "react";
import Header from "./Header";
import Hero from "./Hero";
const Banner = () => {
  return (
    <div className="relative">
      <Header className="absolute inset-x-0" />
      <Hero />
    </div>
  );
};

export default Banner;
