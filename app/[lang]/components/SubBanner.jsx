import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { subBannerDefaultImageUrl } from "@/utils/constant";

const SubBanner = ({ stories, divClass }) => {
  const route = useRouter();
  return (
    <div className="grid sm:grid-cols-3">
      {stories &&
        stories.map((data, subIndex) => (
          <div
            className={`relative items-center justify-center uppercase text-center md:h-full ${divClass} `}
            key={data?.img + subIndex}
            onClick={() => route.push(data?.redirectLink)}
          >
            <Img data={data} />
          </div>
        ))}
    </div>
  );
};

const Img = ({ data }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="Subbanner_img">
      <>
        <Image
          src={data?.img}
          alt="Picture of the author"
          width={500}
          height={500}
          sizes="(max-width: 768px) 30vw, (max-width: 1200px) 30vw"
          style={{ width: "100%", height: "100%" }}
          onLoadingComplete={() => {
            setLoading(false);
          }}
          loader={() => data?.img}
        />
        {!loading && (
          <button className="absolute flex items-end justify-center p-5 z-10 text-white space-y-4 px-10 w-full inset-0 md:px-5 md:pb-10 lg:px-12 lg:pt-12 lg:pb-28">
            <span className="text-lg font-bold font-body mt-auto lg:text-2xl min-h-[75px] block">
              {data?.title}
            </span>
          </button>
        )}
      </>
    </div>
  );
};
export default SubBanner;
