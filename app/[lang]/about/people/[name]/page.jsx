import BackBtn from "@/app/[lang]/components/BackBtn";
import MdiTwitterBox from "@/assets/icons/MdiTwitterBox";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Link from "next/link";
import React from "react";
export const dynamic = "force-dynamic";

const PeopleDetailPage = async ({ params }) => {
  const { name } = params;

  const results = await client.request(
    readItems("about_people_detail", {
      fields: ["*.*.*"],
      filter: { slug: name },
    })
  );
  return (
    <div className="container mx-auto">
      <BackBtn />
      <div className="items-start font-body py-10 lg:grid lg:grid-cols-3 lg:space-x-10">
        {(results[0]?.profile_image || results[0]?.favorite_painting_image) && (
          <div className="w-full lg:pb-10 max-w-sm mx-auto">
            {results[0]?.profile_image && (
              <div className="w-60 h-60 aspect-squre rounded-full mx-auto sm:h-80 sm:w-80">
                <img
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${results[0]?.profile_image.id}`}
                  alt={`${results[0].first_name} ${results[0].last_name}`}
                  className="object-cover object-center rounded-full w-60 h-60 sm:h-80 sm:w-80"
                />
              </div>
            )}

            {results[0]?.favorite_painting_image && (
              <div className=" hidden md:py-8 md:block lg:py-12">
                <h1 className="text-center text-2xl font-extrabold text-primary-500 block mb-4 lg:text-3xl tracking-tighter">
                  Favorite Painting
                </h1>
                <div className="mx-auto w-56 h-auto">
                  <img
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${results[0]?.favorite_painting_image.id}`}
                    alt=""
                    className="object-cover object-center mx-auto h-full overflow-hidden w-60"
                  />
                </div>
                {results[0]?.favorite_painting_link ? (
                  <Link
                    href={results[0]?.favorite_painting_link}
                    className="mx-auto block text-primary-500 font-bold hover:text-secondary-500 text-lg text-center mt-2"
                  >
                    {results[0]?.favorite_painting_description}
                  </Link>
                ) : (
                  <p className="mx-auto block text-offBlack-500 font-bold text-lg text-center mt-2">
                    {results[0]?.favorite_painting_description}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        <div className="mt-5 lg:mt-0 lg:col-span-2 people-page-headings">
          <div className="mb-3 text-center lg:mb-3 lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-500 md:text-[32px]">
              {`${results[0].first_name ? results[0].first_name : ""} ${
                results[0].last_name ? results[0].last_name : ""
              }`}
            </h2>
            <p className="text-lg md:text-2xl text-black font-bold">
              {results[0].designation ? results[0].designation : ""}
              {/* Project Director &
              <span className="block">Principal Investigator</span> */}
            </p>
            {results[0].website && (
              <p className="text-primary-500 font-extrabold text-lg">
                <a
                  href={results[0].website}
                  target="_blank"
                  className="cursor-pointer text-primary-500 hover:text-secondary-500 font-bold"
                  area-label="click here to visit this link"
                >
                  {results[0].website}
                </a>
              </p>
            )}
          </div>
          <div
            className="space-y-5  text-offBlack-500 lg:text-left people-description"
            dangerouslySetInnerHTML={{ __html: results[0].description }}
          ></div>

          {results[0]?.favorite_painting_image && (
            <div className="block md:hidden">
              <h1 className="text-center text-2xl font-body font-bold text-primary-500 block mb-4">
                Favorite Painting
              </h1>
              <div className="max-w-xs mx-auto aspect-[9/11]">
                <img
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${results[0]?.favorite_painting_image.id}`}
                  alt=""
                  className="object-cover object-center mx-auto h-full overflow-hidden w-60"
                />
              </div>
            </div>
          )}

          {results[0]?.twitter_link && (
            <Link
              href={results[0]?.twitter_link}
              className="my-3 cursor-pointer"
              aria-label="Twitter"
            >
              <MdiTwitterBox className="twitter-icon" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailPage;
