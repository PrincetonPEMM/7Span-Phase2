export const metadata = {
  title: "PEMM Help",
  description:
    "Get help in using the PEMM website and accessing paintings, stories, and manuscripts about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 200s to the present.",
};

export default function UsingTheSiteLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
