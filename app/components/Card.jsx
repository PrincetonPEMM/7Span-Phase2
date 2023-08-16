export default function Card({count, total_col, total, title, date, description, link, link_text, author}) {
    const total_row = Math.ceil(total / total_col)
    const row = count % total_row;
    const col = Math.floor(count / total_row);
    const bg_class = (col + row) % 2 ? "bg-primary-500" : "bg-secondary-500"
    const button_class = (col + row) % 2 ? "bg-secondary-500" : "bg-primary-500"
    return (
        <div className={`rounded-lg text-white px-8 py-10 relative inline-block my-3 card-background`}>
            {/* <div>{col} | {row} | {total_row} | {count}</div> */}
            <buttion className={`absolute top-3 right-3 text-xs px-2 py-1 card-button`}>{link_text}</buttion>
            <h2 className="lg:text-2xl font-bold">{title}</h2>
            <span className="my-2">{date}</span>
            <h3 className="font-semibold">{author}</h3>
            <p className="py-2">{description}</p>
            <buttion className="border p-1 rounded">read more</buttion>
        </div>
    )
}

