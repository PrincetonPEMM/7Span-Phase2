import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Script from "next/script";
import StoryDetail from "../../components/StoryDetail";

export const dynamic = "force-dynamic";
const Page = async ({ params }) => {
  const { Id } = params;
  let data = null;

  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  const selectedLanguage = languages.filter((tt) => tt.code === params.lang)[0];

  let localData = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${params.lang}`
  );

  localData = await localData.json();

  const lang = selectedLanguage.translated_pages.includes("/stories/id")
    ? params.lang
    : i18n.defaultLocale;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories/${Id}?language=${lang}`
    );

    data = await response.json();
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
      <StoryDetail data={data} Id={Id} localData={localData} />
    </main>
  );
};

export default Page;
