import MdiKeyboardBackspace from "@/assets/icons/MdiKeyboardBackspace";
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
      <Link href="/about/people" className="inline-flex items-center back-btn">
        <MdiKeyboardBackspace />
        <span className="ml-2">Back</span>
      </Link>
      <div className="items-start font-body py-10 lg:flex lg:space-x-10">
        {(results[0]?.profile_image || results[0]?.favorite_painting_image) && (
          <div className="w-full lg:pb-10">
            {results[0]?.profile_image && (
              <div className="w-60 h-60 aspect-squre rounded-full mx-auto sm:h-80 sm:w-80">
                <img
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${results[0]?.profile_image.id}`}
                  alt={`${results[0].first_name} ${results[0].last_name}`}
                  className="object-cover object-center rounded-full"
                />
              </div>
            )}

            {results[0]?.favorite_painting_image && (
              <div className=" hidden md:py-8 md:block lg:py-12">
                <h1 className="text-center text-2xl font-bold text-primary-500 block mb-4 lg:text-3xl">
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
        )}
        <div className="mt-5 lg:mt-0">
          <div className="mb-3 text-center lg:mb-3 lg:text-left">
            <h2 className="text-3xl font-bold text-primary-500 md:text-4xl">
              {`${results[0].first_name} ${results[0].last_name}`}
            </h2>
            <p className="text-2xl text-black font-bold">
              Project Director &
              <span className="block">Principal Investigator</span>
            </p>
            <p className="text-primary-500 font-extrabold text-lg">
              {results[0].website}
            </p>
          </div>
          <div
            className="space-y-5 font-semibold text-offWhite-500 text-center lg:text-left"
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
