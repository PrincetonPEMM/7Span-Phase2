import MdiTwitterBox from "@/assets/icons/MdiTwitterBox";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

const PeopleDetailPage = async ({ name }) => {
  const slug = name; // || "evgeniia-lambrinaki";
  const results = await client.request(
    readItems("about_people_detail", {
      fields: ["*.*.*"],
      filter: { slug: slug },
    })
  );

  console.log(results, "Results");

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 grid-cols-1 items-start gap-5 py-10">
        <div className="w-full  lg:pb-10 lg:pt-5 block">
          <div className="space-y-10">
            <img
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${results[0]?.profile_image.id}`}
              alt={`${results[0].first_name} ${results[0].last_name}`}
              className="object-cover object-center  lg:w-80 lg:h-80 h-28 w-28 xl:w-auto xl:h-auto mx-auto rounded-full overflow-hidden"
            />
          </div>
          {results[0]?.favorite_painting_image && (
            <div className="md:py-8 lg:py-12 md:block hidden">
              <h1 className="text-center text-2xl lg:text-3xl font-body font-bold text-primary-500 block mb-4">
                {`${results[0].first_name}'s Favorite Painting`}
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
        </div>
        <div className="col-span-2 font-body">
          <div className="mb-3 lg:mb-3 text-center md:text-left ">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 ">
              {`${results[0].first_name} ${results[0].last_name}`}
            </h2>
            <p className="text-2xl text-black font-bold">
              Project Director &{" "}
              <span className="block">Principal Investigator</span>
            </p>
            <p className="text-primary-500 font-extrabold text-lg">
              {results[0].website}
            </p>
          </div>
          <div
            className="space-y-5 font-semibold text-offWhite-500 text-center md:text-left"
            dangerouslySetInnerHTML={{ __html: results[0].description }}
          ></div>

          {results[0]?.favorite_painting_image && (
            <div className="block md:hidden">
              <h1 className="text-center text-2xl font-body font-bold text-primary-500 block mb-4">
                {`${results[0].first_name}'s Favorite Painting`}
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
