import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
                  src={
                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0RERERERCIvPjxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik0xMTkuOTUgMjUwLjE5NWg5Ljg1cTMuNjMgMCA2LjMyLS45MSAyLjctLjkgNC40OS0yLjU5IDEuNzktMS43IDIuNjctNC4xMi44OC0yLjQzLjg4LTUuNDIgMC0yLjg0LS44OC01LjE0dC0yLjY1LTMuOTJxLTEuNzYtMS42Mi00LjQ2LTIuNDctMi42OS0uODYtNi4zNy0uODZoLTkuODV2MjUuNDNabS0xMy4xOC0zNS42MmgyMy4wM3E3LjExIDAgMTIuMyAxLjY2IDUuMiAxLjY3IDguNTggNC42NnQ1LjAyIDcuMTVxMS42NCA0LjE3IDEuNjQgOS4xMSAwIDUuMTUtMS43MSA5LjQ0LTEuNzIgNC4yOC01LjE1IDcuMzctMy40MyAzLjA5LTguNiA0LjgtNS4xNyAxLjcyLTEyLjA4IDEuNzJoLTkuODV2MjQuOTRoLTEzLjE4di03MC44NVptMTA1LjM1IDEwLjQ4aC0zMS40NnYxOS42NWgyNC44djEwLjE0aC0yNC44djIwLjA0aDMxLjQ2djEwLjU0aC00NC42OXYtNzAuODVoNDQuNjl2MTAuNDhabTc4LjU1LTEwLjQ4aDkuOTV2NzAuODVIMjg5di00NS43N3EwLTIuNzQuMy01LjkzbC0yMS40MiA0MC4yM3EtMS41MSAyLjg5LTQuNjUgMi44OWgtMS44NnEtMy4xNCAwLTQuNjYtMi44OWwtMjEuNjYtNDAuMzdxLjE1IDEuNjEuMjUgMy4xOHQuMSAyLjg5djQ1Ljc3aC0xMS42MnYtNzAuODVoOS45NXEuODggMCAxLjUyLjA0LjY0LjA1IDEuMTUuMjUuNTIuMi45My42NC40Mi40NC44MSAxLjE3bDIxLjIyIDM5LjM1cS44MyAxLjU3IDEuNTQgMy4yMy43MSAxLjY3IDEuNCAzLjQzLjY4LTEuODEgMS40Mi0zLjUuNzMtMS42OSAxLjU3LTMuMjZsMjAuOTItMzkuMjVxLjM5LS43My44My0xLjE3LjQ0LS40NC45Ni0uNjQuNTEtLjIgMS4xNS0uMjUuNjQtLjA0IDEuNTItLjA0Wm05Mi42MSAwaDkuOTV2NzAuODVoLTExLjYydi00NS43N3EwLTIuNzQuMy01LjkzbC0yMS40MSA0MC4yM3EtMS41MiAyLjg5LTQuNjYgMi44OWgtMS44NnEtMy4xNCAwLTQuNjYtMi44OWwtMjEuNjYtNDAuMzdxLjE1IDEuNjEuMjUgMy4xOHQuMSAyLjg5djQ1Ljc3aC0xMS42MnYtNzAuODVoOS45NXEuODggMCAxLjUyLjA0LjY0LjA1IDEuMTUuMjUuNTIuMi45My42NC40Mi40NC44MSAxLjE3bDIxLjIyIDM5LjM1cS44MyAxLjU3IDEuNTQgMy4yMy43MSAxLjY3IDEuNCAzLjQzLjY4LTEuODEgMS40Mi0zLjUuNzMtMS42OSAxLjU3LTMuMjZsMjAuOTItMzkuMjVxLjM5LS43My44My0xLjE3LjQ0LS40NC45Ni0uNjQuNTEtLjIgMS4xNS0uMjUuNjQtLjA0IDEuNTItLjA0WiIvPjwvc3ZnPg=="
                  }
                  alt="Picture of the author"
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 30vw"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SubBanner;
