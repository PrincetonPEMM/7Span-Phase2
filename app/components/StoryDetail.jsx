"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import Tabs from "@/app/components/Tabs";
import SliderModal from "@/app/components/SliderModal";
import {
  ID_LIST,
  TOTAL_NUM_MANUSCRIPTS_WITH_MS_STATUS_COMPLETE,
} from "@/utils/constant";
import Link from "next/link";

export default function StoryDetail({ data, Id }) {
  const generateTranslations = () => {
    // TRANSLATION_STATUS_OPTIONS
    let finalString = "";
    for (let translation of data.translations) {
      let string = "<h2>";
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
        string += `From ${translation.manuscript_name}, ${translation.translation_source_manuscript_folio}.`;
      }

      string += "</h2>";
      finalString += string;
    }
    return finalString;
  };

  const generateManuscript = () => {
    // TRANSLATION_STATUS_OPTIONS
    let finalString = "";
    const keys = Object.keys(data.manuscripts);
    for (let key of keys) {
      let string = "<p>";
      string += `<b>${key}</b>: `;
      string += `${data.manuscripts[key].join(";")}`;
      string += "</p>";
      finalString += string;
    }

    return finalString;
  };

  const discoverPage = [
    {
      label: "About",
    },
    {
      label: "Information",
    },
    {
      label: "Translation",
    },
    {
      label: "Manuscripts",
    },
  ];

  console.log(data, "datadatadata");

  return (
    <div className="px-4 py-5 md:px-8">
      <h3 className="font-menu  text-2xl lg:text-5xl max-w-7xl leading-tight">
        {data.canonical_story_title}
      </h3>

      <div className="pt-10 font-menu">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 ">
          {/* Left sided Image portion  */}
          <div>
            {/* slider */}
            {Boolean(data?.paintingLinks) && (
              <SliderModal sliderImg={data.paintingLinks} />
            )}

            {/* slider content */}

            <div className="space-y-4 mb-10 md:block hidden">
              <ol className="list-inside space-y-5">
                <li>
                  <h3 className="text-lg font-bold uppercase text-justify">
                    CONTENT INFORMATION
                  </h3>
                  <ul>
                    <p className="text-sm leading-normal">
                      <b>Story Type:</b> {data.type_of_story}
                    </p>
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg mb-1 font-bold uppercase text-justify">
                    TECHNICAL INFORMATION
                  </h3>
                  <ul className="text-sm">
                    <p className="leading-normal">
                      <b>Earliest Attested Instance of the Story:</b>{" "}
                      {data.manuscript_date_range_start} -{" "}
                      {data.manuscript_date_range_end}
                    </p>
                    <p className="leading-normal">
                      <b>Earliest Manuscripts in which Story Appears:</b>{" "}
                      {data.names_of_mss_with_earliest_attestation}
                    </p>
                    <p className="leading-normal">
                      <b>Total Manuscripts in which Story Appears:</b>{" "}
                      {data.total_records}
                    </p>
                    <p className="leading-normal">
                      <b>Total Incipits in the ITool:</b>{" "}
                      {data.total_incipits_typed}
                    </p>
                    <p className="leading-normal">
                      <b>ID Numbers:</b> PEMM ID {data.canonical_story_id}
                      {data.canonical_story_id
                        ? "; Macomber ID " + data.canonical_story_id
                        : ""}
                      {data.hamburg_id
                        ? "; Beta maṣāḥǝft  ID " + data.hamburg_id
                        : ""}
                      {data.clavis_id ? "; Clavis ID " + data.clavis_id : ""}
                      {data.csm_number
                        ? "; Cantigas ID " + data.csm_number
                        : ""}
                      {data.poncelet_number
                        ? "; Poncelet ID " + data.poncelet_number
                        : ""}
                    </p>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          {/* Right side content portion */}
          <div className="col-span-2 md:block hidden ">
            <div className="space-y-4 mb-10">
              <ol className="list-inside pl-4 ">
                <li>
                  <ul className="space-y-2">
                    {FirstLine(data?.earliest_attestation)}
                    {SeconsdLine(data?.total_records)}
                    {ThirdLine(
                      data.total_records,
                      data.total_story_id_paintings,
                      data.canonical_story_id,
                      data.total_manuscripts_with_story_id_illustrated
                    )}
                    {ForthLine(data.type_of_story)}
                    {FifthLine(data.origin)}
                    {SixthLine(data.languageAvailableIn)}
                    {SeventhLine()}
                  </ul>
                </li>
              </ol>
            </div>

            {/* English translation */}
            <div className="space-y-4">
              <ol className="list-inside md:pl-4 p-0">
                <li>
                  <h3 className="text-lg font-bold uppercase mb-3 ">
                    TRANSLATION
                  </h3>
                  <p className="text-base leading-loose mb-3">
                    Translated by {data.translation_author} from{" "}
                    {data.manuscript_name},{" "}
                    {data.translation_source_manuscript_folio}
                    {", in "}
                    {data.translation_as_of_date}.
                  </p>
                  <p
                    className="text-base leading-loose mb-3"
                    dangerouslySetInnerHTML={{
                      __html: data.english_translation,
                    }}
                  ></p>
                </li>
                <li>
                  <h3 className="text-lg font-bold uppercase  my-3">
                    TO CITE THIS TRANSLATION
                  </h3>
                  <p className="text-base leading-loose mb-3">
                    {data.translation_author}. &quot;ID{" "}
                    {data.canonical_story_id}: {data.canonical_story_title}
                    .&quot; <i>Täˀammərä Maryam (Miracle of Mary) Stories</i>,
                    edited by Wendy Laura Belcher, Jeremy Brown, Mehari Worku,
                    and Dawit Muluneh. Princeton: Princeton Ethiopian, Eritrean,
                    and Egyptian Miracles of Mary project.{" "}
                    {process.env.NEXT_PUBLIC_DIRECTUS_URL}/stories/{Id}. Last
                    modified: {data.translation_as_of_date}
                  </p>
                </li>
              </ol>
            </div>
            <div className="space-y-4 mb-10">
              <ol className="list-inside pl-4 ">
                <li>
                  <h3 className="text-lg font-bold uppercase  mb-3 ">
                    {data.languageAvailableIn.length > 0 &&
                      "OTHER TRANSLATIONS & EDITIONS OF THIS STORY"}
                  </h3>
                  <ul className="space-y-2">
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
              <ol className="list-inside pl-4 ">
                <li>
                  <h3 className="text-lg font-bold uppercase  mb-3 ">
                    MANUSCRIPTS
                  </h3>
                  <ul className="space-y-2">
                    <p className="text-base leading-relaxed">
                      PEMM Manuscripts in which story appears (with page or
                      folio start):
                    </p>
                    <p
                      className="text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: generateManuscript(),
                      }}
                    ></p>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* This below content is for mobile responsive  */}
      <div className="md:hidden block font-menu">
        <Tabs
          tabs={discoverPage}
          onClick={(e) => {
            console.log("onClick prop:", e);
          }}
        >
          {/* About */}
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4 mb-10">
              <ol className="list-inside pl-4 ">
                <li>
                  <ul className="space-y-2">
                    {FirstLine(data?.earliest_attestation)}
                    {SeconsdLine(data?.total_records)}
                    {ThirdLine(
                      data.total_records,
                      data.total_story_id_paintings,
                      data.canonical_story_id,
                      data.total_manuscripts_with_story_id_illustrated
                    )}
                    {ForthLine(data.type_of_story)}
                    {FifthLine(data.origin)}
                    {SixthLine(data.languageAvailableIn)}
                    {SeventhLine()}
                  </ul>
                </li>
              </ol>
            </div>
          </Tab.Panel>

          {/* Information */}
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4 mb-10">
              <ol className="list-inside md:pl-4 p-0">
                <li>
                  <h3 className="text-lg font-bold uppercase text-justify">
                    CONTENT INFORMATION
                  </h3>
                  <ul>
                    <p className="text-base leading-normal">
                      <b>Story Type:</b> {data.type_of_story}
                    </p>
                  </ul>
                </li>
                <li>
                  <h3 className="text-lg mb-1 font-bold uppercase text-justify">
                    TECHNICAL INFORMATION
                  </h3>
                  <ul className="text-sm">
                    <p className="indent-2 leading-normal">
                      <b>Earliest Attested Instance of the Story:</b>{" "}
                      {data.manuscript_date_range_start} -{" "}
                      {data.manuscript_date_range_end}
                    </p>
                    <p className="indent-2 leading-normal">
                      <b>Earliest Manuscripts in which Story Appears:</b>{" "}
                      {data.names_of_mss_with_earliest_attestation}
                    </p>
                    <p className="indent-2 leading-normal">
                      <b>Total Manuscripts in which Story Appears:</b>{" "}
                      {data.total_records}
                    </p>
                    <p className="indent-2 leading-normal">
                      <b>Total Incipits in the ITool:</b>{" "}
                      {data.total_incipits_typed}
                    </p>
                    <p className="indent-2 leading-normal">
                      <b>ID Numbers:</b> PEMM ID {data.canonical_story_id};
                      Macomber ID {data.canonical_story_id}; Beta maṣāḥǝft ID{" "}
                      {data.hamburg_id}; Clavis ID {data.clavis_id}; Cantigas ID{" "}
                      {data.csm_number}; Poncelet ID {data.poncelet_number};
                    </p>
                  </ul>
                </li>
              </ol>
            </div>
          </Tab.Panel>

          {/* TRANSLATION */}
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4">
              <ol className="list-inside md:pl-4 p-0">
                <li>
                  <h3 className="text-lg font-bold uppercase  mb-3 ">
                    TRANSLATION
                  </h3>
                  <p className="text-base leading-loose mb-3 italic">
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
                  <h3 className="text-lg font-bold uppercase  my-3">
                    TO CITE THIS TRANSLATION
                  </h3>
                  <p className="text-base leading-loose mb-3">
                    {data.translation_author}. &quot;ID{" "}
                    {data.canonical_story_id}: {data.canonical_story_title}
                    .&quot; <i>Täˀammərä Maryam (Miracle of Mary) Stories</i>,
                    edited by Wendy Laura Belcher, Jeremy Brown, Mehari Worku,
                    and Dawit Muluneh. Princeton: Princeton Ethiopian, Eritrean,
                    and Egyptian Miracles of Mary project.{" "}
                    {process.env.NEXT_PUBLIC_DIRECTUS_URL}/stories/{Id}. Last
                    modified: {data.translation_as_of_date}
                  </p>
                </li>
              </ol>
            </div>
          </Tab.Panel>

          {/* Manuscripts */}
          <Tab.Panel className="p-4 md:p-6">
            <div className="space-y-4 mb-10">
              <ol className="list-inside pl-4 ">
                <li>
                  <h3 className="text-lg font-bold uppercase  mb-3 ">
                    MANUSCRIPTS
                  </h3>
                  <ul className="space-y-2">
                    <p className="text-base leading-relaxed">
                      PEMM Manuscripts in which story appears (with page or
                      folio start):
                    </p>
                    <p
                      className="text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: generateManuscript(),
                      }}
                    ></p>
                  </ul>
                </li>
              </ol>
            </div>
          </Tab.Panel>
        </Tabs>
      </div>
    </div>
  );
}

