import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Script from "next/script";
import ErrorPage from "../../components/ErrorPage";
import PaintingDetail from "../../components/PaintingDetail";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { slug, lang } = await params;

  let data = null;

  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );
  const selectedLanguage = languages.filter((tt) => tt.code === lang)[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/paintings/id")
      ? lang
      : i18n.defaultLocale;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/${slug}?language=${needToTranslateInThisLangauge}`
    );

    data = await response.json();
    if (response?.status === 404) {
      return <ErrorPage error={data.error} title={data.title} />;
    }
  } catch (error) {
    console.log("Error", error);
  }

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
      <PaintingDetail
        data={data[0]}
        localData={localData}
        lang={needToTranslateInThisLangauge}
      />
    </main>
  );
};

export default Page;
