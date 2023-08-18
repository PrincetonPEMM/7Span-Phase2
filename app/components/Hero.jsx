"use client";
import React, { useState } from "react";
import Banner from "./Banner";
import BannerDetail from "./BannerDetail";
import SubBanner from "./SubBanner";

const Hero = ({ data }) => {
  const [selectedBanner, setSelectedBanner] = useState({});
  const [height100, setHeight100] = useState("height100");

  function toggleContent(data) {
    if (!Boolean(Object.keys(selectedBanner).length)) {
      setHeight100("height0");
    }
    setSelectedBanner(data);

    if (!Boolean(Object.keys(selectedBanner).length)) {
      setHeight100("height100");
    }
    if (!Boolean(Object.keys(selectedBanner).length))
      setTimeout(() => setHeight100(""), 500);

    if (Object.keys(data).length) {
      setTimeout(() => {
        const targetDiv = document.getElementById("mobileScroll");
        const targetDiv1 = document.getElementById("desktopScroll");

        if (targetDiv || targetDiv1) {
          targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
          targetDiv1.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-3">
        <Banner
          setSelectedBanner={toggleContent}
          selectedBanner={selectedBanner}
          data={{
            title: data?.story_title,
            description: data?.story_description,
            img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.story_background_image?.id}`,
            text: data?.story_following_text,
            storyPart: [
              {
                title: data?.reveal_image_story_1_title,
                redirectLink: data?.reveal_image_story_1_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_story_1.id}`,
              },
              {
                title: data?.reveal_image_story_2_title,
                redirectLink: data?.reveal_image_story_2_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_story_2.id}`,
              },
              {
                title: data?.reveal_image_story_3_title,
                redirectLink: data?.reveal_image_story_3_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_story_3.id}`,
              },
            ],
          }}
        />
        <Banner
          setSelectedBanner={toggleContent}
          selectedBanner={selectedBanner}
          data={{
            title: data?.manuscript_title,
            description: data?.manuscript_description,
            img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.manuscript_background_image?.id}`,
            text: data?.manuscript_following_text,
            storyPart: [
              {
                title: data?.reveal_image_manuscript_1_title,
                redirectLink: data?.reveal_image_manuscript_1_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_manuscript_1.id}`,
              },
              {
                title: data?.reveal_image_manuscript_2_title,
                redirectLink: data?.reveal_image_manuscript_1_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_manuscript_2.id}`,
              },
              {
                title: data?.reveal_image_manuscript_3_title,
                redirectLink: data?.reveal_image_manuscript_1_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_manuscript_3.id}`,
              },
            ],
          }}
        />
        <Banner
          setSelectedBanner={toggleContent}
          selectedBanner={selectedBanner}
          data={{
            title: data?.painting_title,
            description: data?.painting_description,
            img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.painting_background_image?.id}`,
            text: data?.painting_following_text,
            storyPart: [
              {
                title: data?.reveal_image_painting_1_title,
                redirectLink: data?.reveal_image_painting_1_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_painting_1.id}`,
              },
              {
                title: data?.reveal_image_painting_2_title,
                redirectLink: data?.reveal_image_painting_1_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_painting_2.id}`,
              },
              {
                title: data?.reveal_image_painting_3_title,
                redirectLink: data?.reveal_image_painting_1_redirection_link,
                img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_painting_3.id}`,
              },
            ],
          }}
        />
      </div>

      {/* The below section will appear when each story event triggers */}
      <div
        id="desktopScroll"
        className={`md:block hidden transition ${
          !Boolean(Object.keys(selectedBanner).length) ? "height0" : height100
        } `}
      >
        {Boolean(Object.keys(selectedBanner).length) && (
          <>
            <BannerDetail
              img={selectedBanner?.img}
              title={selectedBanner?.title}
              text={selectedBanner?.text}
              data={data}
              divClass="md:h-full"
              setSelectedBanner={setSelectedBanner}
              clsBtnCondition={Boolean(Object.keys(selectedBanner).length)}
            />
            <SubBanner
              stories={selectedBanner?.storyPart}
              divClass="md:h-full"
            />
          </>
        )}
      </div>
    </>
  );
};

export default Hero;
