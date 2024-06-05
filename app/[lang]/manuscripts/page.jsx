import { i18n } from "@/i18n";
import ManuScripts from "../components/ManuScripts";

export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${i18n.defaultLocale}` //params.lang
  );
  const localData = await localStr.json();

  return (
    <div>
      <ManuScripts localData={localData} lang={params.lang} />
    </div>
  );
};

export default page;
