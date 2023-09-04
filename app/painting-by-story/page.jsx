import React from "react";
import PaintingStoryCard from "../components/PaintingStoryCard";
import Masonry from "@/app/components/Masonry";
import ComingSoon from "../components/ComingSoon";
const page = () => {
  const data = [
    {
      title: "hello",
      content: "St Mary and Jesus Christ, surrounded by angels (full)",
      text: "text herr",
    },
    {
      title: "hello",
      content:
        "St Mary giving the dog water to drink from her shoe (left), 2. The group of virgins gathered around the well while one of them chases away the thirsty dog (right) ",
      text: "text herr",
    },
    {
      title: "hello",
      content: "Joachim and Hanna hold the child Mary (bottom)",
      text: "text herr",
    },

    {
      title: "hello",
      content: "COntent here",
      text: "text herr",
    },
    {
      title: "hello",
      content:
        "The group of virgins gathered around the well while one of them chases away the thirsty dog (right), 2. St Mary giving the dog water to drink from her shoe (left)",
      text: "text herr",
    },
    {
      title: "hello",
      content: "Joachim and Hanna hold the child Mary (bottom)",
      text: "text herr",
    },

    {
      title: "hello",
      content:
        "St Mary giving the dog water to drink from her shoe (left), 2.St Mary giving the dog water to drink from her shoe (left), 2. The group of virgins gathered around the well while one of them chases away the thirsty dog (right) The group of virgins gathered around the well while one of them chases away the thirsty dog (right)",
      text: "text herr",
    },
    {
      title: "hello",
      content:
        "The group of virgins gathered around the well while one of them chases away the thirsty dog (right), 2. St Mary giving the dog water to drink from her shoe (left)",
      text: "text herr",
    },
  ];
  return (
    <div className="py-10 container">
      {/* <Masonry>
        {data.map((item, index) => (
          <PaintingStoryCard
            key={index}
            title={item.title}
            text={item.text}
            content={item.content} btnText={item.btnText}
          />
        ))}
      </Masonry> */}
      <ComingSoon />
    </div>
  );
};

export default page;
