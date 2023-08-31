"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import InputText from "./form/InputText";
import MdiMagnify from "@assets/icons/MdiMagnify";
import Masonry from "@/app/components/Masonry";
import PaintingCard from "./PaintingCard";
import Dropdown from "./Dropdown";
import { pagePerLimitForPainting } from "@/utils/constant";

const dateOfPaintinsOption = [
  { id: 1, label: "1200s", value: "1200" },
  { id: 2, label: "1300s", value: "1300" },
  { id: 3, label: "1400s", value: "1400" },
  { id: 4, label: "1500s", value: "1500" },
  { id: 5, label: "1600s", value: "1600" },
  { id: 6, label: "1700s", value: "1700" },
  { id: 7, label: "1800s", value: "1800" },
  { id: 8, label: "1900s", value: "1900" },
  { id: 9, label: "2000s", value: "2000" },
];

const paintingsInColorOnlyOption = [
  {
    id: 1,
    label: "Default is paintings in color",
    value: "default",
  },
  { id: 2, label: "Include Black & White", value: "black_and_white" },
  {
    id: 3,
    label: "Include Image Not Available",
    value: "no_image",
  },
];

const storyTypeOption = [
  { id: 1, label: "Miracle of Mary", value: "miracle_of_mary" },
  { id: 2, label: "Life of Mary", value: "life_of_mary" },
];

const archiveOfPaintingOption = [
  { id: 1, label: "Armagh Robinson Library", value: "Armagh Robinson Library" },
  {
    id: 2,
    label: "Art Institute of Chicago",
    value: "Art Institute of Chicago",
  },
  { id: 3, label: "Berlin Staatsbibliothek", value: "Berlin Staatsbibliothek" },
  {
    id: 4,
    label: "Beta Lahem church, Gayant, Ethiopia",
    value: "Beta Lahem church, Gayant, Ethiopia",
  },
  {
    id: 5,
    label: "Biblioteca Apostolica vaticana",
    value: "Biblioteca Apostolica vaticana",
  },
  { id: 6, label: "Biblioteca Giovardiana", value: "Biblioteca Giovardiana" },
  {
    id: 7,
    label: "Bibliotheque nationale de France",
    value: "Bibliotheque nationale de France",
  },
  {
    id: 8,
    label: "Bodleian Library, University of Oxford",
    value: "Bodleian Library, University of Oxford",
  },
  { id: 9, label: "British Library", value: "British Library" },
  { id: 10, label: "Brown University", value: "Brown University" },
  { id: 11, label: "Chester Beatty Library", value: "Chester Beatty Library" },
  {
    id: 12,
    label: "Dabra Koreb & Qaraneto Madhane Alam Monastery",
    value: "Dabra Koreb & Qaraneto Madhane Alam Monastery",
  },
  { id: 13, label: "Dabra Warq Monastery", value: "Dabra Warq Monastery" },
  { id: 14, label: "Ethio-SPaRe Project", value: "Ethio-SPaRe Project" },
  {
    id: 15,
    label: "Ethiopian Manuscript Digital Archive",
    value: "Ethiopian Manuscript Digital Archive",
  },
  {
    id: 16,
    label: "Ethiopian Manuscript Digital Library",
    value: "Ethiopian Manuscript Digital Library",
  },
  {
    id: 17,
    label: "Ethiopian Manuscript Imaging Project",
    value: "Ethiopian Manuscript Imaging Project",
  },
  {
    id: 18,
    label: "Ethiopian Manuscript Microfilm Library",
    value: "Ethiopian Manuscript Microfilm Library",
  },
  { id: 19, label: "Gunda Dunde Monastery", value: "Gunda Dunde Monastery" },
  {
    id: 20,
    label: "Institute of Ethiopian Studies",
    value: "Institute of Ethiopian Studies",
  },
  {
    id: 21,
    label: "Jerusalem EOTC Patriarchate",
    value: "Jerusalem EOTC Patriarchate",
  },
  {
    id: 22,
    label: "Leiden University Library",
    value: "Leiden University Library",
  },
  { id: 23, label: "Library of Congress", value: "Library of Congress" },
  {
    id: 24,
    label: "Marawe Krestos & Dabra Abbay Monasteries",
    value: "Marawe Krestos & Dabra Abbay Monasteries",
  },
  { id: 25, label: "Museum of the Bible", value: "Museum of the Bible" },
  {
    id: 26,
    label: "Princeton University Library",
    value: "Princeton University Library",
  },
  {
    id: 27,
    label: "Robert (Bob) McCarthy Private Collection",
    value: "Robert (Bob) McCarthy Private Collection",
  },
  {
    id: 28,
    label: "Romanat Qeddus Mikael Dabre Mehret",
    value: "Romanat Qeddus Mikael Dabre Mehret",
  },
  {
    id: 29,
    label: "Royal Library, Windsor Castle",
    value: "Royal Library, Windsor Castle",
  },
  {
    id: 30,
    label: "Schoyen Collection-London-Oslo",
    value: "Schoyen Collection-London-Oslo",
  },
  { id: 31, label: "UNESCO", value: "UNESCO" },
  {
    id: 32,
    label: "Verzeichnis der orientalischen Handschriften in Deutschland",
    value: "Verzeichnis der orientalischen Handschriften in Deutschland",
  },
  {
    id: 33,
    label: "Yale University Library",
    value: "Yale University Library",
  },
];

