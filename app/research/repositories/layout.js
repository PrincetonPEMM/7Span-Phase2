export const metadata = {
  title: "PEMM Repositories",
  description:
    "A list of the 92 repositories who have shared digital copies of their manuscripts about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 1200s to the present.",
};

export default function RepositoriesLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
