export const metadata = {
  title: "PEMM Paintings",
  description:
    "We provide beautifully illuminated African manuscripts with stories about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 1200s to the present.",
};

export default function PaintingsLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
