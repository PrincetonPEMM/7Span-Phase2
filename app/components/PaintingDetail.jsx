import React from "react";
import Image from "next/image";
import logo from "@assets/images/painting-detail.jpg";
import MdiOpenInNew from "@/assets/icons/MdiOpenInNew";
import Link from "next/link";
const PaintingDetail = () => {
  return (
    <div className="container-fluid py-10">
      {/* <h3 className="text-xl font-body font-bold md:text-5xl max-w-7xl leading-tight">
        title
      </h3> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10 xl:gap-20">
        <div>
          <Image
            src={logo}
            alt="pricenton ethiopian eritrean & egyptian miracles of marry project"
          />
        </div>
        <div className="col-span-2 text-offBlack-400 max-w-2xl">
          <h3 className="font-body font-extrabold text-2xl md:text-3xl">
            Story ID 4: The Ring in the fish
          </h3>
          <h5 className="font-bold text-lg text-offBlack-500">
            PEMM Captions:
          </h5>
          <ol className="list-decimal list-inside text-offBlack-500 text-base md:text-lg">
            <li>The client throws the ring into th river</li>
            <li>
              Samuel of Kalman there was a secretly devout monk who fasted
            </li>
            <li>
              During the ceremony the monk turned to a famous icon of Mary and
              pleaded for assistance.
            </li>
            <li>The client throws the ring into th river</li>
          </ol>
          <div className="space-y-1 text-base md:text-xl">
            <p>
              <strong> Painting Caption</strong> none
            </p>
            <p>
              <strong>Object Keywords:</strong> Fish; water; hat; Euchrist;
              Euchristic bread; bruch; water; hat; Euchrist; Euchristic bread;
              bruch;
            </p>
            <p className="font-body font-medium">
              <strong>Agent Keywords:</strong> none
            </p>
            <p className="font-body font-bold">
              <strong>Manuscript</strong> BOr(BL) 648 , f. 18v Date:1721-1730
            </p>
            <p className="font-body font-bold">
              <strong> PEMM Painting ID:</strong> 1722
            </p>
            <p className="font-body font-bold">
              <strong>
                Number of PEMM Manuscript with paintings of this story: 1
              </strong>
            </p>
          </div>
          <div className="md:space-x-5 pt-10 text-offWhite-500 font-semibold font-body flex items-start">
            <Link
              className="bg-secondary-500 rounded-md inline-flex items-center px-3 py-1"
              href="/manuscripts"
            >
              <MdiOpenInNew className="h-6 w-6" /> <span>View Manuscript</span>
            </Link>
            <Link
              className="bg-secondary-500 rounded-md inline-flex items-center px-3 py-1"
              href="/manuscripts"
            >
              <MdiOpenInNew className="h-6 w-6" />
              <span>View Story</span>
            </Link>

            {/* Next and previous buttons  */}
            <button
              className="bg-secondary-500 rounded-md px-3 py-1"
              href="/manuscripts"
            >
              Previous Painting
            </button>
            <button
              className="bg-secondary-500 rounded-md px-3 py-1"
              href="/manuscripts"
            >
              Next Painting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingDetail;
