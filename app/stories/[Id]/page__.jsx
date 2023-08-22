"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import logo from "../../../assets/images/image.png";
import logo2 from "../../../assets/images/logo-white.png";
import logo3 from "../../../assets/images/menuscript-bg.png";
import Tabs from "@/app/components/Tabs";
import SliderModal from "@/app/components/SliderModal";
import {
  ID_LIST,
  TOTAL_NUM_MANUSCRIPTS_WITH_MS_STATUS_COMPLETE,
} from "@/utils/constant";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { Id } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories/${Id}`
  );

  const data = await response.json();

  const timeLineCalculate = () => {
    let age;
    if (
      parseInt(data.earliest_attestation) >= 1300 &&
      parseInt(data.earliest_attestation) < 1500
    ) {
      age = "very old";
    } else if (
      parseInt(data.earliest_attestation) >= 1500 &&
      parseInt(data.earliest_attestation) < 1800
    ) {
      age = "old";
    } else if (
      parseInt(data.earliest_attestation) >= 1800 &&
      parseInt(data.earliest_attestation) < 1950
    ) {
      age = "recent";
    } else if (parseInt(earliest_attestation) >= 1950) {
      age = "very recent";
    }
    return age;
  };

  const generateTranslations = async () => {
    // TRANSLATION_STATUS_OPTIONS
    let finalString = "";
    for (let translation of data.translations) {
      const promises = new Promise((reslove, reject) => {
        let string = "<h2>";
        string += `<b> ${translation.language_translated_to} </b>`;
        string += `${translation.translation_author} ${
          translation.translation_as_of_date
        }. ${
          translation.published_translation_book_title
            ? translation.published_translation_book_title
            : ""
        }`;

        if (translation.published_translation_book_page_span) {
          string += `, pages ${translation.published_translation_book_page_span}.`;
        }

        if (translation.published_translation_book_item) {
          string += `, item ${translation.published_translation_book_item}.`;
        }

        if (
          translation.manuscript_name &&
          translation.translation_source_manuscript_folio
        ) {
          string += `From ${translation.manuscript_name}, ${translation.translation_source_manuscript_folio}`;
        }

        string += "</h2>";
        reslove(string);
      });
      const result = await promises;
      finalString += result;
    }
    return finalString;
  };

  const generateManuscript = async () => {
    // TRANSLATION_STATUS_OPTIONS
    let finalString = "";
    const keys = Object.keys(data.manuscripts);
    for (let key of keys) {
      const promises = new Promise((reslove, reject) => {
        let string = "<p>";
        string += `<b>${key}</b>: `;
        string += `${data.manuscripts[key].join(";")}`;
        string += "</p>";
        reslove(string);
      });
      const result = await promises;
      finalString += result;
    }

    return finalString;
  };

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
  const data1 = [
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
    <div className="px-4 py-5 md:px-8">
      <h3 className="font-menu text-xl  md:text-5xl max-w-7xl leading-tight">
        The composition of the Miracles of Mary book by Bishop Hildephonsus of
        Toledo
      </h3>

      <div className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 ">
          {/* Left sided Image portion  */}
          <div>
            {/* slider */}
            <div className="grid grid-cols-2 gap-1 py-4 md:grid-cols-4 md:gap-3"></div>

            <SliderModal sliderImg={sliderImg} />

            {/* slider content */}

            <div className="space-y-4 mb-10">
              {sliderData.map((list, index) => (
                <ol key={index} className="list-inside md:pl-4 p-0">
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
              {/* {data1.map((list, index) => (
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
              ))} */}
              <ol className="list-inside pl-4 ">
                <li>
                  <ul className="space-y-2">
                    <p className="text-base indent-2 leading-relaxed">
                      This story is <u> {timeLineCalculate()}</u>: the earliest
                      PEMM manuscript<sup>1</sup> in which this story appears is
                      from around {data?.earliest_attestation}.
                    </p>
                    <p className="text-base indent-2 leading-relaxed">
                      {data?.total_records && (
                        <>
                          This story is{" "}
                          <u>
                            {(() => {
                              if (data.total_records < 10) {
                                if (data.total_records >= 6) {
                                  return "somewhat rare";
                                } else if (data.total_records >= 3) {
                                  return "quite rare";
                                } else if (data.total_records == 2) {
                                  return "extremely rare";
                                } else {
                                  return "uniquely rare";
                                }
                              } else {
                                if (data.total_records >= 300) {
                                  return "extremely popular";
                                } else if (data.total_records >= 200) {
                                  return "very popular";
                                } else if (data.total_records >= 50) {
                                  return "popular";
                                } else {
                                  return "somewhat popular";
                                }
                              }
                            })()}
                          </u>
                          : appearing in{" "}
                          {data?.total_records < 10
                            ? `only ${data.total_records} of the PEMM manuscripts.`
                            : `appearing in ${(
                                (data.total_records /
                                  TOTAL_NUM_MANUSCRIPTS_WITH_MS_STATUS_COMPLETE) *
                                100
                              ).toPrecision(
                                5
                              )}% of PEMM manuscripts with five stories or more`}
                          .
                        </>
                      )}
                    </p>
                    <p className="text-base indent-2 leading-relaxed">
                      {data.total_records && (
                        <>
                          {data.total_story_id_paintings === 0 ? (
                            <>
                              This story is <u>not illustrated</u> in PEMM
                              manuscripts.
                            </>
                          ) : ID_LIST.includes(data.canonical_story_id) ? (
                            data.total_manuscripts_with_story_id_illustrated ==
                              null ||
                            data.total_manuscripts_with_story_id_illustrated !=
                              0 ? (
                              <>
                                This story is among the thirty-two Täˀammərä
                                Maryam stories that are most $
                                {<u>frequently illustrated</u>}, with a total of
                                {data.total_story_id_paintings} paintings.
                              </>
                            ) : (
                              <>
                                This story is among the thirty-two Täˀammərä
                                Maryam stories that are most{" "}
                                <u>frequently illustrated</u>: it is illustrated
                                in $
                                {
                                  data.total_manuscripts_with_story_id_illustrated
                                }{" "}
                                PEMM manuscripts, with a total of
                                {data.total_story_id_paintings} paintings.
                              </>
                            )
                          ) : data.total_manuscripts_with_story_id_illustrated ==
                              null ||
                            data.total_manuscripts_with_story_id_illustrated !=
                              0 ? (
                            <>
                              This story is {<u>sometimes illustrated</u>}, with
                              a total of {data.total_story_id_paintings}{" "}
                              painting(s).
                            </>
                          ) : (
                            <>
                              This story is <u>sometimes illustrated</u>: it is
                              illustrated in
                              {total_manuscripts_with_story_id_illustrated} PEMM
                              manuscript(s), with a total of
                              {total_story_id_paintings} painting(s).
                            </>
                          )}
                        </>
                      )}
                    </p>
                    <p className="text-base indent-2 leading-relaxed">
                      {data.type_of_story == "Life of Mary" ? (
                        <>
                          This story is a <u>life miracle</u>: it takes place
                          during Our Lady Mary&apos;s lifetime, not after it.
                        </>
                      ) : (
                        <>
                          This story is a <u>post-life miracle</u>: it does not
                          take place during Our Lady Mary&apos;s lifetime, but
                          after it.
                        </>
                      )}
                    </p>
                    <p className="text-base indent-2 leading-relaxed">
                      This story was originally <u>composed</u> in {data.origin}
                      .
                    </p>
                    <p className="text-base indent-2 leading-relaxed">
                      This story is available in the following <u>languages</u>:{" "}
                      {data.languageAvailableIn.join(", ")}.
                    </p>
                  </ul>
                </li>
              </ol>
            </div>

            {/* English translation */}
            <div className="space-y-4">
              {/* {lang.map((list, index) => (
                <ol key={index} className="list-inside md:pl-4 p-0">
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
              ))} */}
              <ol className="list-inside md:pl-4 p-0">
                <li>
                  <h3 className="text-lg font-bold uppercase  mb-3">
                    TRANSLATION
                  </h3>
                  <p className="text-base leading-loose mb-3">
                    Translated by {data.translation_author} from{" "}
                    {data.manuscript_name}, f.{" "}
                    {data.translation_source_manuscript_folio}
                    {data.translation_as_of_date}.
                  </p>
                  <p
                    className="text-base leading-loose mb-3"
                    dangerouslySetInnerHTML={{
                      __html: data.english_translation,
                    }}
                  ></p>
                  <h3 className="text-lg font-bold uppercase  mb-3">
                    TO CITE THIS TRANSLATION
                  </h3>
                  <p className="text-base leading-loose mb-3">
                    {data.translation_author}. &quot;ID{" "}
                    {data.canonical_story_id}: {data.original_macomber_title}
                    .&quot; <i>Täˀammərä Maryam (Miracle of Mary) Stories</i>,
                    edited by Wendy Laura Belcher, Jeremy Brown, Mehari Worku,
                    and Dawit Muluneh. Princeton: Princeton Ethiopian, Eritrean,
                    and Egyptian Miracles of Mary project.{" "}
                    {process.env.NEXT_PUBLIC_DIRECTUS_URL}/stories/{Id}. Last
                    modified: {data.translation_as_of_date}
                  </p>
                  {/* <ul className="space-y-2">
                    <li>
                      <p className="text-base text-justify indent-2 leading-relaxed">
                        {item.content}
                      </p>
                    </li>
                  </ul> */}
                </li>
              </ol>
            </div>
          </div>
          <div className="col-span-2">
            <div className="space-y-4 mb-10">
              <ol className="list-inside pl-4 ">
                <li>
                  <h3 className="text-lg font-bold uppercase  mb-3">
                    {data.languageAvailableIn.length > 0 &&
                      "OTHER TRANSLATIONS & EDITIONS OF THIS STORY"}
                  </h3>
                  <ul className="space-y-2">
                    <p
                      className="text-base indent-2 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: await generateTranslations(),
                      }}
                    ></p>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
          <div className="col-span-2">
            <div className="space-y-4 mb-10">
              <ol className="list-inside pl-4 ">
                <li>
                  <h3 className="text-lg font-bold uppercase  mb-3">
                    MANUSCRIPTS
                  </h3>
                  <ul className="space-y-2">
                    <p className="text-base indent-2 leading-relaxed">
                      PEMM Manuscripts in which story appears (with page or
                      folio start):
                    </p>
                    <p
                      className="text-base indent-2 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: await generateManuscript(),
                      }}
                    ></p>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* This below content is set as per page => 
      https://www.dropbox.com/sh/vwmr1bvr558fkao/AABsEQYWhvc-qZ8wriUuAZt_a/03%20Story%20Detail%20page?dl=0&preview=03A+Story+Detail+page+old.pdf&subfolder_nav_tracking=1 */}

        <div className="space-y-4 mb-10">
          {storyDetail.map((list, index) => (
            <ol key={index} className="list-inside md:pl-4 p-0 ">
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
      <div className="md:hidden block">
        <Tabs
          tabs={discoverPage}
          onClick={(e) => {
            console.log("onClick prop:", e);
          }}
        >
          {/* Overview */}
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4 mb-10">
              {sliderData.map((list, index) => (
                <ol key={index} className="list-inside md:pl-4 p-0">
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
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4 pb-10">
              {data1.map((list, index) => (
                <ol key={index} className="list-inside md:pl-4 p-0">
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
                <ol key={index} className="list-inside md:pl-4 p-0">
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
          <Tab.Panel className="p-4 md:p-6">
            {storyDetail.map((list, index) => (
              <ol key={index} className="list-inside md:pl-4 p-0 ">
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

          {/* Upcoming Events */}
          <Tab.Panel className="p-4 lg:p-6">
            <div className="space-y-4 mb-10">
              {data1.map((list, index) => (
                <ol key={index} className="list-inside pl-4">
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
                    <h3 className="text-lg font-bold uppercase mb-3">
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
    </div>
  );
};

export default Page;
