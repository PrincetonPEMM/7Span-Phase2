"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo-white.png";
import LogoBlack from "../../assets/images/logo-black.png";
import Link from "next/link";
import Image from "next/image";
import MdiMenuIcon from "../../assets/icons/MdiMenuIcon";
import MdiChevronDown from "../../assets/icons/MdiChevronDown";
import MdiClose from "@/assets/icons/MdiClose";
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    setActiveSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    if (menuCollapse) {
      document.body.classList.add("sidebar_open");
      document.body.classList.remove("sidebar_close");
      document.body.classList.remove("filter_open");
      document.body.classList.remove("filter_close");
    } else {
      document.body.classList.add("sidebar_close");
      document.body.classList.remove("sidebar_open");
      document.body.classList.remove("filter_open");
      document.body.classList.remove("filter_close");
    }
  }, [menuCollapse]);

  const menuItems = [
    { title: "Stories", link: "/stories" },
    {
      title: "Paintings",
      link: "/paintings",
      subItems: [
        { title: "All Paintings", link: "/paintings" },
        { title: "Paintings by Story", link: "/paintings/by-story" },
        { title: "Paintings by Manuscript", link: "/paintings/by-manuscript" },
      ],
    },
    { title: "Manuscripts", link: "/manuscripts" },
    {
      title: "Research Tools",
      link: "/research",
      subItems: [
        // { title: "Manuscripts", link: "/manuscripts" },
        { title: "Maps", link: "/research/maps" },
        { title: "Incipit Tool", link: "/research/incipit-tool" },
        { title: "Research & Lessons", link: "/research/research-and-lessons" },
        { title: "List of Repositories", link: "/research/repositories" },
        { title: "Macomber Handlist", link: "/research/macomber" },
        { title: "Ethiopic Terms & Spellings", link: "/research/spellings" },
        { title: "Bibliography", link: "/research/bibliography" },
        { title: "Arabic Manuscripts", link: "/research/arabic-manuscripts" },
        { title: "Arabic Stories", link: "/research/arabic-stories" },
      ],
    },
    {
      title: "About",
      link: "/about",
      subItems: [
        {
          title: "Our Mission",
          link: "/about/mission#our-mission",
        },
        {
          title: "Our History",
          link: "/about/mission#our-history",
        },
        {
          title: "Our Team",
          link: "/about/people#our-team",
        },
        {
          title: "Our Partners",
          link: "/about/people#our-partners",
        },
        {
          title: "Our Funders",
          link: "/about/people#our-funders",
        },
        {
          title: "News & Updates",
          link: "/about/news-and-updates",
        },
        {
          title: "Events & Workshops",
          link: "/about/events-and-workshops",
        },
        {
          title: "Using the Site",
          link: "/about/connect/using-the-site",
        },
        {
          title: "Contact Us",
          link: "/about/connect/contact-us",
        },
      ],
    },
  ];

  const menuIconClick = () => {
    if (window.innerWidth < 1024) setMenuCollapse(!menuCollapse);
  };

  // const isSubmenuOpen = (index) => {
  //   console.log(activeSubmenu === index);
  //   return activeSubmenu === index;
  // };

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  // const toggleSubmenu = (index) => {
  //   if (window.innerWidth < 1024) {
  //     setActiveSubmenu(activeSubmenu === index ? null : index);
  //   }
  // };
  // window.addEventListener("resize", toggleSubmenu);

  return (
    <>
      <div
        className={`p-4 lg:p-0 ${
          pathname === "/"
            ? " bg-transparent text-black absolute top-0 inset-x-0 z-40"
            : "bg-offWhite-500"
        }`}
      >
        <Link href="/" className="w-60 block sm:w-full sm:max-w-md lg:hidden">
          {pathname === "/" ? (
            <Image
              src={Logo}
              alt="Princeton Ethiopian, Eritrean & Egyptian Miracles of Mary Project Logo"
            />
          ) : (
            <Image
              src={LogoBlack}
              alt="Princeton Ethiopian, Eritrean & Egyptian Miracles of Mary Project Logo"
            />
          )}
        </Link>
        <button
          onClick={menuIconClick}
          // aria-expanded={menuCollapse}
          aria-label={
            menuCollapse ? "Menu button expanded " : "Menu button hidden"
          }
          className="block h-7 w-7 flex-none p-1 z-40 absolute top-5 right-5 lg:hidden"
        >
          {menuCollapse ? (
            <MdiMenuIcon
              className={` ${pathname === "/" ? " text-white" : "text-black"}`}
            />
          ) : (
            <MdiMenuIcon
              className={` ${pathname === "/" ? " text-white" : "text-black"}`}
            />
          )}
        </button>
      </div>

      <OutsideClickHandler
        onOutsideClick={() => {
          setMenuCollapse(false);
        }}
      >
        <div
          className={`z-50 justify-between w-72 pt-10 items-center inset-y-0 px-5 fixed transition-transform duration-700 lg:w-full lg:flex lg:bg-offWhite-500 lg:h-auto ${
            menuCollapse
              ? "right-0 translate-x-0 transform "
              : "lg:transform-none translate-x-full -right-80 transform lg:w-auto lg:right-0"
          } ${
            pathname === "/"
              ? "z-40 justify-between pt-10 w-72 items-center inset-y-0 px-5 home-header text-white bg-black transition-transform lg:top-4 lg:absolute lg:bottom-auto lg:flex lg:bg-transparent lg:h-auto"
              : "lg:relative  py-5 header bg-white lg:bg-offWhite-500 "
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
          <Link href="/" className="w-64 relative z-20 sm:w-[30%]">
            {pathname === "/" ? (
              <Image
                src={Logo}
                alt="pricenton ethiopian eritrean & egyptian miracles of marry project "
              />
            ) : (
              <Image
                src={LogoBlack}
                alt="pricenton ethiopian eritrean & egyptian miracles of marry project "
              />
            )}
          </Link>

          {/* MENU LINKS  */}
          <OutsideClickHandler
            onOutsideClick={() => {
              setActiveSubmenu(null);
            }}
          >
            <ul className="font-menu relative mt-5 lg:mt-0 lg:flex">
              {menuItems.map((item, index) => {
                return (
                  <li key={index} className="lg:ml-3 xl:ml-6">
                    {item.subItems ? (
                      <div
                        className="group relative"
                        onMouseEnter={() => setActiveSubmenu(index)}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        <button
                          className={`p-1 font-semibold flex items-center lg:px-3 lg:pointer-events-none lg:py-0 lg:hover:text-secondary-500 text-lg xl:text-2xl ${
                            pathname.includes(item.link)
                              ? "text-secondary-500"
                              : pathname === "/"
                              ? " text-white hover:text-secondary-500"
                              : " text-primary-500  "
                          }`}
                          onClick={() => toggleSubmenu(index)}
                          aria-expanded={
                            index == activeSubmenu
                              ? "submenu open"
                              : "submenu close"
                          }
                        >
                          <span>{item.title}</span>
                          <MdiChevronDown
                            className={`h-5 w-5 ml-2 transition-transform transform inline-flex lg:hidden ${
                              activeSubmenu === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <ul
                          className={`submenu rounded-md top-0 text-white  transition-all  space-y-1 lg:absolute z-50 lg:top-9 lg:inset-x-0 lg:right-0 lg:left-auto lg:min-w-max  
                          lg:group:hover:block lg:py-2 lg:bg-white lg:text-black lg:hover:bg-secondary-500mt-1  ${
                            activeSubmenu === index
                              ? "group:hover:block block z-50 "
                              : "hidden"
                          }`}
                          // lg:group-hover:block lg:group-hover:transiton-all
                        >
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.link}
                                className={`header-link transition-all  flex py-1 text-lg p-1 text-primary-500 lg:hover:bg-secondary-500 lg:px-3 lg:py-0  xl:text-base${
                                  pathname === "/"
                                    ? " text-white hover:text-secondary-500 lg:hover:text-primary-500 lg:text-primary-500"
                                    : " text-primary-500  "
                                }`}
                                onClick={() => {
                                  setActiveSubmenu(null);
                                  // redirect(subItem.link);
                                  setMenuCollapse(false);
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
                        onClick={() => setMenuCollapse(false)}
                        href={item.link}
                        className={`header-link transition-all flex py-1 p-1 font-bold text-lg xl:text-2xl lg:px-3 lg:py-0 lg:hover:text-secondary-500 ${
                          pathname.includes(item.link)
                            ? "text-secondary-500"
                            : pathname === "/"
                            ? " text-white hover:text-secondary-500"
                            : " text-primary-500  "
                        } `}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </OutsideClickHandler>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default Header;
