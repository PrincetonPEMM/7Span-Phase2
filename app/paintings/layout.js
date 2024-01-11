export const metadata = {
  title: "PEMM Paintings",
  description:
    "We provide beautiful African paintings of the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 1200s to the present; that is, medieval African paintings of Saint Mary; early modern African paintings of Saint Mary; and modern African paintings of Saint Mary.",
};

export default function PaintingsLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
