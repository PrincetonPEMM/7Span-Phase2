"use client";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import BannerDetail from "./BannerDetail";
import SubBanner from "./SubBanner";
import { useRouter } from "next/navigation";

const Hero = ({ data }) => {
  const route = useRouter();
  const [selectedBanner, setSelectedBanner] = useState({});
  const [height100, setHeight100] = useState("height100");
  const storyData = {
    hashRoute: "#featured-stories",
    title: data?.story_title,
    description: data?.story_description,
    alt: data?.story_image_alt,
    credit: data?.story_image_credit,
    img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.story_background_image?.id}`,
    text: data?.story_following_text,
    storyPart: [
      {
        title: data?.reveal_image_story_1_title,
        redirectLink: data?.reveal_image_story_1_redirection_link,
        img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_story_1?.id}`,
      },
      {
        title: data?.reveal_image_story_2_title,
        redirectLink: data?.reveal_image_story_2_redirection_link,
        img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_story_2?.id}`,
      },
      {
        title: data?.reveal_image_story_3_title,
        redirectLink: data?.reveal_image_story_3_redirection_link,
        img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_story_3?.id}`,
      },
    ],
  };
  const manuscriptData = {
    hashRoute: "#featured-manuscripts",
    title: data?.manuscript_title,
    description: data?.manuscript_description,
    credit: data?.manuscript_image_credit,
    alt: data?.manuscript_image_alt,
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
        redirectLink: data?.reveal_image_manuscript_2_redirection_link,
        img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_manuscript_2.id}`,
      },
      {
        title: data?.reveal_image_manuscript_3_title,
        redirectLink: data?.reveal_image_manuscript_3_redirection_link,
        img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_manuscript_3.id}`,
      },
    ],
  };
  const paintingData = {
    hashRoute: "#featured-paintings",
    title: data?.painting_title,
    alt: data?.painting_image_alt,
    credit: data?.painting_image_credit,
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
        redirectLink: data?.reveal_image_painting_2_redirection_link,
        img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_painting_2.id}`,
      },
      {
        title: data?.reveal_image_painting_3_title,
        redirectLink: data?.reveal_image_painting_3_redirection_link,
        img: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${data?.reveal_image_painting_3.id}`,
      },
    ],
  };

  function toggleContent(details) {
    if (!Boolean(Object.keys(selectedBanner).length)) {
      setHeight100("height0");
    }
    setSelectedBanner(details);

    if (!Boolean(Object.keys(selectedBanner).length)) {
      setHeight100("height100");
    }
    if (!Boolean(Object.keys(selectedBanner).length))
      setTimeout(() => setHeight100(""), 500);

    if (Object.keys(details).length) {
      setTimeout(() => {
        const targetDiv = document.getElementById("mobileScroll");
        const targetDiv1 = document.getElementById("desktopScroll");

        if (targetDiv || targetDiv1) {
          targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
          targetDiv1.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }

    if (details.hashRoute === "#featured-stories") {
      route.replace("/#featured-stories");
    } else if (details.hashRoute === "#featured-manuscripts") {
      route.replace("/#featured-manuscripts");
    } else if (details.hashRoute === "#featured-paintings") {
      route.replace("/#featured-paintings");
    } else route.replace("/");
  }

  useEffect(function () {
    let toggle_data = {};
    if (location.hash === "#featured-stories") {
      toggle_data = storyData;
    }
    if (location.hash === "#featured-manuscripts") {
      toggle_data = manuscriptData;
    }
    if (location.hash === "#featured-paintings") {
      toggle_data = paintingData;
    }

    toggleContent(toggle_data);
  }, []);

  console.log("Env Mode :)", process.env.NEXT_PUBLIC_MODE);

  return (
    <>
      <link rel="preload" href={storyData.storyPart[0].img} as="image" />
      <link rel="preload" href={storyData.storyPart[1].img} as="image" />
      <link rel="preload" href={storyData.storyPart[2].img} as="image" />
      <link rel="preload" href={manuscriptData.storyPart[0].img} as="image" />
      <link rel="preload" href={manuscriptData.storyPart[1].img} as="image" />
      <link rel="preload" href={manuscriptData.storyPart[2].img} as="image" />
      <link rel="preload" href={paintingData.storyPart[0].img} as="image" />
      <link rel="preload" href={paintingData.storyPart[1].img} as="image" />
      <link rel="preload" href={paintingData.storyPart[2].img} as="image" />
      <div className="grid md:grid-cols-3">
        <Banner
          id="featured-stories"
          setSelectedBanner={toggleContent}
          selectedBanner={selectedBanner}
          data={storyData}
        />
        <Banner
          id="featured-manuscripts"
          setSelectedBanner={toggleContent}
          selectedBanner={selectedBanner}
          data={manuscriptData}
        />
        <Banner
          id="featured-paintings"
          setSelectedBanner={toggleContent}
          selectedBanner={selectedBanner}
          data={paintingData}
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
              areaLabel={`${selectedBanner?.title} button`}
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
