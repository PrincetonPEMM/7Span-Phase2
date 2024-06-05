import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Script from "next/script";
import Hero from "./components/Hero";
export const dynamic = "force-dynamic";

export default async function Home(props) {
  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  const selectedLanguage = languages.filter(
    (tt) => tt.code === props.params.lang
  )[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/")
      ? props.params.lang
      : i18n.defaultLocale;

  let localData = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${needToTranslateInThisLangauge}`
  );

  localData = await localData.json();

  let result = await client.request(readItems("home", { fields: ["*.*.*"] }));
  let resultTran = result.translations.filter(
    (itm) => itm.languages_code.code === needToTranslateInThisLangauge
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
      <Hero data={result} lang={props.params.lang} localData={localData} />
    </main>
  );
}
