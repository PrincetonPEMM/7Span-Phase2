import { client } from "@/utils/directUs";
import Hero from "./components/Hero";
import { readItems } from "@directus/sdk";
export const dynamic = "force-dynamic";
import Script from "next/script";

export default async function Home(props) {
  let result = await client.request(readItems("home", { fields: ["*.*.*"] }));
  let resultTran = result.translations.filter(
    (itm) => itm.languages_code.code === props.params.lang
  );
  result = { ...result, ...resultTran[0] };

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
      <Hero data={result} lang={props.params.lang} />
    </main>
  );
}
