import Image from "next/image";
import Logo from "../../assets/images/logo-footer.png";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const aboutItems = [
    { title: "Our Mission", link: "/about/mission" },
    { title: "Our History", link: "/about/mission" },
    { title: "Our Team", link: "/about/people" },
    { title: "Our Partners", link: "/about/people" },
    { title: "Our Funders", link: "/about/people" },
    { title: "News & Updates", link: "/about/news-and-update" },
    { title: "Events & Workshops", link: "/about/events" },
    { title: "Using the Site", link: "/about/using-site" },
    { title: "Contact Us", link: "/about/using-site" },
  ];
  const exploreItems = [
    { title: "Find Stories", link: "/stories" },
    { title: "Find Paintings", link: "/paintings" },
    { title: "Find Manuscripts", link: "/manuscripts" },
    { title: "Find Archives", link: "/research-tools/maps" },
    { title: "Featured Stories", link: "/stories" },
    { title: "Featured Paintings", link: "/paintings" },
    { title: "Featured Manuscripts", link: "/manuscripts" },
  ];
  const researchToolItems = [
    { title: "Maps", link: "/research/maps" },
    { title: "PEMM Incipit Tool", link: "/research/incipit-tool" },
    { title: "Research & Lessons", link: "/research/research-and-lessons" },
    { title: "List of Repositories", link: "/research/repositories" },
    { title: "Macomber Handlist", link: "/research/macomber" },
    { title: "Ethiopic Terms & Spellings", link: "/research/spellings" },
    { title: "Bibliography", link: "/research/bibliography" },
    { title: "Arabic Manuscripts", link: "/research/manuscripts" },
    { title: "Arabic Stories", link: "/research/arabic-stories" },
  ];
  return (
    <div className="w-auto px-5 py-8 grid bg-primary-500 text-white grid-cols-1 gap-5 sm:grid-cols-3 md:px-8 lg:px-16 lg:gap-5 lg:grid-cols-5">
      <div className=" text-left lg:py-5 md:pr-5 text-sm sm:col-span-3 lg:col-span-2 lg:text-lg lg:max-w-[400px]">
        <Link href="/" className="w-auto max-w-xs lg:w-full block relative">
          <Image
            src={Logo}
            className="mb-3"
            alt="pricenton ethiopian eritrean & egyptian miracles of marry project "
          />
        </Link>
        <p className="pt-4 md:pt-0">
          PEMM is a comprehensive resource for the 1,000+ miracle stories
          written about the Virgin Mary in Ethiopia, Eritrea, and Egypt, and
          preserved in Gǝˁǝz between 1300 and the present.
        </p>
        <div className="py-5 text-sm space-y-2 md:pr-10">
          <p>
            Princeton Department of Comparative Literature 133 East Pyne,
            Princeton, NJ 08540
          </p>
          <p>
            Princeton Department of African American Studies Morrison Hall,
            Princeton, NJ 08540
          </p>
        </div>
        <Link
          href="mailto: pemm@princeton.edu"
          className="text-sm hover:text-secondary-500 "
        >
          pemm@princeton.edu
        </Link>
        <p className="pt-2 text-sm md:pt-5 lg:pt-4">
          © {new Date().getFullYear()} The Trustees of Princeton University
        </p>
      </div>

      <div className="lg:py-5">
        <h2 className="text-lg font-bold lg:text-xl">About</h2>
        <ul className="font-menu text-xl flex flex-col">
          {aboutItems.map((item, index) => (
            <>
              <Link
                href={item.link}
                key={index}
                className="text-base hover:text-secondary-500"
              >
                {item.title}
              </Link>
              {[1, 4, 6, 8].includes(index) && <div className="mt-5" />}
            </>
          ))}
        </ul>
      </div>

      <div className="text-left lg:py-5">
        <h2 className="text-lg font-bold lg:text-xl">Explore</h2>
        <ul className="font-menu text-xl flex flex-col">
          {exploreItems.map((item, index) => (
            <>
              <Link
                href={item.link}
                key={index}
                className="text-base hover:text-secondary-500 transition-colors hover:transition-colors"
              >
                {item.title}
              </Link>
              {[3, 6].includes(index) && <div className="mt-5" />}
            </>
          ))}
        </ul>
      </div>

      <div className="text-left lg:py-5">
        <h2 className="text-lg font-bold lg:text-xl">Research Tools</h2>
        <ul className="font-menu text-xl flex flex-col">
          {researchToolItems.map((item, index) => (
            <>
              <Link
                href={item.link}
                key={index}
                className="text-base hover:text-secondary-500"
              >
                {item.title}
              </Link>
              {[1, 4, 6].includes(index) && <div className="mt-5" />}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
