import { dateFormate, defaultImageforPainting } from "@/utils/constant";
import React from "react";
import BackBtn from "./BackBtn";

const DetailPage = ({ image, title, author, date, intro, description }) => {
  return (
    <div className="container">
      <div className="font-body space-y-4 py-8 mx-auto md:py-12 lg:w-3/4">
        <BackBtn />
        <div>
          <h3 className="text-3xl text-primary-500 font-bold lg:text-5xl">
            {title ?? ""}
          </h3>
          <div className="items-start font-body py-10 lg:grid lg:grid-cols-3 lg:space-x-10">
            {image && (
              <div className="w-60 aspect-squre mx-auto sm:h-80 sm:w-80">
                <img
                  src={`${image}`}
                  alt={title}
                  className="object-cover object-center w-60 sm:h-60 lg:h-80 xl:w-80"
                />
              </div>
            )}
            <div class="mt-5 lg:mt-0 lg:col-span-2">
              <p className="py-2 font-sm font-semibold">by {author}</p>
              <p className="py-2 font-light text-xs">{dateFormate(date)}</p>
              <p className="py-2">{intro}</p>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            className="space-y-p"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
