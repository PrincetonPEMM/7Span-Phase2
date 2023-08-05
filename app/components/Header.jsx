"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo-white.png";
import Link from "next/link";
import Image from "next/image";
import MdiMenuIcon from "../../assets/icons/MdiMenuIcon";
import MdiChevronDown from "../../assets/icons/MdiChevronDown";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState({});

  const menuItems = [
    { title: "Stories", link: "/" },

    {
      title: "Paintings",
      link: "/paintings",

      subItems: [
        { title: "all Paintings", link: "/paintings" },
        { title: "Menuscripts", link: "/menuscripts" },
        { title: "Research Tools", link: "/research" },
      ],
    },

    { title: "menuscripts", link: "/menuscripts" },
    {
      title: "Research Tools",
      link: "/research",
      subItems: [
        { title: "Paintings", link: "/paintings" },
        { title: "Menuscripts", link: "/menuscripts" },
        { title: "Research Tools", link: "/research" },
      ],
    },
    {
      title: "About",
      link: "/about",
      subItems: [
        { title: "Paintings", link: "/paintings" },
        { title: "Menuscripts", link: "/menuscripts" },
        { title: "Research Tools", link: "/research" },
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
      <button
        onClick={menuIconClick}
        className="block h-7 w-7 flex-none p-1 lg:hidden z-40 absolute top-5 left-5"
      >
        {menuCollapse ? (
          <MdiMenuIcon className="text-white" />
        ) : (
          <MdiMenuIcon />
        )}
      </button>
      <div
        className={`z-40 justify-between pt-20 w-72 items-center inset-y-0 px-5 fixed lg:w-full text-white bg-black transition-transform duration-700 lg:top-10 lg:absolute lg:bottom-auto lg:flex lg:bg-transparent lg:h-auto ${
          menuCollapse
            ? "transform translate-x-0 "
            : "transform -translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO IMAGE HERE  */}
        <a href="#" className="lg:w-[30%] mb-5 w-64 relative z-20">
          <Image src={Logo} alt="Picture of the author" />
        </a>

        {/* MENU LINKS  */}

        <ul className="font-menu lg:flex relative z-20 mt-5 lg:mt-0">
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
                    className={`lg:absolute lg:top-10 lg:inset-x-0 transition-all lg:py-2 lg:bg-white rounded-sm top-0 lg:group-hover:block lg:group-hover:transiton-all text-white mt-1 space-y-1 ${
                      activeSubmenu === index ? "block" : "hidden"
                    }`}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={subItem.link}
                          className="text-base font-normal transition-all flex py-1 lg:text-black lg:hover:bg-secondary-500 pl-8 lg:p-2"
                        >
                          {subItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.link}
                  className="text-lg xl:text-2xl p-3 capitalize font-semibold inline-flex"
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
