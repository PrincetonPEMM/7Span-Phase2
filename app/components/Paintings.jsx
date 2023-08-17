"use client";
import React from "react";
import Card from "@/app/components/Card";
import { useState } from "react";
import InputText from "./form/InputText";
import MdiMagnify from "@assets/icons/MdiMagnify";
import Select, { POption } from "./form/Select";
import Masonry from "@/app/components/Masonry";
import PaintingCard from "./PaintingCard";
const Paintings = () => {
  const [selectedOpt, setSelectedOpt] = useState();

  const categories = [
    {
      name: "29/03/1996",
      id: "hello",
    },
    {
      name: "29/03/1976",
      id: "hello",
    },
    {
      name: "29/03/1966",
      id: "hello",
    },
    {
      name: "29/03/1956",
      id: "hello",
    },
  ];
  const categoriess = [
    {
      name: "29/03/1996",
      id: "hello",
    },
    {
      name: "29/03/1976",
      id: "hello",
    },
    {
      name: "29/03/1966",
      id: "hello",
    },
    {
      name: "29/03/1956",
      id: "hello",
    },
  ];

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

  return (
    <div className="container">
      <div className="flex items-start space-x-4 mb-5">
        <div class="relative w-full">
          <MdiMagnify className="h-6 w-6 absolute inset-y-0 left-5 my-auto text-primary-700" />
          <InputText value="" iconBefore />
        </div>
      </div>
      <div className="flex items-start space-x-4 mb-5 max-w-xl ml-auto">
        <Select
          selected={selectedOpt}
          onChange={(selected) => setSelectedOpt(selected)}
          className="w-72"
        >
          {categories?.map((opt, index) => (
            <POption key={index} id={opt.id} name={opt.name} />
          ))}
        </Select>
        <Select
          selected={selectedOpt}
          onChange={(selected) => setSelectedOpt(selected)}
          className="w-72"
        >
          {categoriess?.map((opt, index) => (
            <POption key={index} id={opt.id} name={opt.name} />
          ))}
        </Select>
      </div>
      <div className="pb-10">
        <Masonry>
          {Paintcards.map((card, index) => (
            <PaintingCard key={index} {...card} />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Paintings;