function FirstLine(earliest_attestation) {
  return (
    <>
      {earliest_attestation && (
        <p className="text-base indent-2 leading-relaxed">
          This story is&nbsp;
          <b>
            {earliest_attestation >= 1300 && earliest_attestation < 1500
              ? "very old"
              : earliest_attestation >= 1500 && earliest_attestation < 1800
              ? "old"
              : earliest_attestation >= 1800 && earliest_attestation < 1950
              ? "recent"
              : earliest_attestation >= 1950
              ? "very recent"
              : ""}
          </b>
          : the earliest PEMM manuscript<sup>1</sup> in which this story appears
          is from around {earliest_attestation}.
        </p>
      )}
    </>
  );
}

function SeconsdLine(total_records) {
  return (
    <>
      {total_records && (
        <p className="text-base indent-2 leading-relaxed">
          This story is&nbsp;
          <b>
            {total_records < 10
              ? total_records >= 6
                ? "somewhat rare"
                : total_records >= 3
                ? "quite rare"
                : total_records == 2
                ? "extremely rare"
                : "uniquely rare"
              : total_records >= 300
              ? "extremely popular"
              : total_records >= 200
              ? "very popular"
              : total_records >= 50
              ? "popular"
              : "somewhat popular"}
          </b>
          : appearing in &nbsp;
          {total_records < 10
            ? `only ${total_records} of the PEMM manuscripts.`
            : `${Math.round(
                (total_records /
                  TOTAL_NUM_MANUSCRIPTS_WITH_MS_STATUS_COMPLETE) *
                  100
              )}% of PEMM manuscripts with five stories or more.`}
        </p>
      )}
    </>
  );
}

