"use client";
import { ID_LIST, macomber_id_number } from "@/utils/constant";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import BackBtn from "./BackBtn";
import SliderModal from "./SliderModal";
import Tabs from "./Tabs";

export default function StoryDetail({ data, Id, localData }) {
  const numberOfWords = 100;
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleExpand = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((row) => row !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };

  const collapseText = (index, text) => {
    if (!Number(text?.length)) {
      return "";
    }

    return expandedRows.includes(index) ? (
      <span className="py-2">
        {text}
        <button
          onClick={() => toggleExpand(index)}
          className={`${"text-primary-500 hover:text-secondary-500 font-bold"}`}
        >
          &nbsp; {localData?.see_less}
        </button>
      </span>
    ) : (
      <span className="py-2">
        {Number(text?.length) > numberOfWords
          ? text.slice(0, numberOfWords) + "..."
          : text}
        {Number(text?.length) > numberOfWords && (
          <button
            onClick={() => toggleExpand(index)}
            className={`${"text-primary-500 hover:text-secondary-500 font-bold"}`}
          >
            {localData.exp?.see_more}
          </button>
        )}
      </span>
    );
  };

  const generateManuscript = () => {
    return Object.keys(data.manuscripts).map((item, index) => (
      <p key={index}>
        <b>{item}</b>:&nbsp;
        {collapseText(index, data.manuscripts[item].join("; "))}
      </p>
    ));
  };

  const generateTranslations = () => {
    // TRANSLATION_STATUS_OPTIONS
    let finalString = "";
    for (let translation of data.translations) {
      let string = "<p>";
      string += `<b> ${translation.language_translated_to}: </b>`;
      string += `${translation.translation_author}. ${
        translation.translation_as_of_date
      }. ${
        translation.published_translation_book_title
          ? `<i> ${translation.published_translation_book_title}</i>`
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
        string += ` From ${translation.manuscript_name}, ${translation.translation_source_manuscript_folio}.`;
      }

      string += "</p>";
      finalString += string;
    }
    return finalString;
  };

  const discoverPage = () => {
    const tabArr = [
      {
        label: localData?.about,
      },
    ];
    if (data.summary_plot)
      tabArr.push({
        label: localData?.summary,
      });
    if (
      data.canonical_translation_recension === "True" ||
      data?.translation_author !== "No Translator"
    )
      tabArr.push({
        label: localData?.translation,
      });
    tabArr.push({
      label: localData?.Information,
    });
    tabArr.push({
      label: localData?.manuscripts,
    });

    return tabArr;
  };

  const IncipitFun = () => {
    let text = "";
    if (data?.canonical_incipit) {
      text = data?.canonical_incipit;
    }
    if (data?.canonical_incipit_2) {
      text += (data.canonical_incipit ? "; " : "") + data?.canonical_incipit_2;
    }
    if (data?.canonical_incipit_3) {
      text +=
        (data?.canonical_incipit || data?.canonical_incipit_2 ? "; " : "") +
        data?.canonical_incipit_3;
    }
    return text;
  };

  const cityThisTranslation = () => {
    const translation_author = data?.translation_author;
    const canonical_story_id = data?.canonical_story_id;
    const canonical_story_title = data?.canonical_story_title;
    const baseUrl = window?.location?.hostname;
    const translation_as_of_date = data?.translation_as_of_date;
    const original_macomber_title = data?.original_macomber_title;
    const published_translation_book_title =
      data?.published_translation_book_title;
    const published_translation_book_page_span =
      data?.published_translation_book_page_span;
    const published_translation_book_item =
      data?.published_translation_book_item;

    const published_translation_book_page_span_condition_wise =
      data.published_translation_book_page_span
        ? `, page ${data.published_translation_book_page_span}`
        : data.published_translation_book_item
        ? `, page ${data.published_translation_book_item}`
        : "";

    return !data.is_published
      ? eval(`\`${localData?.city_this_translation_condition_true}\``)
      : eval(`\`${localData?.city_this_translation_condition_false}\``);
  };

  const NextPreviesButton = () => {
    return (
      <div className="sm:space-x-5 space-y-5 sm:space-y-0 pt-3 text-offWhite-500 font-semibold font-body flex items-start text-sm md:text-base flex-col sm:flex-row">
        {data.previous_story && (
          <Link
            className="bg-primary-500 transition-all font-normal hover:text-white hover:bg-secondary-500 border border-transparent hover:border-secondary-500 rounded-md space-x-2 inline-flex items-center px-2 sm:px-3 py-1 font-body tracking-wide"
            href={`/stories/${data.previous_story}`}
          >
            <span>{localData?.view_the_previous_part_of_the_story}</span>
          </Link>
        )}
        {data.next_story && (
          <Link
            className="bg-primary-500 transition-all font-normal hover:text-white hover:bg-secondary-500 border border-transparent hover:border-secondary-500 rounded-md space-x-2 inline-flex items-center px-2 sm:px-3 py-1 font-body tracking-wide"
            href={`/stories/${data.next_story}`}
          >
            <span>{localData?.view_the_next_part_of_the_story}</span>
          </Link>
        )}
      </div>
    );
  };

  function FirstLine(localData, earliest_attestation) {
    const earliestStatus =
      earliest_attestation >= 1300 && earliest_attestation < 1500
        ? "very old"
        : earliest_attestation >= 1500 && earliest_attestation < 1800
        ? "old"
        : earliest_attestation >= 1800 && earliest_attestation < 1950
        ? "recent"
        : earliest_attestation >= 1950
        ? "very recent"
        : "";

    return (
      <>
        {earliest_attestation && (
          <p
            className="text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: eval(`\`${localData?.firstline_of_story_detail}\``),
            }}
          ></p>
        )}
      </>
    );
  }

  function SecondLine(localData, total_records, total_completed_manuscript) {
    const percentage = Math.ceil(
      (total_records / total_completed_manuscript) * 100
    );
    const generateLine = () => {
      if (percentage >= 50)
        return (
          <p
            dangerouslySetInnerHTML={{
              __html: eval(
                `\`${localData?.secondline_of_story_detail_condition_1}\``
              ),
            }}
          ></p>
        );
      else if (total_records >= 2 && total_records <= 6)
        return (
          <p
            dangerouslySetInnerHTML={{
              __html: eval(
                `\`${localData?.secondline_of_story_detail_condition_2}\``
              ),
            }}
          ></p>
        );
      else if (total_records === 1)
        return (
          <p
            dangerouslySetInnerHTML={{
              __html: eval(
                `\`${localData?.secondline_of_story_detail_condition_3}\``
              ),
            }}
          ></p>
        );
      else
        return (
          <p
            dangerouslySetInnerHTML={{
              __html: eval(
                `\`${localData?.secondline_of_story_detail_condition_4}\``
              ),
            }}
          ></p>
        );
    };
    return generateLine();
  }

  function ThirdLine(
    localData,
    total_records,
    total_story_id_paintings,
    canonical_story_id,
    total_manuscripts_with_story_id_illustrated
  ) {
    const dynamicParagraph = () => {
      return total_story_id_paintings === 0
        ? eval(`\`${localData?.thirdline_of_story_detail_line_2}\``)
        : ID_LIST.includes(canonical_story_id)
        ? total_manuscripts_with_story_id_illustrated == null ||
          total_manuscripts_with_story_id_illustrated != 0
          ? eval(`\`${localData?.thirdline_of_story_detail_line_2}\``)
          : eval(`\`${localData?.thirdline_of_story_detail_line_3}\``)
        : total_manuscripts_with_story_id_illustrated == null ||
          total_manuscripts_with_story_id_illustrated != 0
        ? eval(`\`${localData?.thirdline_of_story_detail_line_4}\``)
        : eval(`\`${localData?.thirdline_of_story_detail_line_5}\``);
    };

    return (
      <>
        {total_records && (
          <p
            className="text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: dynamicParagraph(),
            }}
          ></p>
        )}
      </>
    );
  }

  function ForthLine(localData, type_of_story) {
    return (
      <p
        className="text-base leading-relaxed"
        dangerouslySetInnerHTML={{
          __html:
            type_of_story == "Life of Mary"
              ? eval(
                  `\`${localData?.forthline_of_story_detail_condition_true}\``
                )
              : eval(
                  `\`${localData?.forthline_of_story_detail_condition_false}\``
                ),
        }}
      ></p>
    );
  }

  function FifthLine(localData, origin) {
    return (
      <p
        className="text-base leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: eval(`\`${localData?.fifthline_of_story_detail}\``),
        }}
      ></p>
    );
  }

  function SixthLine(localData, languageAvailableIn) {
    languageAvailableIn = languageAvailableIn.join(", ");
    return (
      <p
        className="text-base leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: eval(`\`${localData?.sixthline_of_story_detail}\``),
        }}
      ></p>
    );
  }

  function SeventhLine(localData) {
    return (
      <p
        className="text-sm leading-relaxed py-2"
        dangerouslySetInnerHTML={{
          __html: eval(`\`${localData?.seventhline_of_story_detail}\``),
        }}
      ></p>
    );
  }

  return data ? (
    <div className="container-fluid py-4 lg:py-10">
      <BackBtn />
      <h1 className="font-body text-primary-500 text-2xl lg:text-4xl leading-tight font-bold">
        {data?.canonical_story_title}
      </h1>

      <div className="pt-10 font-menu">
        <a href="#content" className="sr-only sr-only-focusable">
          Skip to content
        </a>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 ">
          {/* Left sided Image portion  */}
          <div>
            {/* slider */}
            {Boolean(data?.paintingLinks) && (
              <SliderModal sliderImg={data.paintingLinks} />
            )}

            {/* slider content */}
            <div
              className={`space-y-4 mb-10 md:block hidden font-body ${
                data?.paintingLinks.length <= 1 && "mt-10"
              } `}
            >
              <ol className="list-inside space-y-5">
                <li>
                  <h3 className="text-lg font-bold uppercase text-justify">
                    {localData?.content_information}
                  </h3>
                  <ul className="ml-3 -indent-3">
                    <p className="text-sm leading-normal">
                      <b>{localData?.story_type}: </b>
                      {data?.type_of_story
                        ? data?.type_of_story
                        : localData?.none}
                    </p>
                    <p className="text-sm leading-normal">
                      <b>{localData?.story_theme}: </b>
                      {data?.canonical_story_subject
                        ? data?.canonical_story_subject
                        : localData?.none}
                    </p>
                    {data?.readings_dates && (
                      <p className="text-sm leading-normal">
                        <b>{localData?.date_read_in_church}: </b>
                        {data?.readings_dates}
                      </p>
                    )}
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg mb-1 font-bold uppercase text-justify">
                    {localData?.technical_information}
                  </h3>
                  <ul className="text-sm ml-3 -indent-3">
                    <p className="leading-normal">
                      <b>
                        {localData?.earliest_attested_instance_of_the_story}:{" "}
                      </b>
                      {data?.manuscript_date_range_start &&
                      data?.manuscript_date_range_end
                        ? data?.manuscript_date_range_start ===
                          data?.manuscript_date_range_end
                          ? data?.manuscript_date_range_start
                          : data.manuscript_date_range_start +
                            " - " +
                            data.manuscript_date_range_end
                        : ` ${localData?.none}`}
                    </p>
                    <p className="leading-normal">
                      <b>
                        {localData?.earliest_manuscripts_in_which_story_appears}
                        :{" "}
                      </b>
                      {data?.names_of_mss_with_earliest_attestation}
                    </p>
                    <p className="leading-normal">
                      <b>
                        {localData?.total_manuscripts_in_which_story_appears}:{" "}
                      </b>
                      {data?.total_records}
                    </p>
                    <p className="leading-normal">
                      <b>{localData?.total_incipits_in_the_itool}: </b>
                      {data?.total_incipits_typed}
                    </p>
                    <p className="leading-normal">
                      <b>{localData?.incipit}: </b> {IncipitFun()}
                    </p>
                    <p className="leading-normal">
                      <b>{localData?.id_numbers}:</b> {localData?.pemm_theme_id}{" "}
                      {data?.pemm_theme_id_number}; {localData?.pemm_id} {Id}
                      {data?.canonical_story_id <= macomber_id_number &&
                        `; ${localData?.macomber_id} ` +
                          data?.canonical_story_id}
                      {data?.hamburg_id
                        ? `; ${localData?.beta_masahaft_id} ` + data?.hamburg_id
                        : ""}
                      {data?.clavis_id
                        ? `; ${localData?.clavis_id} ` + data?.clavis_id
                        : ""}
                      {data?.csm_number
                        ? `; ${localData?.cantigas_id} ` + data.csm_number
                        : ""}
                      {data?.poncelet_number
                        ? `; ${localData?.poncelet_id} ` + data.poncelet_number
                        : ""}
                    </p>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          {/* Right side content portion */}
          <div className="col-span-2 md:block hidden" id="content">
            <div className="space-y-4 mb-10">
              <ol className="list-inside md:pl-4 font-body">
                <li>
                  <ul className="space-y-4 font-body space-y-p">
                    {FirstLine(localData, data?.earliest_attestation)}
                    {SecondLine(
                      localData,
                      data?.total_records,
                      +data?.total_completed_manuscript
                    )}
                    {ThirdLine(
                      localData,
                      data?.total_records,
                      data?.total_story_id_paintings,
                      data?.canonical_story_id,
                      data?.total_manuscripts_with_story_id_illustrated
                    )}
                    {ForthLine(localData, data?.type_of_story)}
                    {FifthLine(localData, data?.origin)}
                    {SixthLine(localData, data?.languageAvailableIn)}
                    {SeventhLine(localData)}
                  </ul>
                </li>
              </ol>
            </div>

            {/* Summary */}
            {data.summary_plot && (
              <div className="space-y-4">
                <ol className="list-inside md:pl-4 font-body p-0">
                  <li>
                    <h3
                      className={`text-lg font-bold uppercase my-3 ${
                        !data.summary_plot && "mb-5"
                      }`}
                    >
                      {localData?.summary}
                    </h3>
                    <p
                      className="text-base leading-loose mb-3"
                      dangerouslySetInnerHTML={{
                        __html: data.summary_plot,
                      }}
                    ></p>
                  </li>
                </ol>
              </div>
            )}
            {/* English translation */}
            <div className="space-y-4">
              <ol className="list-inside md:pl-4 font-body p-0">
                {data.canonical_translation_recension === "True" && (
                  <li>
                    <h3
                      className={`text-lg font-bold uppercase mb-3 ${
                        data.canonical_translation_recension !== "True" &&
                        "mb-5"
                      } `}
                    >
                      {localData?.translation}
                    </h3>

                    {data.translation_author !== "No Translator" &&
                      data.translation_author &&
                      data.manuscript_name && (
                        <p
                          className="text-base leading-normal mb-3  italic"
                          dangerouslySetInnerHTML={{
                            __html: (() => {
                              let translation_author = data.translation_author;
                              let manuscript_name = data.manuscript_name;
                              let translation_source_manuscript_folio =
                                data.translation_source_manuscript_folio;
                              let translation_as_of_date =
                                data.translation_as_of_date;

                              return eval(
                                `\`${localData?.translated_by_author_name}\``
                              );
                            })(),
                          }}
                        ></p>
                      )}
                    <p
                      className="text-base leading-loose mb-3 space-y-if-p-has-p"
                      dangerouslySetInnerHTML={{
                        __html: data.english_translation,
                      }}
                    ></p>
                  </li>
                )}
                {NextPreviesButton()}
                {data.canonical_story_research_note && (
                  <li>
                    <h3 className={`text-lg font-bold uppercase mb-3  `}>
                      {localData?.additional_information}
                    </h3>
                    <p
                      className="text-base leading-loose mb-3"
                      dangerouslySetInnerHTML={{
                        __html: data.canonical_story_research_note,
                      }}
                    ></p>
                  </li>
                )}

                {data.canonical_translation_recension === "True" &&
                  data?.translation_author !== "No Translator" &&
                  data?.translation_author && (
                    <li>
                      <h3 className="text-lg font-bold uppercase my-3">
                        {localData?.to_cite_this_translation}
                      </h3>

                      <p
                        className="text-base leading-loose mb-3 space-y-if-p-has-p "
                        dangerouslySetInnerHTML={{
                          __html: cityThisTranslation(),
                        }}
                      ></p>
                    </li>
                  )}
              </ol>
            </div>
            <div className="space-y-4 mb-10">
              <ol className="list-inside md:pl-4 font-body">
                <li>
                  <h3 className="text-lg font-bold uppercase mb-3">
                    {data.translations.length > 0 &&
                      localData?.translations_and_editions_of_this_story}
                  </h3>
                  <ul className="space-y-4 font-body space-y-p">
                    <p
                      className="text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: generateTranslations(),
                      }}
                    ></p>
                  </ul>
                </li>
              </ol>
            </div>
            <div className="space-y-4 mb-10">
              <ol className="list-inside md:pl-4 font-body">
                <li>
                  <h3 className="text-lg font-bold uppercase mb-3">
                    {localData?.manuscripts}
                  </h3>
                  <ul className="space-y-4 font-body space-y-p">
                    <p className="text-base leading-relaxed">
                      {localData?.pemm_manuscript_in_which_the_story_appears}
                    </p>
                    <p className="text-base leading-relaxed">
                      {generateManuscript()}
                    </p>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* This below content is for mobile responsive  */}
      <div className="md:hidden block font-body">
        <Tabs
          tabs={discoverPage()}
          onClick={(e) => {
            console.log("onClick prop:", e);
          }}
        >
          {/* About */}
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4 mb-10">
              <ol className="list-inside md:pl-4 font-body">
                <li>
                  <ul className="space-y-4 font-body space-y-p">
                    {FirstLine(localData, data?.earliest_attestation)}
                    {SecondLine(
                      localData,
                      data?.total_records,
                      +data?.total_completed_manuscript
                    )}
                    {ThirdLine(
                      localData,
                      data?.total_records,
                      data?.total_story_id_paintings,
                      data?.canonical_story_id,
                      data?.total_manuscripts_with_story_id_illustrated
                    )}
                    {ForthLine(localData, data?.type_of_story)}
                    {FifthLine(localData, data?.origin)}
                    {SixthLine(localData, data?.languageAvailableIn)}
                    {SeventhLine(localData)}
                  </ul>
                </li>
              </ol>
            </div>
          </Tab.Panel>

          {/* Summary */}
          {data.summary_plot && (
            <Tab.Panel className="p-4 md:p-6">
              <div className="space-y-4">
                <ol className="list-inside md:pl-4 font-body p-0">
                  <li>
                    <h3 className="text-lg font-bold uppercase my-3">
                      {localData?.summary}
                    </h3>
                    <p
                      className="text-base leading-loose mb-3 space-y-if-p-has-p"
                      dangerouslySetInnerHTML={{
                        __html: data.summary_plot,
                      }}
                    ></p>
                  </li>
                </ol>
              </div>
            </Tab.Panel>
          )}

          {/* TRANSLATION */}
          {(data.canonical_translation_recension === "True" ||
            data?.translation_author !== "No Translator" ||
            data.translations.length > 0) && (
            <Tab.Panel className="p-4 md:p-6">
              <div className="space-y-4">
                <ol className="list-inside md:pl-4 font-body p-0">
                  <li>
                    {data.canonical_translation_recension === "True" && (
                      <>
                        <h3 className="text-lg font-bold uppercase mb-3">
                          {localData?.translation}
                        </h3>
                        {data.translation_author !== "No Translator" &&
                          data.translation_author &&
                          data.manuscript_name && (
                            <p
                              className="text-base leading-loose mb-3 space-y-if-p-has-p italic"
                              dangerouslySetInnerHTML={{
                                __html: (() => {
                                  let translation_author =
                                    data.translation_author;
                                  let manuscript_name = data.manuscript_name;
                                  let translation_source_manuscript_folio =
                                    data.translation_source_manuscript_folio;
                                  let translation_as_of_date =
                                    data.translation_as_of_date;

                                  return localData?.translated_by_author_name;
                                })(),
                              }}
                            ></p>
                          )}
                        <p
                          className="text-base leading-loose mb-3 space-y-if-p-has-p"
                          dangerouslySetInnerHTML={{
                            __html: data.english_translation,
                          }}
                        ></p>
                      </>
                    )}
                    {NextPreviesButton()}
                    {data.canonical_story_research_note && (
                      <li>
                        <h3 className={`text-lg font-bold uppercase mb-3  `}>
                          {localData?.additional_information}
                        </h3>
                        <p
                          className="text-base leading-loose mb-3 space-y-p space-y-if-p-has-p"
                          dangerouslySetInnerHTML={{
                            __html: data.canonical_story_research_note,
                          }}
                        ></p>
                      </li>
                    )}
                    {data.canonical_translation_recension === "True" &&
                      data?.translation_author !== "No Translator" &&
                      data?.translation_author && (
                        <>
                          <h3 className="text-lg font-bold uppercase my-3">
                            {localData?.to_cite_this_translation}
                          </h3>
                          <p
                            className="text-base leading-loose mb-3 space-y-p space-y-if-p-has-p"
                            dangerouslySetInnerHTML={{
                              __html: cityThisTranslation(),
                            }}
                          ></p>
                        </>
                      )}

                    <h3 className="text-lg font-bold uppercase mb-3">
                      {data.translations.length > 0 &&
                        localData?.translations_and_editions_of_this_story}
                    </h3>
                    <ul className="space-y-4 font-body space-y-p">
                      <p
                        className="text-base leading-relaxed "
                        dangerouslySetInnerHTML={{
                          __html: generateTranslations(),
                        }}
                      ></p>
                    </ul>
                  </li>
                </ol>
              </div>
            </Tab.Panel>
          )}
          {/* Information */}
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4 mb-10">
              <ol className="list-inside md:pl-4 font-body p-0">
                <li>
                  <h3 className="text-lg font-bold uppercase text-justify">
                    {localData?.content_information}
                  </h3>
                  <ul className="ml-3 -indent-3">
                    <p className="text-base leading-normal">
                      <b>{localData?.story_type}: </b>
                      {data?.type_of_story
                        ? data?.type_of_story
                        : localData?.none}
                    </p>
                    <p className="text-base leading-normal">
                      <b>{localData?.story_theme}: </b>
                      {data?.canonical_story_subject
                        ? data?.canonical_story_subject
                        : localData?.none}
                    </p>
                    {data?.readings_dates && (
                      <p className="text-sm leading-normal">
                        <b>{localData?.date_read_in_church}: </b>
                        {data?.readings_dates}
                      </p>
                    )}
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg mb-1 font-bold uppercase text-justify">
                    {localData?.technical_information}
                  </h3>
                  <ul className="text-sm ml-3 -indent-3">
                    <p className="leading-normal">
                      <b>
                        {localData?.earliest_attested_instance_of_the_story}:{" "}
                      </b>
                      {data?.manuscript_date_range_start &&
                      data?.manuscript_date_range_end
                        ? data?.manuscript_date_range_start ===
                          data?.manuscript_date_range_end
                          ? data?.manuscript_date_range_start
                          : data.manuscript_date_range_start +
                            " - " +
                            data.manuscript_date_range_end
                        : ` ${localData?.none}`}
                    </p>
                    <p className="leading-normal">
                      <b>
                        {localData?.earliest_manuscripts_in_which_story_appears}
                        :{" "}
                      </b>
                      {data?.names_of_mss_with_earliest_attestation}
                    </p>
                    <p className="leading-normal">
                      <b>
                        {localData?.total_manuscripts_in_which_story_appears}:{" "}
                      </b>
                      {data?.total_records}
                    </p>
                    <p className="leading-normal">
                      <b>{localData?.total_incipits_in_the_itool}: </b>
                      {data?.total_incipits_typed}
                    </p>
                    <p className="leading-normal">
                      <b>{localData?.incipit}: </b>
                      {IncipitFun()}
                    </p>
                    <p className="leading-normal">
                      <b>{localData?.id_numbers}: </b>{" "}
                      {localData?.pemm_theme_id} {data?.pemm_theme_id_number};{" "}
                      {localData?.pemm_id} {Id}
                      {data?.canonical_story_id <= macomber_id_number &&
                        `; ${localData?.macomber_id} ` +
                          data?.canonical_story_id}
                      {data?.hamburg_id
                        ? `; ${localData?.beta_masahaft_id} ` + data?.hamburg_id
                        : ""}
                      {data?.clavis_id
                        ? `; ${localData?.clavis_id} ` + data?.clavis_id
                        : ""}
                      {data?.csm_number
                        ? `; ${localData?.cantigas_id} ` + data.csm_number
                        : ""}
                      {data?.poncelet_number
                        ? `; ${localData?.poncelet_id} ` + data.poncelet_number
                        : ""}
                    </p>
                  </ul>
                </li>
              </ol>
            </div>
          </Tab.Panel>

          {/* Manuscripts */}
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4 mb-10">
              <ol className="list-inside md:pl-4 font-body">
                <li>
                  <h3 className="text-lg font-bold uppercase mb-3">
                    {localData.manuscript}
                  </h3>
                  <ul className="space-y-4 font-body space-y-p">
                    <p className="text-base leading-relaxed">
                      {localData?.pemm_manuscript_in_which_the_story_appears}
                    </p>
                    <p className="text-base leading-relaxed">
                      {generateManuscript()}
                    </p>
                  </ul>
                </li>
              </ol>
            </div>
          </Tab.Panel>
        </Tabs>
      </div>
    </div>
  ) : (
    <div className="flex items-center py-36 justify-center w-full text-2xl text-primary-500 font-bold">
      <h1>{localData?.records_not_found}</h1>
    </div>
  );
}
