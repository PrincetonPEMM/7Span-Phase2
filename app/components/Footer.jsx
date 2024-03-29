"use client";
import Fa6BrandsXTwitter from "@/assets/icons/Fa6BrandsXTwitter";
import IconoirTiktok from "@/assets/icons/IconoirTiktok";
import MdiInstagram from "@/assets/icons/MdiInstagram";
import MingcuteFacebookLine from "@/assets/icons/MingcuteFacebookLine";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../assets/images/logo-footer.png";

const Footer = () => {
  const pathname = usePathname();
  const aboutItems = [
    { title: "Our Mission", link: "/about/mission" },
    { title: "Our History", link: "/about/mission#our-history" },
    { title: "Our Team", link: "/about/people" },
    { title: "Our Partners", link: "/about/people#our-partners" },
    { title: "Our Funders", link: "/about/people#our-funders" },
    { title: "News & Updates", link: "/about/news-and-updates" },
    { title: "Events & Workshops", link: "/about/events-and-workshops" },
    {
      title: "Accessibility",
      link: "https://accessibility.princeton.edu/help",
      LinkTarget: "_blank",
    },
    { title: "Using the Site", link: "/about/connect/using-the-site" },
    { title: "Contact Us", link: "/about/connect/contact-us" },
  ];
  const exploreItems = [
    { title: "Find Stories", link: "/stories" },
    { title: "Find Paintings", link: "/paintings" },
    { title: "Find Manuscripts", link: "/manuscripts" },
    { title: "Find Archives", link: "/research/repositories" },
    {
      title: "Featured Stories",
      link: "/#featured-stories",
      label: "featured-stories",
    },
    {
      title: "Featured Paintings",
      link: "/#featured-paintings",
      label: "featured-paintings",
    },
    {
      title: "Featured Manuscripts",
      link: "/#featured-manuscripts",
      label: "featured-manuscripts",
    },
  ];
  const researchToolItems = [
    { title: "Maps", link: "/research/maps" },
    { title: "PEMM Incipit Tool", link: "/research/incipit-tool" },
    { title: "Research & Lessons", link: "/research/research-and-lessons" },
    { title: "Teaching with PEMM", link: "/research/teaching-with-pemm" },
    { title: "List of Repositories", link: "/research/repositories" },
    { title: "Macomber Handlist", link: "/research/macomber" },
    { title: "Ethiopic Terms & Spellings", link: "/research/spellings" },
    { title: "Bibliography", link: "/research/bibliography" },
    // { title: "Arabic Manuscripts", link: "/research/arabic-manuscripts" },
    // { title: "Arabic Stories", link: "/research/arabic-stories" },
  ];
  return (
    <div className="bg-primary-500 px-5 py-12 md:px-8 lg:px-16">
      <div className="w-auto grid text-white font-body grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-5 lg:grid-cols-5">
        <div className="text-left md:py-0 py-5 text-sm md:pr-5 sm:col-span-3 lg:col-span-2 lg:text-lg lg:max-w-[400px]">
          <div>
            <Link href="/" className="w-auto max-w-xs lg:w-full block relative">
              <Image
                src={Logo}
                className="mb-3"
                alt="pricenton ethiopian eritrean & egyptian miracles of marry project"
              />
            </Link>

            <p className="pt-4 block md:pt-4">
              The Princeton Ethiopian, Eritrean, and Egyptian Miracles of Mary
              (PEMM) project is a comprehensive resource for the 1,000+ miracle
              stories written about and the 2,500+ images painted of the Virgin
              Mary in these African countries, and preserved in Geʿez between
              1300 and the present.
            </p>
          </div>
          <div className="pt-5 text-sm space-y-4 md:pr-10">
            <p>
              Princeton Department of Comparative Literature 133 East Pyne,
              Princeton, NJ 08540
            </p>
            <p>
              Princeton Department of African American Studies Morrison Hall,
              Princeton, NJ 08540
            </p>
          </div>
        </div>

        <div className="text-left py-5 md:py-0">
          <h2 className="text-lg font-bold mb-3 lg:text-xl">Explore</h2>
          <ul className="font-body text-xl flex flex-col">
            {exploreItems.map((item, index) => (
              <li key={index}>
                {pathname !== "/" || !item.label ? (
                  <Link
                    href={item.link}
                    key={index}
                    className="text-base hover:text-secondary-500 font-normal transition-colors hover:transition-colors"
                  >
                    {item.title}
                    {[3, 6].includes(index) && <span className="mt-5 block" />}
                  </Link>
                ) : (
                  <label
                    htmlFor={item.label}
                    key={index}
                    className="text-base hover:text-secondary-500 font-normal transition-colors hover:transition-colors"
                  >
                    {item.title}
                    {[3, 6].includes(index) && <span className="mt-5 block" />}
                  </label>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-left md:py-0 py-5">
          <h2 className="text-lg font-bold mb-3 lg:text-xl">Research Tools</h2>
          <ul className="font-body text-xl flex flex-col">
            {researchToolItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  key={index}
                  className="text-base hover:text-secondary-500 font-normal"
                >
                  {item.title}
                </Link>
                {[1, 5].includes(index) && <span className="mt-5 block" />}
              </li>
            ))}
          </ul>
        </div>

        <div className="py-5 md:py-0">
          <h2 className="text-lg font-bold mb-3 lg:text-xl">About</h2>
          <ul className="font-body text-xl flex flex-col">
            {aboutItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  key={index}
                  className="text-base hover:text-secondary-500 font-normal"
                >
                  {item.title}
                </Link>
                {[1, 4, 6].includes(index) && <span className="mt-5 block" />}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 flex flex-col-reverse sm:w-auto sm:grid text-white sm:items-end sm:gap-5 sm:grid-cols-3 lg:gap-5 lg:grid-cols-5">
        <div className="sm:col-span-2 md:col-span-2 lg:col-span-4">
          <Link
            href="mailto: pemm@princeton.edu"
            target="_blank"
            className="text-sm hover:text-secondary-500 transition-colors font-light hover:transition-colors"
          >
            pemm@princeton.edu
          </Link>
          <p className="pt-1 text-sm font-light">
            © {new Date().getFullYear()} The Trustees of Princeton University
          </p>
        </div>

        <div className="flex items-start space-x-5 pb-3 sm:pb-0 xl:space-x-10">
          <Link
            href="https://www.facebook.com/pemmaryam"
            className="w-6 h-6 group"
            title="Facebook"
            target="_blank"
          >
            <MingcuteFacebookLine className="text-white group-hover:text-secondary-500 group-hover:transition-colors" />
          </Link>
          <Link
            href="https://www.instagram.com/pemmaryam/?igshid=NzZlODBkYWE4Ng%3D%3D"
            className="w-6 h-6 group"
            title="Instagram"
            target="_blank"
          >
            <MdiInstagram className="text-white group-hover:text-secondary-500 group-hover:transition-colors" />
          </Link>
          <Link
            href="#"
            className="w-6 h-6 group transition-colors"
            title="TikTok"
            target="_blank"
          >
            <IconoirTiktok className="text-white group-hover:text-secondary-500 group-hover:transition-colors" />
          </Link>
          {/* <Link href="@pemmaryam" className="w-6 h-6 group transition-colors">
            <IconoirTiktok className="text-white group-hover:text-secondary-500 group-hover:transition-colors" />
          </Link> */}
          <Link
            href="https://twitter.com/pemmaryam"
            className="w-6 h-6 group"
            title="Twitter"
            target="_blank"
          >
            <Fa6BrandsXTwitter className="text-white group-hover:text-secondary-500 group-hover:transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
