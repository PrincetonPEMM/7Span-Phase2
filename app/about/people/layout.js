export const metadata = {
  title: "PEMM Team",
  description:
    "The PEMM team includes Ethiopians, Americans, and Ethiopian-Americans working to provide access to  paintings, stories, and manuscripts about the Virgin Mary created in Ethiopia, Eritrea, and Egypt from the 200s to the present.",
};

export default function PeopleLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
