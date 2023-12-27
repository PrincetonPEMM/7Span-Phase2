export const metadata = {
  title: "PEMM Mission",
  description:
    "The PEMM mission is to provide access to beautifully illuminated manuscripts and captivating stories about the Virgin Mary composed in African languages in Ethiopia, Eritrea, and Egypt from the 200s to the present.",
};

export default function MissionLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
