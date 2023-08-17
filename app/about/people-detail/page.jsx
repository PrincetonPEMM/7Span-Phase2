import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

export const dynamic = "force-dynamic";

const PeopleDetailPage = async () => {
  const slug = "evgeniia-lambrinaki";
  const results = await client.request(
    readItems("about_people_detail", {
      fields: ["*.*.*"],
      filter: { slug: slug },
    })
  );

  console.log(results, "Result");
  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 grid-cols-1 items-start gap-5 py-10">
        <div className="w-full  lg:pb-10 lg:pt-5 block">
          <div className="space-y-10">
            <img
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${results[0]?.profile_image.id}`}
              alt={`${results[0].first_name} ${results[0].last_name}`}
              className="object-cover object-center w-full h-full lg:w-80 lg:h-80 sm:w-auto sm:h-auto xl:w-auto xl:h-auto mx-auto rounded-full overflow-hidden"
            />
          </div>
          {Object.keys(results[0]?.profile_image) && (
            <div className="py-12">
              <h1 className="text-center text-2xl font-body text-primary-500 ">
                {`${results[0].first_name}'s Favorite Painting`}
              </h1>
              <img
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/${results[0]?.profile_image.id}`}
                alt=""
                className="object-cover object-center w-full h-full lg:w-40 lg:h-40 sm:w-auto sm:h-auto xl:w-auto xl:h-auto mx-auto  overflow-hidden"
              />
            </div>
          )}
        </div>
        <div className="col-span-2 font-body">
          <div className="mb-3 lg:mb-3 text-center md:text-left ">
            <h2 className="text-4xl font-bold text-primary-500 ">
              {`${results[0].first_name} ${results[0].last_name}`}
            </h2>
            <p className="text-2xl text-black font-bold">
              Project Director &{" "}
              <span className="block">Principal Investigator</span>
            </p>
            <p className="text-primary-500 font-extrabold text-lg">
              {results[0].website} hello
            </p>
          </div>
          <div
            className="space-y-5 font-semibold text-offWhite-500 text-center md:text-left"
            dangerouslySetInnerHTML={{ __html: results[0].description }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailPage;
