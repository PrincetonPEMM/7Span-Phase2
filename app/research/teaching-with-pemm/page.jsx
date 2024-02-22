export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";

const page = async () => {
  let teaching_with_pemm_data = null;

  try {
    let resultTran = await client.request(
      readItems("teaching_with_pemm", { fields: ["*.*.*"] })
    );
    teaching_with_pemm_data = resultTran.translations.filter(
      (itm) => itm.languages_code.code === "en-us"
    )[0];
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 md:py-12 lg:w-3/4 mx-auto">
        {teaching_with_pemm_data && (
          <div>
            <h1 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
              {teaching_with_pemm_data?.title}
            </h1>
            <p className="pt-4 pb-6">{teaching_with_pemm_data?.intro}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: teaching_with_pemm_data?.description,
              }}
              className="descriptions-left"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
