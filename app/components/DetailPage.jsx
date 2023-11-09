import { dateFormate, defaultImageforPainting } from "@/utils/constant";
import React from "react";
import BackBtn from "./BackBtn";

const DetailPage = ({ image, title, author, date, intro, description }) => {
  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 md:py-12 mx-auto lg:w-3/4">
        <BackBtn />
        <div>
          <h2 className="text-3xl text-primary-500 font-bold lg:text-4xl font-body">
            {title ?? ""}
          </h2>
          <div className="items-start font-body pb-7 pt-5 lg:grid lg:grid-cols-3 lg:space-x-10">
            {image && (
              <div className="w-60 aspect-squre md:mx-auto sm:h-80 sm:w-80 md:w-full">
                <img
                  src={`${image}`}
                  alt={title}
                  className="object-cover object-center w-60 sm:h-60 lg:h-80 xl:w-full"
                />
              </div>
            )}
            <div class="mt-5 lg:mt-0 lg:col-span-2">
              <p className="pb-2 font-sm font-bold">By {author}</p>
              <p className="py-2 font-light text-sm">{dateFormate(date)}</p>
              <p className="py-2">{intro}</p>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            className="space-y-p descriptions-left"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
