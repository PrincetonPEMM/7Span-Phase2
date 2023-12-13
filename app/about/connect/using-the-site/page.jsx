import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
export const dynamic = "force-dynamic";

export default async function page() {
  let about_using_this_site = null;

  try {
    about_using_this_site = await client.request(
      readItems("about_using_this_site", {
        fields: ["*.*.*"],
      })
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="container">
      <div className="space-y-4 py-12">
        <div className="people flex justify-start flex-col items-center mx-auto lg:w-2/3">
          <h2 className="text-3xl text-left font-header text-primary-500 w-full xl:text-4xl">
            {about_using_this_site.using_the_site_title}
          </h2>
          <p className="font-body py-5 w-full">
            {about_using_this_site.using_the_site_intro}
          </p>
          <div
            className="space-y-p font-body description-center"
            dangerouslySetInnerHTML={{
              __html: about_using_this_site.using_the_site_description,
            }}
          />
        </div>
      </div>
    </div>
  );
}
