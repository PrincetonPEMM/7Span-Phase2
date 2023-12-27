export const metadata = {
  title: "PEMM Research",
  description:
    "PEMM conducts research and posts its findings about paintings, stories, and manuscripts about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 200s to the present.",
};

export default function ResearchAndLessonsLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
