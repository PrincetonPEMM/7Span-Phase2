"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import logo from "../../assets/images/image.png";
import logo2 from "../../assets/images/logo-white.png";
import logo3 from "../../assets/images/menuscript-bg.png";
import SliderModal from "./SliderModal";
import Tabs from "./tabs";
const StoryInfo = () => {
  const sliderImg = [
    {
      url: logo,
    },
    {
      url: logo2,
    },
    {
      url: logo3,
    },
    {
      url: logo,
    },
    {
      url: logo2,
    },
    {
      url: logo3,
    },
    {
      url: logo,
    },
    {
      url: logo2,
    },
    {
      url: logo3,
    },
    {
      url: logo,
    },
    {
      url: logo2,
    },
    {
      url: logo3,
    },
  ];
  const data = [
    {
      title:
        "The composition of the Miracles of Mary book by Bishop Hildephonsus of Toledo The story is [generated:] very old. The earliest Gəˁəz manuscript cataloged by PEMM (GMP) in which this story appears is from the [date range start:] 1400s",
      items: [
        "E story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).",
        "Story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).",
        "Estory is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).",
        "Appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).",
      ],
      text: "hello",
    },
    {
      title: "List 2",
      items: ["Item A", "Item B", "Item C"],
    },
  ];
  const sliderData = [
    {
      title: "Information",
      items: [
        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },
        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },

        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },
        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },
        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },
      ],
      text: "hello",
    },
    {
      title: "List 2",
      items: ["Item A", "Item B", "Item C"],
    },
  ];
  const storyDetail = [
    {
      title: "Information",
      items: [
        {
          text: "NOW there was a certain Bishop in the church ofTeltelya whose name was Dexius, and he was a righteous man and afearer of God, and he loved our Lady Mary exceedingly. His mouth declared her praise, and his heart was filled withthoughts of her, and he ministered unto her with exceedingly great diligence and care; and he wrote the Book of herMiracles and History, and he ceased not to meditate upon the same at eventide and at morn.",
        },
        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },

        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },
        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },
        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },
      ],
      text: "hello",
    },
    {
      title: "List 2",
      items: [
        {
          text: "NOW there was a certain Bishop in the church ofTeltelya whose name was Dexius, and he was a righteous man and afearer of God, and he loved our Lady Mary exceedingly. His mouth declared her praise, and his heart was filled withthoughts of her, and he ministered unto her with exceedingly great diligence and care; and he wrote the Book of herMiracles and History, and he ceased not to meditate upon the same at eventide and at morn.",
        },
        {
          text: "E story is [generated] popular, appearing in [generated] 66 percent of all GMP",
        },
      ],
    },
  ];
  const lang = [
    {
      title: "English translation",
      text: "AboutPaintingsStoriesResearch ToolsSearch1. The composition of the Miracles of Mary book by Bishop Hildephonsus of ToledoThe story is [generated:] very old. The earliest Gəˁəz manuscript cataloged by PEMM(GMP) in which this story appears is from the [date range start:] 1400s.The story is [generated] popular, appearing in [generated] 66 percent of all GMP([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).The story averages around [generated] 1200 characters, with the shortest GMP at[generated] x characters and the longest GMP at [generated] x characters.The story usually appears extremely early in the order of stories in a manuscript. It is[generated] first in 75 percent of TGMP.The story is among the thirty-two Täammərä Maryam stories that are frequentlyillustrated. [Generated:] It is illustrated in [total paintings:] 37 GMP.The story is available in PEMM the following languages [generated:] Latin, Arabic,Gəˁəz, Amharic, English, French, and Italian.INFORMATIONStory type : Post-life miracleSubjects: Writing (composition); Clerical leadership;Death due to sinKeywords: clergy: archbishop; clergy: bishop; Sin:greed; character: male monkIncipit :ወሀሎ፡ አሐዱ፡ ቀሲስ፡ ኢጲስ፡ ቆጶስ፡ በሀገረ፡ ጥልጥልያ፡ዘስሙ፡ ደቅስዮስ፡ ወኮነ፡ ብእሴ፡ ቡሩከ፡ ወኄረ፡ ወያፈቅራ፡ለእግዝእትነ፡በኵሉ፡ ክሃሎቱ፡Number of Incipits in PEMM Incipit Tool: 118Translation Source: Budge, E. A. Wallis, ed. OneHundred and Ten Miracles of Our Lady Mary. London:Oxford University Press, H. Milford, 1933. In the publicdomain.Manuscript source for English translation: BOr (BL) No.652, f2b.ID Numbers: PEMM 1; LIT3586Miracle, Macomber ID 13,CSM 2; Poncelet 117GMP Manuscripts in which story appears (with page orfolio start): BOr (BL) 650 (1400s); EMML (HMML) 392(1800s), + 232 moreENGLISH TRANSLATIONNOW there was a certain Bishop in the church of Teltelya whose name was Dexius, andhe was a righteous man and a fearer of God, and he loved our Lady Mary exceedingly.His mouth declared her praise, and his heart was filled with thoughts of her, and heministered unto her with exceedingly great diligence and care; and he wrote the Bookof her Miracles and History, and he ceased not to meditate upon the same at eventideand at morn.",
      items: [
        {
          content:
            "E story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP). Story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).",
        },
        {
          content:
            "E story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP). Story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).",
        },
        {
          content:
            "E story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP). Story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).",
        },
        {
          content:
            "E story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP). Story is [generated] popular, appearing in [generated] 66 percent of all GMP ([total records:] 232 manuscripts of [generated] 350 manuscripts have this story) andin [generated:] 90 percent of GMP with ten stories or more (TGMP).",
        },
      ],
    },
    {
      title: "List 2",
      items: ["Item A", "Item B", "Item C"],
    },
  ];

  const discoverPage = [
    {
      label: "Network",
    },
    {
      label: "English translation",
    },
    {
      label: "Information",
    },
  ];
  return (
    <div className="px-8">
      <h3 className="font-menu text-3xl  lg:text-5xl max-w-7xl leading-tight">
        The composition of the Miracles of Mary book by Bishop Hildephonsus of
        Toledo
      </h3>

      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 ">
          {/* Left sided Image portion  */}
          <div>
            {/* slider */}
            <div className="grid grid-cols-2 gap-1 py-4 md:grid-cols-4 md:gap-3"></div>

            <SliderModal sliderImg={sliderImg} />

            {/* slider content */}

            <div className="space-y-4 mb-10">
              {sliderData.map((list, index) => (
                <ol key={index} className="list-inside pl-4">
                  <li>
                    <h3 className="text-lg mb-3 font-bold uppercase text-justify">
                      {list.title}
                    </h3>
                    <ul>
                      {list.items.map((item, subIndex) => (
                        <p
                          key={subIndex}
                          className="text-base indent-2 leading-normal"
                        >
                          {item.text}
                        </p>
                      ))}
                    </ul>
                  </li>
                </ol>
              ))}
            </div>
          </div>

          {/* Right side content portion */}
          <div className="col-span-2">
            <div className="space-y-4 mb-10">
              {data.map((list, index) => (
                <ol key={index} className="list-inside pl-4 ">
                  <li>
                    <h3 className="text-lg mb-3 text-justify">{list.title}</h3>
                    <ul className="space-y-2">
                      {list.items.map((item, subIndex) => (
                        <p
                          key={subIndex}
                          className="text-base indent-2 leading-relaxed"
                        >
                          {item}
                        </p>
                      ))}
                    </ul>
                  </li>
                </ol>
              ))}
            </div>

            {/* English translation */}
            <div className="space-y-4">
              {lang.map((list, index) => (
                <ol key={index} className="list-inside pl-4">
                  <li>
                    <h3 className="text-lg font-bold uppercase  mb-3">
                      {list.title}
                    </h3>
                    <p className="text-base leading-loose mb-3">{list.text}</p>
                    <ul className="space-y-2">
                      {list.items.map((item, subIndex) => (
                        <li key={subIndex}>
                          <p className="text-base text-justify indent-2 leading-relaxed">
                            {item.content}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ol>
              ))}
            </div>
          </div>
        </div>

        {/* This below content is set as per page => 
      https://www.dropbox.com/sh/vwmr1bvr558fkao/AABsEQYWhvc-qZ8wriUuAZt_a/03%20Story%20Detail%20page?dl=0&preview=03A+Story+Detail+page+old.pdf&subfolder_nav_tracking=1 */}

        <div className="space-y-4 mb-10">
          {storyDetail.map((list, index) => (
            <ol key={index} className="list-inside pl-4 ">
              <li>
                <h3 className="text-lg mb-3 font-bold uppercase text-justify">
                  {list.title}
                </h3>
                <ul>
                  {list.items.map((item, subIndex) => (
                    <p
                      key={subIndex}
                      className="text-base indent-2 leading-normal"
                    >
                      {item.text}
                    </p>
                  ))}
                </ul>
              </li>
            </ol>
          ))}
        </div>
      </div>

      {/* This below content is for responsive  */}

      <Tabs
        tabs={discoverPage}
        onClick={(e) => {
          console.log("onClick prop:", e);
        }}
      >
        {/* Overview */}
        <Tab.Panel className="p-4 lg:p-6">
          <div className="space-y-4 mb-10">
            {sliderData.map((list, index) => (
              <ol key={index} className="list-inside pl-4">
                <li>
                  <h3 className="text-lg mb-3 font-bold uppercase text-justify">
                    {list.title}
                  </h3>
                  <ul>
                    {list.items.map((item, subIndex) => (
                      <p
                        key={subIndex}
                        className="text-base indent-2 leading-normal"
                      >
                        {item.text}
                      </p>
                    ))}
                  </ul>
                </li>
              </ol>
            ))}
          </div>
        </Tab.Panel>

        {/* Upcoming Events */}
        <Tab.Panel className="p-4 lg:p-6">
          <div className="space-y-4 mb-10">
            {data.map((list, index) => (
              <ol key={index} className="list-inside pl-4 ">
                <li>
                  <h3 className="text-lg mb-3 text-justify">{list.title}</h3>
                  <ul className="space-y-2">
                    {list.items.map((item, subIndex) => (
                      <p
                        key={subIndex}
                        className="text-base indent-2 leading-relaxed"
                      >
                        {item}
                      </p>
                    ))}
                  </ul>
                </li>
              </ol>
            ))}
          </div>
          <div className="space-y-4">
            {lang.map((list, index) => (
              <ol key={index} className="list-inside pl-4">
                <li>
                  <h3 className="text-lg font-bold uppercase  mb-3">
                    {list.title}
                  </h3>
                  <p className="text-base leading-loose mb-3">{list.text}</p>
                  <ul className="space-y-2">
                    {list.items.map((item, subIndex) => (
                      <li key={subIndex}>
                        <p className="text-base text-justify indent-2 leading-relaxed">
                          {item.content}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              </ol>
            ))}
          </div>
        </Tab.Panel>

        {/* Resources */}
        <Tab.Panel className="p-4 lg:p-6">
          {storyDetail.map((list, index) => (
            <ol key={index} className="list-inside pl-4 ">
              <li>
                <h3 className="text-lg mb-3 font-bold uppercase text-justify">
                  {list.title}
                </h3>
                <ul>
                  {list.items.map((item, subIndex) => (
                    <p
                      key={subIndex}
                      className="text-base indent-2 leading-normal"
                    >
                      {item.text}
                    </p>
                  ))}
                </ul>
              </li>
            </ol>
          ))}
        </Tab.Panel>
      </Tabs>
    </div>
  );
};

export default StoryInfo;
