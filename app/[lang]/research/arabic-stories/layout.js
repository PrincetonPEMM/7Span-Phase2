export const metadata = {
  title: "PEMM Arabic Stories",
  description:
    "A list of stories that appear only in the Arabic language manuscripts about the Virgin Mary created outside of the Horn of Africa between 1200 and 1900.",
};

export default function ArabicStoriesLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
