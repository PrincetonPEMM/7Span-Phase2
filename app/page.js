import { client } from "@/utils/directUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import "./globals.css";
import { readItems } from "@directus/sdk";

export default async function Home() {
  const result = await client.request(
    readItems("home", {
      fields: ["*.*.*"],
      // fields: ["title", "date_created", { authors: ["name"] }],
    })
  );
  return (
    <main>
      <div className="relative">
        <Header className="absolute inset-x-0" />
        <Hero data={result} />
      </div>
      <Footer />
    </main>
  );
}
