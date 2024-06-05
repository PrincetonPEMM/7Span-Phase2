import { i18n } from "@/i18n";
import { pagePerLimitForPainting } from "@/utils/constant";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import PaintingByStoryIndex from "../../components/PaintingByStoryIndex";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  let data = null;

  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );
  const selectedLanguage = languages.filter((tt) => tt.code === params.lang)[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/paintings/by-story")
      ? params.lang
      : i18n.defaultLocale;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/by-story?language=${needToTranslateInThisLangauge}&page=1&perPage=${pagePerLimitForPainting}`
    );
    data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }

  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${needToTranslateInThisLangauge}`
  );
  const localData = await localStr.json();

  return (
    <div>
      <PaintingByStoryIndex
        list={data}
        localData={localData}
        lang={needToTranslateInThisLangauge}
      />
    </div>
  );
};

export default Page;
