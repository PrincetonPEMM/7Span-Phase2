"use client";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo-white.png";
import LogoBlack from "../../assets/images/logo-black.png";
import Link from "next/link";
import Image from "next/image";
import MdiMenuIcon from "../../assets/icons/MdiMenuIcon";
import MdiChevronDown from "../../assets/icons/MdiChevronDown";
import MdiClose from "@/assets/icons/MdiClose";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState({});
  const pathname = usePathname();

  const menuItems = [
    { title: "Stories", link: "/stories" },
    {
      title: "Paintings",
      link: "/paintings",
      subItems: [
        { title: "all Paintings", link: "/paintings" },
        { title: "Manuscripts", link: "/menuscripts" },
        { title: "Research Tools", link: "/research" },
      ],
    },
    { title: "Manuscripts", link: "/menuscripts" },
    {
      title: "Research Tools",
      link: "/research",
      subItems: [
        // { title: "Menuscripts", link: "/menuscripts" },
        // { title: "Research Tools", link: "/research" },
        { title: "Arabic Stories", link: "/research/arabic-stories" },
        {
          title: "Interchangeable Spellings of Ethiopic Terms",
          link: "/research/spellings",
        },
        { title: "Arabic Menuscripts", link: "/research/menuscript" },
        { title: "List of Repositories", link: "/research/repositories" },
        { title: "Macomber Handlist", link: "/research/macomber" },
        { title: "Bibliography", link: "/research/bibliography" },
      ],
    },
    {
      title: "About",
      link: "/about",
      subItems: [
        // { title: "Connect", link: "/about/connect" },
      ],
    },
  ];

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <>
      <div
        className={`p-4 lg:p-0 ${
          pathname === "/" ? " bg-transparent text-black" : "bg-background-500"
        }`}
      >
        <div className="w-60 sm:w-full sm:max-w-md block lg:hidden">
          <Link href="/">
            <Image src={LogoBlack} alt="Picture of the author" />
          </Link>
        </div>
        <button
          onClick={menuIconClick}
          className="block h-7 w-7 flex-none p-1 lg:hidden z-40 absolute top-5 right-5"
        >
          {menuCollapse ? (
            <MdiMenuIcon
              className={` ${
                pathname === "/" ? " text-primary-500" : "text-black"
              }`}
            />
          ) : (
            <MdiMenuIcon
              className={` ${
                pathname === "/" ? " text-primary-500" : "text-black"
              }`}
            />
          )}
        </button>
      </div>

      <div
        className={`z-50 justify-between w-72 pt-10 items-center inset-y-0 px-5 fixed lg:w-full transition-transform duration-700 lg:flex lg:bg-background-500 lg:h-auto ${
          menuCollapse
            ? "right-0 translate-x-0 transform "
            : "lg:transform-none translate-x-full -right-80 transform lg:w-auto lg:right-0"
        } ${
          pathname === "/"
            ? "z-40 justify-between pt-10 w-72 items-center inset-y-0 px-5 home-header text-white bg-black transition-transform  lg:top-4 lg:absolute lg:bottom-auto lg:flex lg:bg-transparent lg:h-auto"
            : "lg:relative text-primary-500 py-5 header bg-white lg:bg-background-500 "
        }`}
      >
        {/*Close header */}
        <button
          onClick={() => setMenuCollapse(!menuCollapse)}
          className="absolute top-4 right-4 p-2 inline-flex lg:hidden"
        >
          <MdiClose />
        </button>

        {/* LOGO IMAGE HERE  */}
        <Link href="/" className="sm:w-[30%] mb-5 w-64 relative z-20">
          {pathname === "/" ? (
            <Image src={Logo} alt="Picture of the author" />
          ) : (
            <Image src={LogoBlack} alt="Picture of the author" />
          )}
        </Link>

        {/* MENU LINKS  */}

        <ul className="font-menu lg:flex relative mt-5 lg:mt-0">
          {menuItems.map((item, index) => (
            <li key={index} className="lg:ml-3 xl:ml-6">
              {item.subItems ? (
                <div className="group capitalize relative">
                  <button
                    className="text-lg xl:text-2xl p-3 font-semibold flex items-center"
                    onClick={() => toggleSubmenu(index)}
                  >
                    <span>{item.title}</span>
                    <MdiChevronDown
                      className={`h-5 w-5 ml-2 transition-transform transform inline-flex lg:hidden ${
                        activeSubmenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <ul
                    className={`lg:absolute lg:top-10 lg:inset-x-0 transition-all lg:right-0 lg:left-auto lg:min-w-max z-50 lg:py-2 lg:bg-white rounded-md top-0 text-white lg:text-black mt-1 space-y-1 ${
                      activeSubmenu === index ? "block z-50" : "hidden"
                    }`}
                    // lg:group-hover:block lg:group-hover:transiton-all
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.link}
                          className="text-base header-link font-normal transition-all flex py-1 lg:text-black lg:hover:bg-secondary-500 pl-8 lg:p-2"
                          onClick={() => {
                            redirect(subItem.link);

                            setActiveSubmenu(null);
                          }}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.link}
                  className="text-lg xl:text-2xl p-3 capitalize font-semibold inline-flex header-link"
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
