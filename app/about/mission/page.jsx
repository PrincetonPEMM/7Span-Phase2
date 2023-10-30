import HashTitle from "@/app/components/HashTitle";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
export const dynamic = "force-dynamic";

export default async function page() {
  const about_mission_data = await client.request(readItems("about_mission"));

  return (
    <div className="container">
      <div className="space-y-4 py-12">
        <div className="people flex justify-center flex-col items-center">
          <HashTitle
            title={about_mission_data.mission_title}
            id={`our-mission`}
          />
          <p className="text-center font-menu py-5 lg:w-2/3">
            {about_mission_data.mission_intro}
          </p>
          <div
            className="space-y-p text-center font-menu md:text-left lg:w-2/3 descriptions-left"
            dangerouslySetInnerHTML={{
              __html: about_mission_data.mission_description,
            }}
          />
        </div>
        <div className="people flex justify-center flex-col items-center">
          <HashTitle
            title={about_mission_data.history_title}
            id={`our-history`}
          />
          <p className="text-center font-menu py-5 lg:w-2/3">
            {about_mission_data.history_intro}
          </p>
          <div
            className="space-y-p text-center font-menu md:text-left lg:w-2/3 descriptions-left"
            dangerouslySetInnerHTML={{
              __html: about_mission_data.history_description,
            }}
          />
        </div>
      </div>
    </div>
  );
}
