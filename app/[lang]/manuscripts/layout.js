export const metadata = {
  title: "PEMM Manuscripts",
  description:
    "We provide information about African manuscripts with stories about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the late 1300s into the 1950s.",
};

export default function ManuScriptsLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
