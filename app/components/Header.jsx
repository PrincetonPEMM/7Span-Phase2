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
    <div className="flex justify-between items-center px-5 pt-6 absolute top-5 text-white w-full">
      <div className="w-1/4 relative z-20">
        <Image src={Logo} alt="Picture of the author" />
      </div>
      <ul className="font-body flex items-center relative z-20">
        {menuItems.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="text-3xl p-3 font-semibold inline-flex"
          >
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Header;
