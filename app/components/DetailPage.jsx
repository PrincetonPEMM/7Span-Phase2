import { dateFormate, defaultImageforPainting } from "@/utils/constant";
import React from "react";
import BackBtn from "./BackBtn";

const DetailPage = ({ image, title, author, date, intro, description }) => {
  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 md:py-12 mx-auto lg:w-3/4">
        <BackBtn />
        <div>
          <h1 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
            {title ?? ""}
          </h1>
          <div className="font-body pb-7 pt-5">
            <div class="mt-5 lg:mt-0 lg:col-span-2">
              <img
                src={`${image}`}
                alt={title}
                className="w-60 object-cover object-center float-left mr-5 mb-4 sm:h-60 lg:h-80"
              />

              <p className="pb-2 font-sm font-bold">By {author}</p>
              <p className="py-2 font-light text-sm">{dateFormate(date)}</p>
              <p className="py-2">{intro}</p>

              {/* <p className="py-2">{description}</p> */}

              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                className="space-y-p contents"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
