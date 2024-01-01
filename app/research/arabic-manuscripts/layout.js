export const metadata = {
  title: "PEMM Arabic Manuscripts",
  description:
    "A list of manuscripts in the Arabic language with stories about the Virgin Mary created between 1200 and 1900.",
};

export default function ArabicManuscriptsLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
