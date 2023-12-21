export const metadata = {
  title: "PEMM Stories",
  description: "PEMM Stories",
};

export default function StoriesLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
