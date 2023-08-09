import { useRouter } from "next/navigation";
import React from "react";

const SubBanner = ({ stories, divClass }) => {
  const route = useRouter();

  return (
    <div className="grid md:grid-cols-3">
      {stories &&
        stories.map((data, subIndex) => (
          <div
            className={`relative items-center justify-center uppercase text-center md:h-full ${divClass} `}
            key={subIndex}
            onClick={() => route.push(data?.redirectLink)}
          >
            <img
              src={data?.img}
              alt="Picture of the author"
              sizes="(max-width: 768px) 30vw, (max-width: 1200px) 30vw"
              style={{ width: "100%", height: "100%" }}
            />
            <button className="absolute flex items-center justify-center z-10 text-white space-y-4 px-10 w-full inset-0 bg-black bg-opacity-50 ">
              <span className="text-lg lg:text-2xl font-bold font-body">
                {data?.title}
              </span>
            </button>
          </div>
        ))}
    </div>
  );
};

export default SubBanner;
