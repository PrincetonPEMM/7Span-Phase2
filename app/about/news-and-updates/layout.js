export const metadata = {
  title: "PEMM News",
  description:
    "News about PEMM accomplishments in providing access to paintings, stories, and manuscripts about the Virgin Mary in Ethiopia, Eritrea, and Egypt from the 200s to the present.",
};

export default function NewsAndUpdatesLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
