export const metadata = {
  title: "PEMM News",
  description: "PEMM News",
};

export default function NewsAndUpdatesLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
