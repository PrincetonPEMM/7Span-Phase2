"use client";
import { ID_LIST, macomber_id_number } from "@/utils/constant";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BackBtn from "./BackBtn";
import SliderModal from "./SliderModal";
import Tabs from "./Tabs";

export default function StoryDetail({ results, Id, localData, lang }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const translationSeqP = params.get("translationSeq");
  const [loading, setLoading] = useState(false);
  const [translationSeq, setTranslationSeq] = useState(
    +translationSeqP || null
  );
  const [data, setData] = useState(results);
  const [expandedRows, setExpandedRows] = useState([]);
  const summaryRef = useRef(null);
  const numberOfWords = 100;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      router.push(`${pathname}?translationSeq=${translationSeq}`);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories/${Id}?language=${lang}&translation_seq=${translationSeq}`
        );

        const json = await response.json();
        setData(json);
        if (summaryRef.current) {
          summaryRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error", error);
      }
    };
    if (translationSeq) fetchData();
  }, [translationSeq]);

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
            {localData?.see_more}
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
        label: SummaryTitle(),
      });
    if (
      data.canonical_translation_recension === "True" ||
      data?.translation_author !== "No Translator"
    )
      tabArr.push({
        label: TranslationTitle(),
      });
    tabArr.push({
      label: localData?.information,
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
    let manuscript_name = data.manuscript_name;
    let translation_source_manuscript_folio =
      data.translation_source_manuscript_folio;

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
      <div className="sm:space-x-5 space-y-5 sm:space-y-0 text-offWhite-500 font-semibold font-body flex items-start text-sm md:text-base flex-col sm:flex-row">
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
  // current_translation_seq
  const NextPreviesTranslationButton = () => {
    return (
      <div className="sm:space-x-5 space-y-5 sm:space-y-0 text-offWhite-500 font-semibold font-body flex items-start text-sm md:text-base flex-col sm:flex-row">
        {data.previous_translation_seq && (
          <button
            className="bg-primary-500 transition-all font-normal hover:text-white hover:bg-secondary-500 border border-transparent hover:border-secondary-500 rounded-md space-x-2 inline-flex items-center px-2 sm:px-3 py-1 font-body tracking-wide"
            onClick={() => setTranslationSeq(data.previous_translation_seq)}
          >
            <span>{localData?.read_previous_translation_of_this_story}</span>
          </button>
        )}
        {data.next_translation_seq && (
          <button
            className="bg-primary-500 transition-all font-normal hover:text-white hover:bg-secondary-500 border border-transparent hover:border-secondary-500 rounded-md space-x-2 inline-flex items-center px-2 sm:px-3 py-1 font-body tracking-wide"
            onClick={() => setTranslationSeq(data.next_translation_seq)}
          >
            <span>{localData?.read_another_translation_of_this_story}</span>
          </button>
        )}
      </div>
    );
  };

  const SummaryTitle = () => {
    switch (translationSeq) {
      case 2:
        return localData?.summary_of_second_translation;
      case 3:
        return localData?.summary_of_third_translation;
      case 4:
        return localData?.summary_of_fourth_translation;
      case 5:
        return localData?.summary_of_fifth_translation;
      case 6:
        return localData?.summary_of_sixth_translation;
      case 7:
        return localData?.summary_of_seventh_translation;
      case 8:
        return localData?.summary_of_eighth_translation;
      case 9:
        return localData?.summary_of_ninth_translation;
      default:
        return localData?.summary;
    }
  };

  const TranslationTitle = () => {
    switch (translationSeq) {
      case 2:
        return localData?.second_translation;
      case 3:
        return localData?.third_translation;
      case 4:
        return localData?.fourth_translation;
      case 5:
        return localData?.fifth_translation;
      case 6:
        return localData?.sixth_translation;
      case 7:
        return localData?.seventh_translation;
      case 8:
        return localData?.eighth_translation;
      case 9:
        return localData?.ninth_translation;
      default:
        return localData?.translation;
    }
  };

  const ToCiteTranslationTitle = () => {
    switch (translationSeq) {
      case 2:
        return localData?.to_cite_this_second_translation;
      case 3:
        return localData?.to_cite_this_third_translation;
      case 4:
        return localData?.to_cite_this_fourth_translation;
      case 5:
        return localData?.to_cite_this_fifth_translation;
      case 6:
        return localData?.to_cite_this_sixth_translation;
      case 7:
        return localData?.to_cite_this_seventh_translation;
      case 8:
        return localData?.to_cite_this_eighth_translation;
      case 9:
        return localData?.to_cite_this_ninth_translation;
      default:
        return localData?.to_cite_this_translation;
    }
  };

  function FirstLine(localData, pemm_short_title, earliest_attestation) {
    const earliestStatus =
      earliest_attestation >= 1300 && earliest_attestation < 1500
        ? localData?.very_old
        : earliest_attestation >= 1500 && earliest_attestation < 1800
        ? localData?.old
        : earliest_attestation >= 1800 && earliest_attestation < 1950
        ? localData?.recent
        : earliest_attestation >= 1950
        ? localData?.very_recent
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
      if (total_story_id_paintings > 0) {
        if (total_manuscripts_with_story_id_illustrated === 0) {
          if (ID_LIST.includes(canonical_story_id)) {
            return eval(`\`${localData?.thirdline_of_story_detail_line_2}\``);
          } else {
            return eval(`\`${localData?.thirdline_of_story_detail_line_4}\``);
          }
        } else {
          if (ID_LIST.includes(canonical_story_id)) {
            return eval(`\`${localData?.thirdline_of_story_detail_line_3}\``);
          } else {
            return eval(`\`${localData?.thirdline_of_story_detail_line_5}\``);
          }
        }
      }
      return eval(`\`${localData?.thirdline_of_story_detail_line_1}\``);

      /* OLD LOGIC */
      // return total_story_id_paintings > 0
      //   ? eval(`\`${localData?.thirdline_of_story_detail_line_2}\``)
      //   : ID_LIST.includes(canonical_story_id)
      //   ? total_manuscripts_with_story_id_illustrated == null ||
      //     total_manuscripts_with_story_id_illustrated != 0
      //     ? eval(`\`${localData?.thirdline_of_story_detail_line_2}\``)
      //     : eval(`\`${localData?.thirdline_of_story_detail_line_3}\``)
      //   : total_manuscripts_with_story_id_illustrated == null ||
      //     total_manuscripts_with_story_id_illustrated != 0
      //   ? eval(`\`${localData?.thirdline_of_story_detail_line_4}\``)
      //   : eval(`\`${localData?.thirdline_of_story_detail_line_5}\``);
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
        className="text-base leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: eval(`\`${localData?.pemm_feedback_form_for_story_detail}\``),
        }}
      ></p>
    );
  }

  function EightLine(localData) {
    return (
      <p
        className="text-sm leading-relaxed py-2"
        dangerouslySetInnerHTML={{
          __html: eval(`\`${localData?.seventhline_of_story_detail}\``),
        }}
      ></p>
    );
  }

  const EnglishTranslationNote = () =>
    Boolean(!data?.english_translation) && (
      <>
        <h3
          className={`text-lg font-bold uppercase mb-3 ${
            data.canonical_translation_recension !== "True" && "mb-5"
          } `}
        >
          {TranslationTitle()}
        </h3>
        <div className="text-sm leading-relaxed">
          የዚህ ተአምር የአማርኛ ትርጉም በታተሙ የተአምረ ማርያም መጻሕፍት ውስጥ ይገኛል (ዝቅ ብሎ ያለውን ዝርዝር
          ይመልከቱ)። ነገር ግን፣ በፐም ዌብሳይት ላይ ገና አልተዘጋጀም።
        </div>
      </>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center w-full text-2xl text-primary-500 font-bold py-32">
        {localData?.fetching_translation_of_the_story}...
      </div>
    );
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
                <li>
                  <h3 className="text-lg mb-1 font-bold text-justify">
                    {data.translations.length > 0 &&
                      localData?.translations_and_editions_of_this_story}
                  </h3>
                  <ul className="text-sm ml-3 -indent-3">
                    <p
                      className="leading-normal"
                      dangerouslySetInnerHTML={{
                        __html: generateTranslations(),
                      }}
                    ></p>
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg mb-1 font-bold text-justify">
                    {localData?.pemm_manuscript_in_which_the_story_appears}
                  </h3>
                  <ul className="text-sm ml-3 -indent-3">
                    <p className="leading-normal">{generateManuscript()}</p>
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
                    {FirstLine(
                      localData,
                      data?.pemm_short_title,
                      data?.earliest_attestation
                    )}
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
                    {EightLine(localData)}
                  </ul>
                </li>
              </ol>
            </div>
            {/* Summary */}
            {data.summary_plot && (
              <div className="space-y-4" ref={summaryRef}>
                <ol className="list-inside md:pl-4 font-body p-0">
                  <li>
                    <h3
                      className={`text-lg font-bold uppercase my-3 ${
                        !data.summary_plot && "mb-5"
                      }`}
                    >
                      {SummaryTitle()}
                    </h3>
                    <p
                      className="text-base leading-relaxed mb-3"
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
                {EnglishTranslationNote()}
                {/* {data.canonical_translation_recension === "True" && ( */}
                <li>
                  <h3
                    className={`text-lg font-bold uppercase mb-3 ${
                      data.canonical_translation_recension !== "True" && "mb-5"
                    } `}
                  >
                    {TranslationTitle()}
                  </h3>

                  {data.translation_author !== "No Translator" &&
                    data.translation_author &&
                    data.manuscript_name && (
                      <p
                        className="text-base leading-relaxed mb-3  space-y-4 italic"
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
                    className="text-base leading-relaxed mb-3 space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: data.english_translation,
                    }}
                  ></p>
                </li>
                {/* )} */}
                {NextPreviesButton()}
                {NextPreviesTranslationButton()}
                {data.canonical_story_research_note && (
                  <li>
                    <h3 className={`text-lg font-bold uppercase mb-3  `}>
                      {localData?.additional_information}
                    </h3>
                    <p
                      className="text-base leading-relaxed mb-3"
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
                        {ToCiteTranslationTitle()}
                      </h3>

                      <p
                        className="text-base leading-relaxed mb-3"
                        dangerouslySetInnerHTML={{
                          __html: cityThisTranslation(),
                        }}
                      ></p>
                    </li>
                  )}
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
                    {FirstLine(
                      localData,
                      data?.pemm_short_title,
                      data?.earliest_attestation
                    )}
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
                    {EightLine(localData)}
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
                      {SummaryTitle()}
                    </h3>
                    <p
                      className="text-base leading-relaxed mb-3 space-y-p"
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
              {EnglishTranslationNote()}
              <div className="space-y-4">
                <ol className="list-inside md:pl-4 font-body p-0">
                  <li>
                    {data.canonical_translation_recension === "True" && (
                      <>
                        <h3 className="text-lg font-bold uppercase mb-3">
                          {TranslationTitle()}
                        </h3>
                        {data.translation_author !== "No Translator" &&
                          data.translation_author &&
                          data.manuscript_name && (
                            <p
                              className="text-base leading-relaxed mb-3 space-y-p italic"
                              dangerouslySetInnerHTML={{
                                __html: (() => {
                                  let translation_author =
                                    data.translation_author;
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
                          className="text-base leading-relaxed mb-3 space-y-p"
                          dangerouslySetInnerHTML={{
                            __html: data.english_translation,
                          }}
                        ></p>
                      </>
                    )}
                    {NextPreviesButton()}
                    {NextPreviesTranslationButton()}
                    {data.canonical_story_research_note && (
                      <li>
                        <h3 className={`text-lg font-bold uppercase mb-3  `}>
                          {localData?.additional_information}
                        </h3>
                        <p
                          className="text-base leading-relaxed mb-3 space-y-p"
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
                            {ToCiteTranslationTitle()}
                          </h3>
                          <p
                            className="text-base leading-relaxed mb-3 space-y-p"
                            dangerouslySetInnerHTML={{
                              __html: cityThisTranslation(),
                            }}
                          ></p>
                        </>
                      )}

                    <h3 className="text-lg font-bold mb-3">
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
                  <h3 className="text-lg font-bold mb-3">
                    {localData.pemm_manuscript_in_which_the_story_appears}
                  </h3>
                  <ul className="space-y-4 font-body space-y-p">
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
