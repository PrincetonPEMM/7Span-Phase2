import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";
const img_path = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/`;
export default async function page() {
  const about_people = await client.request(
    readItems("about_people", { fields: ["*.*.*"] })
  );
  const about_people_detail = await client.request(
    readItems("about_people_detail")
  );
  const team_with_image = [];
  const team_without_image = [];
  for (let i = 0; i < about_people_detail.length; i++) {
    if (about_people_detail[i].profile_image) {
      team_with_image.push(
        <Link href={`/about/people/${about_people_detail[i].slug}`}>
          <div className="text-center font-body w-72 p-1 mx-auto">
            <img
              className="rounded-full w-52 h-52 2xl:w-72 2xl:h-72 object-cover py-3 px-3 mx-auto"
              src={`${img_path}${about_people_detail[i].profile_image}`}
            />
            <h3 className="font-bold text-center w-full line-clamp-1 text-xl lg:text-2xl xl:text-3xl tracking-tight capitalize">{`${
              about_people_detail[i].first_name ?? ""
            } ${about_people_detail[i].last_name ?? ""}`}</h3>
            <p className="text-center line-clamp-3 text-base lg:text-lg">
              {about_people_detail[i].designation ?? ""}
            </p>
          </div>
        </Link>
      );
    } else {
      team_without_image.push(
        <Link href={`/about/people/${about_people_detail[i].slug}`}>
          <div className="text-center font-body w-72 p-1 mx-auto">
            <h3 className="font-bold text-center w-full text-xl tracking-tight">{`${
              about_people_detail[i].first_name ?? ""
            } ${about_people_detail[i].last_name ?? ""}`}</h3>
            <p className="text-center text-base">
              {about_people_detail[i].designation ?? ""}
            </p>
          </div>
        </Link>
      );
    }
  }
  return (
    <div className="container-fluid">
      <div className="space-y-4 py-12">
        <div
          id={`${about_people.our_people_title.split(" ").map(word => word.toLowerCase()).join("-")}`}
          className="people flex justify-center flex-col items-center"
        >
          <h2 className="text-3xl lg:text-5xl font-header text-center">
            {about_people.our_people_title}
          </h2>
          <p className="text-center font-menu md:w-2/3">
            {about_people.our_people_description}
          </p>
        </div>

        <div id="our-team" className="team">
          <h2 className="text-3xl lg:text-5xl font-header text-center">
            Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10 justify-center break-words mt-5 lg:mt-10">
            {team_with_image}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-8 justify-center p-2 break-words">
            {team_without_image}
          </div>
        </div>

        <div
          id={`${about_people.other_team_members_title.split(" ").map(word => word.toLowerCase()).join("-")}`}
          className="other-team-member font-body"
        >
          <h3 className="text-2xl lg:text-4xl text-center font-extrabold tracking-tight leading-none">
            {about_people.other_team_members_title}
          </h3>
          <div
            className="space-y-p text-center font-body md:text-left text-base"
            dangerouslySetInnerHTML={{
              __html: about_people.other_team_members_description,
            }}
          />
        </div>

        <div
          id={`${about_people.our_partners_title.split(" ").map(word => word.toLowerCase()).join("-")}`}
          className="md:w-4/5 mx-auto space-y-10 lg:space-y-16"
        >
          <h2 className="text-3xl lg:text-5xl font-header text-center">
            {about_people.our_partners_title}
          </h2>
          <div
            id={`${about_people.project_collaborators_title
              .split(" ").map(word => word.toLowerCase())
              .join("-")}`}
            className="collaborators"
          >
            <h3 className="text-3xl lg:text-5xl font-header text-center mb-3 md:mb-5">
              {about_people.project_collaborators_title}
            </h3>
            <div
              className="space-y-p text-center font-body md:text-left"
              dangerouslySetInnerHTML={{
                __html: about_people.project_collaborators_description,
              }}
            />
          </div>

          <div
            id={`${about_people.board_members_title.split(" ").map(word => word.toLowerCase()).join("-")}`}
            className="board-members "
          >
            <h3 className="text-2xl lg:text-4xl font-header text-center mb-3 md:mb-5">
              {about_people.board_members_title}
            </h3>
            <div
              className="space-y-p text-center font-body md:text-left"
              dangerouslySetInnerHTML={{
                __html: about_people.board_members_description,
              }}
            />
          </div>

          <div
            id={`${about_people.project_advisers_title.split(" ").map(word => word.toLowerCase()).join("-")}`}
            className="project-advisers "
          >
            <h3 className="text-2xl lg:text-4xl font-header text-center mb-3 md:mb-5">
              {about_people.project_advisers_title}
            </h3>
            <div
              className="space-y-p text-center font-body md:text-left"
              dangerouslySetInnerHTML={{
                __html: about_people.project_advisers_description,
              }}
            />
          </div>

          <div
            id={`${about_people.institutional_collaborators_title
              .split(" ").map(word => word.toLowerCase())
              .join("-")}`}
            className="institutional-collaborators "
          >
            <h3 className="text-2xl lg:text-4xl font-header text-center mb-3 md:mb-5">
              {about_people.institutional_collaborators_title}
            </h3>
            <div
              className="space-y-p text-center font-body md:text-left"
              dangerouslySetInnerHTML={{
                __html: about_people.institutional_collaborators_description,
              }}
            />
          </div>

          <div
            id={`${about_people.our_funders_title.split(" ").map(word => word.toLowerCase()).join("-")}`}
            className="funders "
          >
            <h2 className="text-3xl lg:text-5xl font-header text-center">
              {about_people.our_funders_title}
            </h2>
            <div>
              <img
                className="w-48 py-3 mx-auto"
                width={720}
                height={720}
                src={`${img_path}${about_people.main_image.id}`}
              />
              <div
                className="space-y-p text-center font-body md:text-left"
                dangerouslySetInnerHTML={{
                  __html: about_people.main_image_description,
                }}
              />
            </div>
            <div className="md:flex flex-wrap justify-center items-start gap-5 mb-3">
              <div className="flex flex-col items-center lg:items-start w-64 px-2 mx-auto">
                <img
                  className="w-48 h-48 object-contain mx-auto"
                  src={`${img_path}${about_people.sub_image_1.id}`}
                />
                <div
                  className="space-y-p text-center font-body md:text-left"
                  dangerouslySetInnerHTML={{
                    __html: about_people.sub_image_1_description,
                  }}
                />
              </div>
              <div className="flex flex-col items-center lg:items-start w-64 px-2 mx-auto">
                <img
                  className="w-48 h-48 object-contain mx-auto"
                  src={`${img_path}${about_people.sub_image_2.id}`}
                />
                <div
                  className="space-y-p text-center font-body md:text-left"
                  dangerouslySetInnerHTML={{
                    __html: about_people.sub_image_2_description,
                  }}
                />
              </div>
              <div className="flex flex-col items-center lg:items-start w-64 px-2 mx-auto">
                <img
                  className="w-48 h-48 object-contain mx-auto"
                  src={`${img_path}${about_people.sub_image_3.id}`}
                />
                <div
                  className="space-y-p text-center font-body md:text-left"
                  dangerouslySetInnerHTML={{
                    __html: about_people.sub_image_3_description,
                  }}
                />
              </div>
            </div>
            <div
              className="py-3 space-y-p text-center font-body md:text-left"
              dangerouslySetInnerHTML={{
                __html: about_people.our_funders_description,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
