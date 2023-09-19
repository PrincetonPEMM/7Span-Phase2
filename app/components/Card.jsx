"use client";
import Link from "next/link";

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
        <h3 className="font-semibold">{author && "by " + author}</h3>
        <p
          className="py-2 text-sm"
          dangerouslySetInnerHTML={{
            __html: intro,
          }}
        ></p>

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
