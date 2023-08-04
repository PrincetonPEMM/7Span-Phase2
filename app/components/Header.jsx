import React from "react";
import Logo from "../../assets/images/logo-white.png";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const menuItems = [
    { title: "Stories", link: "/" },
    { title: "Paintings", link: "/paintings" },
    { title: "menuscripts", link: "/menuscripts" },
    { title: "Research Tools", link: "/research" },
    { title: "About", link: "/about" },
  ];

  return (
    <div className="hidden lg:flex justify-between items-center px-5  absolute top-16 text-white w-full">
      <a href="javascript:;" className="w-[30%] relative z-20">
        <Image src={Logo} alt="Picture of the author" />
      </a>
      <ul className="font-menu flex items-center relative z-20">
        {menuItems.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="text-2xl p-3 capitalize font-semibold inline-flex"
          >
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Header;
