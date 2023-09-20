"use client";
import Link from "next/link";
import { useState } from "react";

export default function Card({
  category,
  description,
  title,
  intro,
  author,
  keyword,
  date = "",
  redirect = "",
}) {
  const [toggle, setToggle] = useState(false);
  const numberOfWords = 500;
  const collapseText = (text) => {
    if (!Number(text?.length)) {
      return "";
    }

    return toggle ? (
      <p className="py-2 text-sm">
        {text}
        <button
          onClick={() => setToggle(false)}
          className={`${
            category === keyword ? "text-primary-500" : "text-yellow-500"
          }`}
        >
          &nbsp; See Less
        </button>
      </p>
    ) : (
      <p className="py-2 text-sm">
        {Number(text?.length) > numberOfWords
          ? text.slice(0, numberOfWords) + "..."
          : text}
        {Number(text?.length) > numberOfWords && (
          <button
            onClick={() => setToggle(true)}
            className={`${
              category === keyword ? "text-primary-500" : "text-yellow-500"
            }`}
          >
            See More
          </button>
        )}
      </p>
    );
  };

  return (
    <div className={`${category === keyword ? "even" : "odd"}`}>
      <div
        className={`card-background rounded-lg text-white px-5 md:px-8 py-10 relative inline-block `}
      >
        <button
          className={`absolute top-3 inline-block right-3 text-xs px-2 py-1 card-button rounded-md leading-tight`}
        >
          {category}
        </button>
        <h2 className="lg:text-2xl font-bold">{title}</h2>
        {date && <p className="my-2 font-light">{date}</p>}
        <h3 className="font-sm py-2">{author && "by " + author}</h3>
        {collapseText(intro)}
        <Link
          href={redirect}
          className="border mt-5 py-1 px-2 rounded inline-block transition-colors hover:text-primary-500 hover:bg-offWhite-500 hover:transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
