import { i18n } from "@/i18n";
import ManuScripts from "../components/ManuScripts";

export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  const { lang } = await params;
  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${i18n.defaultLocale}` //params.lang
  );
  const localData = await localStr.json();

  return (
    <div>
      <ManuScripts localData={localData} lang={lang} />
    </div>
  );
};

export default page;
