import { client } from "@/utils/directUs";
import Hero from "./components/Hero";
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
      <Hero data={result} />
    </main>
  );
}
