import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Hero from "./components/Hero";
export const dynamic = "force-dynamic";

export default async function Home(props) {
  const { lang } = await props.params;
  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  const selectedLanguage = languages.filter(
    (tt) => tt.code === lang
  )[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/")
      ? lang
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
      <Hero data={result} lang={lang} localData={localData} />
    </main>
  );
}
