import { client } from "@/utils/directUs";
import Hero from "./components/Hero";
import { readItems } from "@directus/sdk";
export const dynamic = "force-dynamic";

export default async function Home() {
  const result = await client.request(readItems("home", { fields: ["*.*.*"] }));
  console.log("Env Mode", process.env.NEXT_PUBLIC_MODE);
  return (
    <main>
      <Hero data={result} />
    </main>
  );
}
