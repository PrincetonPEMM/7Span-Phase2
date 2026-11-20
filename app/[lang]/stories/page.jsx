import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Stories from "../components/Stories";

export const dynamic = "force-dynamic";

const StoryPage = async ({ params }) => {
  const { lang } = await params;
  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  const selectedLanguage = languages.filter((tt) => tt.code === lang)[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/stories")
      ? lang
      : i18n.defaultLocale;

  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${needToTranslateInThisLangauge}`
  );
  const localData = await localStr.json();

  return (
    <main>
      <Stories localData={localData} lang={needToTranslateInThisLangauge} />;
    </main>
  );
};

export default StoryPage;
