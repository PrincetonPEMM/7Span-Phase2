import React from "react";
import PaintingStoryCard from "./PaintingStoryCard";
import Masonry from "@/app/components/Masonry";

const PaintingByStoryDetail = () => {
  const data = [
    {
      title: "Title not Found",
      content: "St Mary and Jesus Christ, surrounded by angels (full)",
      text: "text here",
      btnText: "View all Images ",
    },
    {
      title: "Title not Found",
      content:
        "St Mary giving the dog water to drink from her shoe (left), 2. The group of virgins gathered around the well while one of them chases away the thirsty dog (right) ",
      text: "text here",
    },
    {
      title: "Title not Found",
      content: "Joachim and Hanna hold the child Mary (bottom)",
      text: "text here",
    },

    {
      title: "Title not Found",
      content: "COntent here",
      text: "text here",
      btnText: "View all Images ",
    },
    {
      title: "Title not Found",
      content:
        "The group of virgins gathered around the well while one of them chases away the thirsty dog (right), 2. St Mary giving the dog water to drink from her shoe (left)",
      text: "text here",
    },
    {
      title: "Title not Found",
      content: "Joachim and Hanna hold the child Mary (bottom)",
      text: "text here",
    },

    {
      title: "Title not Found",
      content:
        "St Mary giving the dog water to drink from her shoe (left), 2.St Mary giving the dog water to drink from her shoe (left), 2. The group of virgins gathered around the well while one of them chases away the thirsty dog (right) The group of virgins gathered around the well while one of them chases away the thirsty dog (right)",
      text: "text here",
    },
    {
      title: "Title not Found",
      content:
        "The group of virgins gathered around the well while one of them chases away the thirsty dog (right), 2. St Mary giving the dog water to drink from her shoe (left)",
      text: "text here",
    },
  ];
  return (
    <div className="py-10 container">
      <Masonry>
        {data.map((item, index) => (
          <PaintingStoryCard key={index} item={item} />
        ))}
      </Masonry>
    </div>
  );
};

export default PaintingByStoryDetail;
