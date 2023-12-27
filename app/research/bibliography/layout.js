export const metadata = {
  title: "PEMM Bibliography",
  description:
    "A list of bibliographic sources, articles and books, about the paintings, stories, and manuscripts about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 200s to the present.",
};

export default function BibliographyLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