function ThirdLine(
  total_records,
  total_story_id_paintings,
  canonical_story_id,
  total_manuscripts_with_story_id_illustrated
) {
  return (
    <>
      {total_records && (
        <p className="text-base indent-2 leading-relaxed">
          {total_story_id_paintings === 0 ? (
            <>
              This story is <b>not illustrated</b> in PEMM manuscripts.
            </>
          ) : ID_LIST.includes(canonical_story_id) ? (
            total_manuscripts_with_story_id_illustrated == null ||
            total_manuscripts_with_story_id_illustrated != 0 ? (
              <>
                This story is among the thirty-two Täˀammərä Maryam stories that
                are most <b>frequently illustrated</b>, with a total of&nbsp;
                <b>{total_story_id_paintings}</b> paintings.
              </>
            ) : (
              <>
                This story is among the thirty-two Täˀammərä Maryam stories that
                are most <b>frequently illustrated</b>: it is illustrated in $
                {total_manuscripts_with_story_id_illustrated} PEMM manuscripts,
                with a total of
                <b>{total_story_id_paintings}</b> paintings.
              </>
            )
          ) : total_manuscripts_with_story_id_illustrated == null ||
            total_manuscripts_with_story_id_illustrated != 0 ? (
            <>
              This story is <b>sometimes illustrated</b>, with a total of&nbsp;
              <b>{total_story_id_paintings}</b> painting(s).
            </>
          ) : (
            <>
              This story is <b>sometimes illustrated</b>: it is illustrated in
              {total_manuscripts_with_story_id_illustrated} PEMM manuscript(s),
              with a total of
              <b>{total_story_id_paintings}</b> painting(s).
            </>
          )}
        </p>
      )}
    </>
  );
}
function ForthLine(type_of_story) {
  return (
    <p className="text-base indent-2 leading-relaxed">
      {type_of_story == "Life of Mary" ? (
        <>
          This story is a <b>life miracle</b>: it takes place during Our Lady
          Mary&apos;s lifetime, not after it.
        </>
      ) : (
        <>
          This story is a <b>post-life miracle</b>: it does not take place
          during Our Lady Mary&apos;s lifetime, but after it.
        </>
      )}
    </p>
  );
}
function FifthLine(origin) {
  return (
    <p className="text-base indent-2 leading-relaxed">
      This story was originally <b>composed</b> in {origin}.
    </p>
  );
}
function SixthLine(languageAvailableIn) {
  return (
    <p className="text-base indent-2 leading-relaxed">
      This story is available in the following <b>languages</b>:{" "}
      {languageAvailableIn.join(", ")}.
    </p>
  );
}
function SeventhLine() {
  return (
    <p className="text-sm indent-2 leading-relaxed py-2">
      <sup>1. </sup>A "PEMM manuscript" is defined as any Gəˁəz Marian
      manuscript that PEMM has catalogued. For more information, see{" "}
      <Link href="/about/using-the-site" className="text-primary-600">
        Using the Site
      </Link>
      .
    </p>
  );
}
