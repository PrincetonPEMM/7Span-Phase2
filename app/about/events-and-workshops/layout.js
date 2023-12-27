export const metadata = {
  title: "PEMM Events",
  description:
    "PEMM Events providing access to paintings, stories, and manuscripts about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 200s to the present.",
};

export default function EventsAndWorkshopsLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
