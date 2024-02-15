import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Script from "next/script";
import Paintings from "../components/Paintings";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );
  const selectedLanguage = languages.filter((tt) => tt.code === params.lang)[0];

  const lang = selectedLanguage.translated_pages.includes("/paintings")
    ? params.lang
    : i18n.defaultLocale;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/filters?language=${lang}`
  );
  const filters = await res.json();

  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${params.lang}`
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
      <Paintings {...filters} localData={localData} lang={lang} />
    </main>
  );
};

export default Page;
