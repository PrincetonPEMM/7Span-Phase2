import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Script from "next/script";
import Stories from "../components/Stories";

export const dynamic = "force-dynamic";

const StoryPage = async ({ params }) => {
  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  const selectedLanguage = languages.filter((tt) => tt.code === params.lang)[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/stories")
      ? params.lang
      : i18n.defaultLocale;

  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${needToTranslateInThisLangauge}`
  );
  const localData = await localStr.json();

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
      <Stories localData={localData} lang={needToTranslateInThisLangauge} />;
    </main>
  );
};

export default StoryPage;
