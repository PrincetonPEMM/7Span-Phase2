import HashTitle from "@/app/components/HashTitle";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
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
        <Link
          href={`/about/people/${about_people_detail[i].slug}`}
          className="text-center font-body w-72 p-3 m-1 mx-auto sm:w-1/2 lg:1/3 xl:w-1/4 people-card"
        >
          <img
            className="rounded-full w-52 h-52 object-cover py-3 px-3 mx-auto 2xl:w-72 2xl:h-72"
            src={`${img_path}${about_people_detail[i].profile_image}`}
          />
          <h3 className="font-bold text-center tracking-tight capitalize w-full line-clamp-1 text-xl lg:text-2xl xl:text-3xl">
            {`${about_people_detail[i].first_name ?? ""} ${
              about_people_detail[i].last_name ?? ""
            }`}
          </h3>
          <p className="text-center line-clamp-3 text-base lg:text-lg min-h-[54px]">
            {about_people_detail[i].designation ?? ""}
          </p>
        </Link>
      );
    } else {
      team_without_image.push(
        <div className="text-center font-body w-72 p-1 mx-auto lg:w-2/3 2xl:w-1/4">
          <h3 className="font-bold text-center w-full text-xl tracking-tight">{`${
            about_people_detail[i].first_name ?? ""
          } ${about_people_detail[i].last_name ?? ""}`}</h3>
          {about_people_detail[i]?.website ? (
            <Link
              href={about_people_detail[i]?.website}
              target="_blank"
              className="text-center text-base text-primary-600 font-semibold"
            >
              {about_people_detail[i].designation ?? ""}
            </Link>
          ) : (
            <div className="text-center text-base ">
              {about_people_detail[i].designation ?? ""}
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="container-fluid py-4 lg:py-7">
      {/* <div
        id={`${about_people.our_people_title
          .split(" ")
          .map((word) => word.toLowerCase())
          .join("-")}`}
        className="people flex justify-center flex-col items-center"
      >
        <h2 className="text-3xl  font-header text-center lg:text-5xl text-primary-500">
          {about_people.our_people_title}
        </h2>
        <p className="text-center font-menu md:w-2/3">
          {about_people.our_people_description}
        </p>
      </div> */}

      <div className="team mt-10">
        <HashTitle title={"Our Team"} id="our-team" />
        <div className="break-words mt-5 flex flex-wrap items-start justify-center">
          {team_with_image}
        </div>
        <div className="p-2 break-words flex items-start flex-wrap justify-center">
          {team_without_image}
        </div>
      </div>

      <div
        id={`${about_people.other_team_members_title
          .split(" ")
          .map((word) => word.toLowerCase())
          .join("-")}`}
        className="other-team-member font-body md:w-4/5 mx-auto mt-10 md:space-y-5 lg:space-y-10"
      >
        <h3 className="text-3xl font-header text-center lg:text-5xl text-primary-500">
          {about_people.other_team_members_title}
        </h3>
        <div
          className="space-y-p text-center font-body text-base md:text-center descriptions-left"
          dangerouslySetInnerHTML={{
            __html: about_people.other_team_members_description,
          }}
        />
      </div>

      <div className="md:w-4/5 mx-auto space-y-10 lg:space-y-16 mt-10">
        <div
          id={`${about_people.project_collaborators_title
            .split(" ")
            .map((word) => word.toLowerCase())
            .join("-")}`}
          className="collaborators"
        >
          <HashTitle
            title={about_people.our_partners_title}
            id="our-partners"
          />
          <h3 className="text-2xl font-header text-center mb-3 md:mb-5 lg:text-4xl text-primary-500">
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
          id={`${about_people.board_members_title
            .split(" ")
            .map((word) => word.toLowerCase())
            .join("-")}`}
          className="board-members "
        >
          <h3 className="text-2xl font-header text-center mb-3 md:mb-5 lg:text-4xl text-primary-500 ">
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
          id={`${about_people.project_advisers_title
            .split(" ")
            .map((word) => word.toLowerCase())
            .join("-")}`}
          className="project-advisers "
        >
          <h3 className="text-2xl font-header text-center mb-3 md:mb-5 lg:text-4xl text-primary-500">
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
            .split(" ")
            .map((word) => word.toLowerCase())
            .join("-")}`}
          className="institutional-collaborators "
        >
          <h3 className="text-2xl font-header text-center mb-3 md:mb-5 lg:text-4xl text-primary-500">
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
          id={`${about_people.our_funders_title
            .split(" ")
            .map((word) => word.toLowerCase())
            .join("-")}`}
          className="funders "
        >
          <HashTitle title={about_people.our_funders_title} id="our-funders" />

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
          <div className="flex-wrap justify-center items-start gap-5 mb-3 md:flex">
            <div className="flex flex-col items-center w-64 px-2 mx-auto lg:items-start">
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
            <div className="flex flex-col items-center w-64 px-2 mx-auto lg:items-start">
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
            <div className="flex flex-col items-center w-64 px-2 mx-auto lg:items-start">
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
  );
}
