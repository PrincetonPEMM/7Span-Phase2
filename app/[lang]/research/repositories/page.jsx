export const dynamic = "force-dynamic";

import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";

const page = async () => {
  let repositories_data = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}list-of-repositories`
    );
    repositories_data = await response.json();
  } catch (e) {
    console.log(e);
  }

  console.log(repositories_data, "repositories_data");

  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 md:py-12 mx-auto lg:w-3/4">
        {repositories_data && (
          <div>
            <h1 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
              {repositories_data?.title ?? ""}
            </h1>
            <p className="pt-4 pb-6">{repositories_data?.intro}</p>
            {repositories_data.description.map((item, index) => (
              <div key={index} className="space-y-p descriptions-left">
                <h3>
                  {item.institution_name} {item.collection_name}
                </h3>
                <i>
                  {item.institution_city_state}, {item.institution_country}
                </i>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.source,
                  }}
                ></div>
                <div className="mt-[3px]">
                  <span className="font-medium">
                    Total manuscripts in PEMM:
                  </span>{" "}
                  {item.total_manuscripts_in_collection}
                </div>
                <div>
                  <span className="font-medium">PEMM Abbreviation:</span>{" "}
                  {item.collection}
                </div>
                <div>
                  <span className="font-medium">Macomber Abbreviation:</span>{" "}
                  {item.macomber_abbreviation
                    ? item.macomber_abbreviation
                    : "None"}
                </div>
              </div>
            ))}
            {/* <div
              dangerouslySetInnerHTML={{
                __html: repositories_data?.description,
              }}
              className="space-y-p descriptions-left"
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
