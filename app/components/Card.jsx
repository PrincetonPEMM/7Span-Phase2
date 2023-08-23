export default function Card({
  count,
  total_col,
  total,
  title,
  date,
  description,
  link,
  link_text,
  author,
}) {
  return (
    <div
      className={`rounded-lg text-white px-5 md:px-8 py-10 relative inline-block my-3 card-background`}
    >
      <buttion
        className={`absolute top-3 right-3 text-xs px-2 py-1 card-button rounded-md`}
      >
        {link_text}
      </buttion>
      <h2 className="lg:text-2xl font-bold">{title}</h2>
      <span className="my-2">{date}</span>
      <h3 className="font-semibold">{author}</h3>
      <p className="py-2">{description}</p>
      <buttion className="border p-1 rounded">Read more</buttion>
    </div>
  );
}
