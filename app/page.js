import { client } from "@/utils/directUs";
import Hero from "./components/Hero";
import { readItems } from "@directus/sdk";
export const dynamic = "force-dynamic";
import Script from 'next/script'

export default async function Home() {
  const result = await client.request(readItems("home", { fields: ["*.*.*"] }));

  return (
    <main>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-L1XB3HXBQM" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-L1XB3HXBQM');
        `}
      </Script>
      <Hero data={result} />
    </main>
  );
}
