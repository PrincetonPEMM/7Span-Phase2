export const metadata = {
  title: "PEMM Maps",
  description:
    "We map where African manuscripts with stories about the Virgin Mary are today and where they were created in Ethiopia, Eritrea, and Egypt from the late 1300s into the 1950s.",
};

export default function MapsLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
