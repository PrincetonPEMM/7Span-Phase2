"use client";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Masonry from "react-masonry-css";
import React from "react";
import Card from "@/app/components/Card";
import { breakpointColumnsForMasonry } from "@/utils/constant";
import ComingSoon from "@/app/components/ComingSoon";
const page = async () => {
  let research_posts_data = null;

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
  try {
    research_posts_data = await client.request(
      readItems("research_posts", {
        fields: ["*.*.*"],
      })
    );
  } catch (e) {
    console.log(e);
  }

  return (
    // <div className="container font-body space-y-4 py-12">
    //   {research_posts_data && (
    //     <div>
    //       <h3 className="text-3xl text-primary-500 font-bold lg:text-5xl">
    //         {research_posts_data?.title ?? ""}
    //       </h3>
    //       {/* <div
    //         dangerouslySetInnerHTML={{
    //           __html: research_posts_data?.description,
    //         }}
    //       /> */}
    //       <Masonry
    //         breakpointCols={breakpointColumnsForMasonry}
    //         className="my-masonry-grid "
    //         columnClassName="my-masonry-grid_column mesonry "
    //       >
    //         {cards.map((card, index) => (
    //           <div className={`${index % 2 ? "even" : "odd"}`}>
    //             <Card key={index} {...card} />
    //           </div>
    //         ))}
    //       </Masonry>
    //     </div>
    //   )}
    // </div>
    <ComingSoon />
  );
};

export default page;
