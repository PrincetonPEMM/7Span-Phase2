import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import IncipitTool from "../../components/incipitTool";

export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  const { lang } = await params;
  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  const selectedLanguage = languages.filter((tt) => tt.code === lang)[0];

  const needToTranslateInThisLangauge =
    selectedLanguage.translated_pages.includes("/research/incipit-tool")
      ? lang
      : i18n.defaultLocale;

  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${needToTranslateInThisLangauge}`
  );
  const localData = await localStr.json();

  return (
    <IncipitTool localData={localData} lang={needToTranslateInThisLangauge} />
  );
};

export default page;
