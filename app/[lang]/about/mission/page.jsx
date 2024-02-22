import { i18n } from "@/i18n";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import HashTitle from "../../components/HashTitle";
export const dynamic = "force-dynamic";

export default async function page(props) {
  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  const selectedLanguage = languages.filter(
    (tt) => tt.code === props.params.lang
  )[0];

  let result = await client.request(
    readItems("about_mission", { fields: ["*.*.*"] })
  );
  let resultTran = result.translations.filter(
    (itm) =>
      itm.languages_code.code ===
      (selectedLanguage.translated_pages.includes("/about/mission")
        ? props.params.lang
        : i18n.defaultLocale)
  );

  result = { ...result, ...resultTran[0] };

  return (
    <div className="container">
      <div className="space-y-4 py-12">
        <div className="people flex justify-center flex-col items-center lg:w-2/3 mx-auto">
          <HashTitle title={result.mission_title} id={`our-mission`} />
          <p className="font-body py-5 lg:w-full ">{result.mission_intro}</p>
          <div
            className="space-y-p text-center font-body md:text-left lg:w-full descriptions-left "
            dangerouslySetInnerHTML={{
              __html: result.mission_description,
            }}
          />
        </div>
        <div className="people flex justify-center flex-col items-center lg:w-2/3 mx-auto">
          <HashTitle title={result.history_title} id={`our-history`} />
          <p className="font-body py-5 lg:w-full">{result.history_intro}</p>
          <div
            className="space-y-p text-center font-body md:text-left lg:w-full descriptions-left "
            dangerouslySetInnerHTML={{
              __html: result.history_description,
            }}
          />
        </div>
      </div>
    </div>
  );
}