const Paintings = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pagePerLimitForPainting);
  const [searchKey, setSearchKey] = useState("");
  const [totalPage, setTotalPage] = useState();
  const [data, setData] = useState([]);
  const [dateOfPaintins, setDateOfPaintins] = useState([
    dateOfPaintinsOption[0],
    dateOfPaintinsOption[5],
  ]);
  const [paintingsInColorOnly, setPaintingsInColorOnly] = useState(
    paintingsInColorOnlyOption[0]
  );
  const [storyType, setStoryType] = useState(storyTypeOption[1]);
  const [archiveOfPainting, setArchiveOfPainting] = useState(
    archiveOfPaintingOption[0]
  );

  const cards = [
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is hudsadsads dsad sadsa dsadman belongs to all human beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human b dsad sad sa dsad sadasddsadelongs to all human beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is humd dsa dsadsa dsa das dsadan belongs to all human beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human belongs to all human beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human fds fdsfsdfdsfdsf sfdsf dsfds fdsfdsfds fdsf dsf dsfds fdsfds fdsfdsf dsfsfsf sdfsfsd fdsfdsfs dfs belongs tdsadasd dsa dsa dao all human beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human belong dsa dsa dasd sad as to all human beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human belongs to al dsa dsa da da dsa dasd sa dadadl human beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human belongs tdsad sad sa dsa d sad sad sa dsa d ad sad sadsa dsa d sad ao all  dsad sa das dsa dsa dsa dsadsa das das dsa d sad asd sadahuman beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human belongs to all humd sa dsa dsa d sad sad sa dsa dsa d sad sadaan beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human belongs tdsad sad sa dsa d sad sad sa dsa d ad sad sadsa dsa d sad ao all  dsad sa das dsa dsa dsa dsadsa das das dsa d sad asd sadahuman beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
    {
      title: "Project Unlocks Understanding of Miracle of Mary Texts",
      date: "02 September 2021",
      description:
        "“Whatever is human belongs to all humd sa dsa dsa d sad sad sa dsa dsa d sad sadaan beings” said Mehari Worku, deacon in the Ethiopian Orthodox Tewahedo Church, when asked whether he had concerns about this work being organised and housed by an American university",
      link: "https://www.universityworldnews.com/post.php?story=2021090210485829",
      link_text: "PEMM IN THE NEWS",
      author: "Nathan Green, in University World News",
    },
  ];

  const Paintcards = [
    {
      id: "B-Dublin (CBL) 914",
      title: "Cannibal of Qemer",
      description:
        " The staff of PEMM has selected three manuscirpts that best represent the genre. One is the very earliest known Miracle of Mary manuscript (from the 1300s), one is a Second Gondarine style manuscript (at Princeton), and one illustrates many stories never illustrated before (at the British Library).",
      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fiiif-cloud.princeton.edu%2Fiiif%2F2%2F1b%252F90%252F5a%252F1b905a32206f4f6b85d32319f99338ce%252Fintermediate_file%2Ffull%2F400%2C%2F0%2Fdefault.jpg%3Ft%3D1651501156780&w=640&q=75",
    },
    {
      id: "PEM (Princeton) 65",
      title: "Life of Marry",
      description:
        "Miracle of Mary manuscripts from Ethiopia are among the most spectacular of Ethiopia's parchment manuscripts.",

      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fia903203.us.archive.org%2FBookReader%2FBookReaderImages.php%3Fzip%3D%2F4%2Fitems%2Fgri_33125008690600%2Fgri_33125008690600_jp2.zip%26file%3Dgri_33125008690600_jp2%2Fgri_33125008690600_0396.jp2%26id%3Dgri_33125008690600%26scale%3D4%26rotate%3D0&w=640&q=75",
    },
    {
      id: "B-Dublin (CBL) 914",
      title: "Cannibal of Qemer",
      description:
        "Miracle of Mary manuscripts from Ethiopia are among the most spectacular of Ethiopia's parchment manuscripts.",
      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fiiif-cloud.princeton.edu%2Fiiif%2F2%2F1b%252F90%252F5a%252F1b905a32206f4f6b85d32319f99338ce%252Fintermediate_file%2Ffull%2F400%2C%2F0%2Fdefault.jpg%3Ft%3D1651501156780&w=640&q=75",
    },
    {
      id: "PEM (Princeton) 65",
      description:
        "The staff of PEMM has selected three manuscirpts (from the 1300s), one is a Second Gondarine style manuscript (at Princeton), and one illustrates many stories never illustrated before (at the British Library).",

      title: "Life of Marry",
      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fia903203.us.archive.org%2FBookReader%2FBookReaderImages.php%3Fzip%3D%2F4%2Fitems%2Fgri_33125008690600%2Fgri_33125008690600_jp2.zip%26file%3Dgri_33125008690600_jp2%2Fgri_33125008690600_0396.jp2%26id%3Dgri_33125008690600%26scale%3D4%26rotate%3D0&w=640&q=75",
    },
    {
      id: "B-Dublin (CBL) 914",
      description:
        "Miracle of Mary manuscripts from Ethiopia are among the most spectacular of Ethiopia's parchment manuscripts. The staff of PEMM has selected three manuscirpts that best represent the genre. One is the very earliest known Miracle of Mary manuscript (from the 1300s), one is a Second Gondarine style manuscript (at Princeton), and one illustrates many stories never illustrated before (at the British Library).",

      title: "Cannibal of Qemer",
      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fiiif-cloud.princeton.edu%2Fiiif%2F2%2F1b%252F90%252F5a%252F1b905a32206f4f6b85d32319f99338ce%252Fintermediate_file%2Ffull%2F400%2C%2F0%2Fdefault.jpg%3Ft%3D1651501156780&w=640&q=75",
    },
    {
      id: "PEM (Princeton) 65",
      title: "Life of Marry",
      description:
        "The staff of PEMM has selected three manuscirpts that best represent the genre. Gondarine style manuscript (at Princeton), and one illustrates many stories never illustrated before (at the British Library).",

      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fia903203.us.archive.org%2FBookReader%2FBookReaderImages.php%3Fzip%3D%2F4%2Fitems%2Fgri_33125008690600%2Fgri_33125008690600_jp2.zip%26file%3Dgri_33125008690600_jp2%2Fgri_33125008690600_0396.jp2%26id%3Dgri_33125008690600%26scale%3D4%26rotate%3D0&w=640&q=75",
    },
    {
      id: "B-Dublin (CBL) 914",
      title: "Cannibal of Qemer",
      description:
        "The staff of PEMM has selected three manuscirpts that best represent the genre. ",

      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fiiif-cloud.princeton.edu%2Fiiif%2F2%2F1b%252F90%252F5a%252F1b905a32206f4f6b85d32319f99338ce%252Fintermediate_file%2Ffull%2F400%2C%2F0%2Fdefault.jpg%3Ft%3D1651501156780&w=640&q=75",
    },
    {
      id: "PEM (Princeton) 65",
      title: "Life of Marry",
      description:
        "Miracle of Mary manuscripts from Ethiopia are among the most spectacular of Ethiopia's parchment manuscripts. The staff of PEMM has selected three manuscirpts that best represent the genre. One is the very earliest known Miracle of Mary manuscript (from the 1300s), one is a Second Gondarine style manuscript (at Princeton), and one illustrates many stories never illustrated before (at the British Library).",

      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fia903203.us.archive.org%2FBookReader%2FBookReaderImages.php%3Fzip%3D%2F4%2Fitems%2Fgri_33125008690600%2Fgri_33125008690600_jp2.zip%26file%3Dgri_33125008690600_jp2%2Fgri_33125008690600_0396.jp2%26id%3Dgri_33125008690600%26scale%3D4%26rotate%3D0&w=640&q=75",
    },
    {
      id: "PEM (Princeton) 65",
      title: "Life of Marry",
      description:
        "Miracle of Mary manuscripts from Ethiopia are among the most spectacular of Ethiopia's parchment manuscripts. The staff of PEMM has selected three manuscirpts that best represent the genre. One is the very earliest known Miracle of Mary manuscript (from the 1300s), one is a Second Gondarine style manuscript (at Princeton), and one illustrates many stories never illustrated before (at the British Library).",

      cardImg:
        "https://www.ethiopicmary.com/_next/image?url=https%3A%2F%2Fia903203.us.archive.org%2FBookReader%2FBookReaderImages.php%3Fzip%3D%2F4%2Fitems%2Fgri_33125008690600%2Fgri_33125008690600_jp2.zip%26file%3Dgri_33125008690600_jp2%2Fgri_33125008690600_0396.jp2%26id%3Dgri_33125008690600%26scale%3D4%26rotate%3D0&w=640&q=75",
    },
  ];

  const makeParamsArray = (key, arr) => {
    return arr.map((itm) => `filters[${key}][]=${itm.value}&`).join("");
  };

  const fetchData = async () => {
    try {
      const params = `page=${page}&perPage=${perPage}&${makeParamsArray(
        "dateOfPainting",
        dateOfPaintins
      )}${makeParamsArray("paintingInColor", [
        paintingsInColorOnly,
      ])}${makeParamsArray("typeOfStory", [
        storyType,
      ])}filters[search]=${searchKey}`;
      // ${makeParamsArray(
      //   "institution",
      //   [archiveOfPainting]
      // )}

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings?${params}`
      );
      const resData = await response.json();
      console.log(resData, "resDataresDataresData");
      setTotalPage(resData.total);
      setData(resData.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateOfPaintins, paintingsInColorOnly, storyType, archiveOfPainting]);

  return (
    <div className="container">
      <div className="flex items-start space-x-4 mb-5">
        <div class="relative w-full">
          <MdiMagnify className="h-6 w-6 absolute inset-y-0 left-5 my-auto text-primary-700" />
          <InputText value="" iconBefore />
        </div>
      </div>
      <div className="flex items-start flex-wrap mb-5 max-w-5xl lg:mx-auto">
        <Dropdown
          title="Date of Paintings"
          selected={dateOfPaintins}
          setSelected={setDateOfPaintins}
          options={dateOfPaintinsOption}
          isMultiple={true}
        />
        <Dropdown
          title="Paintings in color only"
          selected={paintingsInColorOnly}
          setSelected={setPaintingsInColorOnly}
          options={paintingsInColorOnlyOption}
          isMultiple={false}
        />
        <Dropdown
          title="Story Type"
          selected={storyType}
          setSelected={setStoryType}
          options={storyTypeOption}
          isMultiple={false}
        />
        <Dropdown
          title="Repository of Painting"
          selected={archiveOfPainting}
          setSelected={setArchiveOfPainting}
          options={archiveOfPaintingOption}
          isMultiple={false}
        />
        <button className="bg-primary-500 text-white py-2 pl-3 pr-10 text-center rounded-md m-3">
          Reset
        </button>
      </div>
      <div className="pb-10">
        {data.length && (
          <Masonry>
            {/* {Paintcards.map((card, index) => (
            <div
              key={index}
              className={`rounded-lg text-offWhite-500 font-body relative overflow-hidden inline-block  card-background w-full`}
            >
              <div className=" bg-offWhite-500">
                <img
                  src={card.cardImg}
                  alt="PEMM"
                  className="w-full object-cover "
                />
              </div>
              <div className="bg-black p-5">
                <p className="text-xs">{card.id}</p>
                <h2 className="lg:text-2xl font-bold mt-3">{card.title}</h2>
                <p className="pt-2">{card.description}</p>
              </div>
            </div>
          ))} */}
            {data.map((card, index) => (
              <PaintingCard key={index} card={card} />
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
};

export default Paintings;
