"use client";
import React, { useState } from "react";
import MdiClose from "@/assets/icons/MdiClose";
import Banner from "./Banner";

const Hero = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({});

  return (
    <>
      <div className="grid md:grid-cols-3">
        <Banner
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          image={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.story_background_image?.id}`}
          title={data?.story_title}
          description={data?.story_description}
          setSelectedBanner={setSelectedBanner}
          data={{
            title: data?.story_title,
            img: data?.story_background_image?.id,
            text: data?.story_following_text,
            storyPart: [
              {
                title: data?.reveal_image_story_1_title,
                img: data?.reveal_image_story_1.id,
              },
              {
                title: data?.reveal_image_story_2_title,
                img: data?.reveal_image_story_2.id,
              },
              {
                title: data?.reveal_image_story_3_title,
                img: data?.reveal_image_story_3.id,
              },
            ],
          }}
        />
        <Banner
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          image={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.manuscript_background_image?.id}`}
          title={data?.manuscript_title}
          description={data?.manuscript_description}
          setSelectedBanner={setSelectedBanner}
          data={{
            title: data?.manuscript_title,
            img: data?.manuscript_background_image.id,
            text: data?.manuscript_following_text,
            storyPart: [
              {
                title: data?.reveal_image_manuscript_1_title,
                img: data?.reveal_image_manuscript_1.id,
              },
              {
                title: data?.reveal_image_manuscript_2_title,
                img: data?.reveal_image_manuscript_2.id,
              },
              {
                title: data?.reveal_image_manuscript_3_title,
                img: data?.reveal_image_manuscript_3.id,
              },
            ],
          }}
        />
        <Banner
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          image={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.painting_background_image?.id}`}
          title={data?.painting_title}
          description={data?.painting_description}
          setSelectedBanner={setSelectedBanner}
          data={{
            title: data?.painting_title,
            img: data?.painting_background_image.id,
            text: data?.painting_following_text,
            storyPart: [
              {
                title: data?.reveal_image_painting_1_title,
                img: data?.reveal_image_painting_1.id,
              },
              {
                title: data?.reveal_image_painting_2_title,
                img: data?.reveal_image_painting_2.id,
              },
              {
                title: data?.reveal_image_painting_3_title,
                img: data?.reveal_image_painting_3.id,
              },
            ],
          }}
        />
      </div>

      {/* The below section will appear when each story event triggers */}
      {isOpen && (
        <div className="md:block hidden">
          <div className="md:flex relative bg-secondary-500 text-center md:text-left">
            <div className="relative aspect-square lg:aspect-auto max-w-xs lg:max-w-none mx-auto md:mr-0 md:w-3/6 lg:max-h-[600px]">
              <img
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${selectedBanner?.img}`}
                alt="Picture of the author"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  width: "100%",
                  height: "100%",
                  "@media (max-width: 1024px)": {
                    height: "auto",
                    aspectRaio: "1/1",
                    maxWidth: "100%",
                  },
                }}
              />
            </div>
            <div className="w-full col-span-2 flex text-white bg-secondary-500">
              <div className="z-10 space-y-4 p-10 max-w-3xl">
                <h3 className="text-2xl lg:text-5xl font-bold font-body">
                  Featured {selectedBanner?.title}
                </h3>
                <p className="text-sm md:text-base lg:text-xl">
                  {selectedBanner?.text}
                </p>
              </div>
              <button
                className="absolute top-5 right-5 left-auto bottom-auto text-black"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <MdiClose />
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3">
            {selectedBanner?.storyPart &&
              selectedBanner?.storyPart.map((data, subIndex) => (
                <div
                  className="relative items-center justify-center uppercase text-center"
                  key={subIndex}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data.img}`}
                    alt="Picture of the author"
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 30vw"
                  />
                  <button
                    href="#"
                    // onClick={() => navigate(`/story/${story?.id}`)}
                    className="absolute flex items-center justify-center z-10 text-white space-y-4 px-10 w-full inset-0 bg-black bg-opacity-50 "
                  >
                    <span className="text-lg lg:text-2xl font-bold font-body">
                      Story title bottom{data.title}
                    </span>
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
