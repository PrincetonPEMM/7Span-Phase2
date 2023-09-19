export default function Card({ title, intro, description, author, category }) {
  return (
    <div
      className={`card-background rounded-lg text-white px-5 md:px-8 py-10 relative inline-block `}
    >
      <button
        className={`absolute top-3 inline-block right-3 text-xs px-2 py-1 card-button rounded-md leading-tight`}
      >
        {category}
      </button>
      <h2 className="lg:text-2xl font-bold">{title}</h2>
      {/* <span className="my-2 font-light">{date}</span> */}
      <h3 className="font-semibold">{author}</h3>
      <p
        className="py-2 text-sm"
        dangerouslySetInnerHTML={{
          __html: intro,
        }}
      ></p>
      <button className="border py-1 px-2 rounded inline-block transition-colors hover:text-primary-500 hover:bg-offWhite-500 hover:transition-colors">
        Read More
      </button>
    </div>
  );
}
