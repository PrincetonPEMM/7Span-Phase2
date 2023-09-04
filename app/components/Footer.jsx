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
    { title: "News & Updates", link: "/about/news" },
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
    { title: "Research Posts", link: "/research/research-posts" },
    { title: "List of Repositories", link: "/research/repositories" },
    { title: "Macomber Handlist", link: "/research/macomber" },
    { title: "Ethiopic Terms & Spellings", link: "/research/spellings" },
    { title: "Bibliography", link: "/research/bibliography" },
    { title: "Arabic Manuscripts", link: "/research/manuscripts" },
    { title: "Arabic Stories", link: "/research/arabic-stories" },
  ];
  return (
    <div className="w-auto p-5 grid bg-primary-500 text-white gap-5 sm:grid-cols-2 md:px-8 md:grid-cols-3 lg:px-16 lg:grid-cols-5">
      <div className="max-w-[400px] text-left md:py-5 col-span-2 text-sm lg:text-lg">
        <Link href="/" className="w-[30%] relative">
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
        <div className="md:py-5 text-sm space-y-2 pr-10">
          <p>
            Princeton Department of Comparative Literature 133 East Pyne,
            Princeton, NJ 08540
          </p>
          <p>
            Princeton Department of African American Studies Morrison Hall,
            Princeton, NJ 08540
          </p>
        </div>
        <Link href="mailto: pemm@princeton.edu" className="py-3 text-sm">
          pemm@princeton.edu
        </Link>
        <p className="pt-4 md:pt-10 text-sm">
          © {new Date().getFullYear()} The Trustees of Princeton University
        </p>
      </div>
      <div className="md:py-5">
        <h2 className="text-lg lg:text-xl font-bold">About</h2>
        <ul className="font-menu text-xl flex flex-col  relative z-20">
          {aboutItems.map((item, index) => (
            <>
              <Link href={item.link} key={index} className="text-base">
                {item.title}
              </Link>
              {[1, 4, 6, 8].includes(index) && <div className="mt-5" />}
            </>
          ))}
        </ul>
      </div>
      <div className="text-left md:py-5">
        <h2 className="text-lg lg:text-xl font-bold">Explore</h2>
        <ul className="font-menu text-xl flex flex-col relative z-20">
          {exploreItems.map((item, index) => (
            <>
              <Link href={item.link} key={index} className="text-base">
                {item.title}
              </Link>
              {[3, 6].includes(index) && <div className="mt-5" />}
            </>
          ))}
        </ul>
      </div>
      <div className="text-left md:py-5">
        <h2 className="text-lg lg:text-xl font-bold">Research Tools</h2>
        <ul className="font-menu text-xl flex flex-col relative z-20">
          {researchToolItems.map((item, index) => (
            <>
              <Link href={item.link} key={index} className="text-base">
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
