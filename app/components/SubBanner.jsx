import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { subBannerDefaultImageUrl } from "@/utils/constant";

const SubBanner = ({ stories, divClass }) => {
  const route = useRouter();
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    setFlag(false);
    setTimeout(() => {
      setFlag(true);
    }, [1000]);
  }, [stories]);

  return (
    <div className="grid sm:grid-cols-3">
      {stories &&
        stories.map((data, subIndex) => (
          <div
            className={`relative items-center justify-center uppercase text-center md:h-full ${divClass} `}
            key={subIndex}
            onClick={() => route.push(data?.redirectLink)}
          >
            <div className="Subbanner_img">
              {flag ? (
                <>
                  <Image
                    src={data?.img}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 30vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <button className="absolute flex items-center justify-center z-10 text-white space-y-4 px-10 w-full inset-0">
                    <span className="text-lg lg:text-2xl font-bold font-body">
                      {data?.title}
                    </span>
                  </button>
                </>
              ) : (
                <Image
                  // src="https://placehold.co/500x500?text=PEMM"
                  src={subBannerDefaultImageUrl}
                  alt="Picture of the author"
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 30vw"
                  style={{ width: "100%", height: "100%" }}
                  className="animate-pulse"
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SubBanner;
