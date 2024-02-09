export const metadata = {
  title: "Contact Us",
  description:
    "Contact PEMM with feedback and suggestions, or media inquiries, or info about how you used the site to extend your research or teaching, or requests for events, or ways to help or donate to the PEMM site about African stories, paintings, and manuscripts about the Virgin Mary created in Ethiopia, Eritrea, and Egypt in the 1200s to the present.",
};

export default function ContactUsLayout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
