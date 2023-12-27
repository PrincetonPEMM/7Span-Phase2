export const metadata = {
  title: "PEMM Macomber Handlist",
  description:
    "PEMM takes advantage of a handlist created by William F. Macomber about around 640 manuscripts about the Virgin Mary created in Ethiopia.",
};

export default function MacomberLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
