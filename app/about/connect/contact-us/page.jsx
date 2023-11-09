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
        <div className="people flex justify-start flex-col items-center ">
          <h2 className="text-3xl block w-full text-left font-header mx-auto lg:w-2/3 lg:text-4xl text-primary-500">
            {about_using_this_site.contact_us_title}
          </h2>
          <p className="font-body text-left py-5 font-normal lg:w-2/3">
            {about_using_this_site.contact_us_intro}
          </p>
          <div
            className="space-y-p text-left lg:w-2/3 md:text-center font-body description-center about-contact-page"
            dangerouslySetInnerHTML={{
              __html: about_using_this_site.contact_us_description,
            }}
          />
        </div>
      </div>
    </div>
  );
}
