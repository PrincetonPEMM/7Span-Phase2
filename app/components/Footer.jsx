import Image from "next/image";
import Logo from "../../assets/images/logo-white.png";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const aboutItems = [
    { title: "Our Mission", link: "/about/mission" },
    { title: "Our Team", link: "/about/people" },
    { title: "Our Partners", link: "/about/people" },
    { title: "Our History", link: "/about/mission" },
    { title: "Media Coverage", link: "/about/people" },
    { title: "Project Updates", link: "/about/connect" },
    { title: "Events & Workshops", link: "/about/connect" },
    { title: "Volunteers", link: "/about/connect" },
    { title: "Give Feedback", link: "/about/connect" },
  ];
  const exploreItems = [
    { title: "Find Stories", link: "/stories" },
    { title: "Find Paintings", link: "/paintings" },
    { title: "Find Manuscripts", link: "/manuscripts" },
    { title: "Featured Stories", link: "/stories" },
    { title: "Featured Paintings", link: "/paintings" },
    { title: "Featured Manuscripts", link: "/manuscripts" },
    { title: "Learn More", link: "/" },
  ];
  const researchToolItems = [
    { title: "PEMM Incipit Tool", link: "/" },
    { title: "Research Posts", link: "/research/research-posts" },
    { title: "List of Repositories", link: "/research/repositories" },
    { title: "Bibliography", link: "/" },
    { title: "Using the Site", link: "/" },
  ];
  return (
    <div className="w-auto p-5 grid bg-primary-500 text-white gap-5 sm:grid-cols-2 md:px-8 md:grid-cols-3 lg:px-16 lg:grid-cols-5">
      <div className="max-w-[400px] text-left md:p-5 col-span-2 text-sm lg:text-lg">
        <a href="#" className="w-[30%]  relative z-20">
          <Image src={Logo} alt="Picture of the author" className="my-3" />
        </a>
        <p className="">
          PEMM is a comprehensive resource for the 1,000+ miracle stories
          written about the Virgin Mary in Ethiopia, Eritrea, and Egypt, and
          preserved in Gaaz between 1300 and the present.
        </p>
        <p className="py-5">
          Princeton Department of Comparative Literature 133 East Pyne,
          Princeton, NJ 08540 Princeton Department of African American Studies
          123 West Pyne, Princeton, NJ 08540
        </p>
        <Link href="mailto: pemm@princeton.edu" className="py-3">
          pemm@princeton.edu
        </Link>
        <p className="pt-10">
          © {new Date().getFullYear()} The Trustees of Princeton University
        </p>
      </div>
      <div className="py-5">
        <h2 className="text-lg lg:text-xl font-bold">About</h2>
        <ul className="font-menu text-xl flex flex-col  relative z-20">
          {aboutItems.map((item, index) => (
            <>
              <Link href={item.link} key={index} className="text-base">
                {item.title}
              </Link>
              {[3, 6].includes(index) && <div className="mt-5" />}
            </>
          ))}
        </ul>
      </div>
      <div className="text-left py-5">
        <h2 className="text-lg lg:text-xl font-bold">Explore</h2>
        <ul className="font-menu text-xl flex flex-col relative z-20">
          {exploreItems.map((item, index) => (
            <>
              <Link href={item.link} key={index} className="text-base">
                {item.title}
              </Link>
              {[2, 5].includes(index) && <div className="mt-5" />}
            </>
          ))}
        </ul>
      </div>
      <div className="text-left py-5">
        <h2 className="text-lg lg:text-xl font-bold">Research Tools</h2>
        <ul className="font-menu text-xl flex flex-col relative z-20">
          {researchToolItems.map((item, index) => (
            <>
              <Link href={item.link} key={index} className="text-base">
                {item.title}
              </Link>
              {[0, 3, 4].includes(index) && <div className="mt-5" />}
            </>
          ))}
          <Link href="/" className="mt-8 text-base font-bold">
            PEMM Github Repository terms of Use & Copyright Accessibility
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
