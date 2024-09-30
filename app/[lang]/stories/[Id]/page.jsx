import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Script from "next/script";
import ErrorPage from "../../components/ErrorPage";
import StoryDetail from "../../components/StoryDetail";

export const dynamic = "force-dynamic";
const Page = async ({ params }) => {
  const { Id } = params;
  let data = null;

  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  const selectedLanguage = languages.filter((tt) => tt.code === params.lang)[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/stories/id")
      ? params.lang
      : i18n.defaultLocale;

  let localData = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${needToTranslateInThisLangauge}`
  );

  localData = await localData.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories/${Id}?language=${needToTranslateInThisLangauge}`
    );

    data = await response.json();
    if (response.status === 404) {
      return <ErrorPage error={data.error} />;
    }
  } catch (error) {
    console.log("Error", error);
  }

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
      <StoryDetail
        results={data}
        Id={Id}
        localData={localData}
        lang={needToTranslateInThisLangauge}
      />
    </main>
  );
};

export default Page;
