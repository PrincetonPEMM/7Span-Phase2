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
    <div className="container contact-page">
      <div className="space-y-4 py-12">
        <div className="people flex justify-start flex-col items-center lg:w-2/3 lg:mx-auto">
          <h2 className="text-3xl block w-full text-left font-header text-primary-500 lg:text-[32px]">
            {about_using_this_site.contact_us_title}
          </h2>
          <p className="font-body block text-left py-5 font-normal lg:mr-auto  ml-0 mr-auto">
            {about_using_this_site.contact_us_intro}
          </p>
          <div
            className="space-y-p text-left font-body description-center about-contact-page md:text-center"
            dangerouslySetInnerHTML={{
              __html: about_using_this_site.contact_us_description,
            }}
          />
        </div>
      </div>
    </div>
  );
}
