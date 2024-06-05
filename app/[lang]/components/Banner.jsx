import MdiChevronDown from "@/assets/icons/MdiChevronDown";
import Image from "next/image";
import BannerDetail from "./BannerDetail";
import SubBanner from "./SubBanner";

const Banner = ({ id, data, setSelectedBanner, selectedBanner, localData }) => {
  return (
    <div className="relative flex flex-col bg-black">
      <div
        id={id}
        className="w-full aspect-auto h-full banner-image relative"
        onClick={() => {
          selectedBanner.img === data.img
            ? setSelectedBanner({})
            : setSelectedBanner(data);
        }}
      >
        <button
          area-label={`Learn more ${data.title}`}
          className="text-white h-auto  text-left z-30 px-5 absolute bottom-3 md:min-h-[300px] lg:bottom-1 xl:bottom-10 2xl:bottom-12"
        >
          <span className="text-sm font-normal uppercase mr-1 font-menu xl:text-xl">
            {data.title.split(" ")[0]}
          </span>
          <h3
            className="text-xl leading-none font-header uppercase sm:text-3xl xl:text-4xl xl:leading-tight"
            // onClick={() => toggleContent(index)}
          >
            {data.title.split(" ")[1]}
          </h3>
          <div className="banner-content ">
            <p className="text-xs mt-1 xl:text-sm font-body tracking-wide">
              {data.description}
            </p>
            <a
              href={data.id}
              className="text-offWhite-500 text-sm delay-75 flex items-center hover:text-secondary-500"
              aria-expanded={`${setSelectedBanner ? "false" : "true"}`}
            >
              <span>{localData.learn_more}</span>
              <span
                className={`h-6 w-6 transition-all ${
                  setSelectedBanner ? "rotate-0" : "rotate-180"
                }`}
              >
                <MdiChevronDown className="h-6 w-6" />
              </span>
            </a>
            <div
              className="mt-2 text-xs xl:mt-5"
              dangerouslySetInnerHTML={{ __html: data.credit }}
            ></div>
          </div>
        </button>
        <div className="relative hero-img overflow-hidden">
          <Image
            src={data.img}
            width="400"
            alt={data.alt}
            height="700"
            layout="responsive"
            className="h-full bg-cover bg-top absolute inset-0"
          />
        </div>
      </div>
      {/* Show the detailed view for the clicked item */}
      {selectedBanner.img === data.img && (
        <div className="md:hidden block" id="mobileScroll">
          <BannerDetail
            img={data?.img}
            title={data?.title}
            text={data?.text}
            data={data}
            areaLabel={`${data?.title} button`}
            setSelectedBanner={setSelectedBanner}
            clsBtnCondition={selectedBanner.img === data.img}
          />
          <SubBanner stories={data?.storyPart} />
        </div>
      )}
    </div>
  );
};

export default Banner;
