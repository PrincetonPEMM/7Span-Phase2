export const metadata = {
  title: "PEMM Stories",
  description:
    "We provide translations of captivating African stories in African languages about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 200s to the present.",
};

export default function StoriesLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
