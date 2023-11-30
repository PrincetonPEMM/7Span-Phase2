"use client";
import Link from "next/link";
import { useState } from "react";

export default function Card({
  category,
  description,
  title,
  alt,
  intro,
  author,
  keyword,
  date = "",
  redirect = "",
  value1,
  value2,
}) {
  const [toggle, setToggle] = useState(false);
  const numberOfWords = 500;
  const collapseText = (text) => {
    if (!Number(text?.length)) {
      return "";
    }

    return toggle ? (
      <p className="py-2 text-sm ">
        {text}
        <button
          onClick={() => setToggle(false)}
          className={`${
            category.toLowerCase() === keyword
              ? "text-primary-500"
              : "text-yellow-500"
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
    <div className={`${category.toLowerCase() === keyword ? "even" : "odd"}`}>
      <div
        className={`card-background rounded-lg px-5 py-10 relative inline-block w-full md:px-8`}
      >
        <span
          className={`absolute top-3 inline-block right-3 text-xs px-2 py-1 card-button rounded-md leading-tight tag`}
        >
          {category.toLowerCase() === keyword ? value1 : value2}
        </span>
        <h3 className="font-bold lg:text-2xl">{title}</h3>
        {date && <p className="my-1 font-light text-xs">{date}</p>}
        <h4 className="font-sm font-semibold">{author && "by " + author}</h4>
        {collapseText(intro)}
        <Link
          href={redirect}
          alt={alt}
          className="border mt-5 py-1 px-2 rounded font-normal inline-block text-sm bg-primary-500 hover:bg-transparent transition-colors text-primary-500 hover:text-primary-500 border-primary-500 hover:transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
