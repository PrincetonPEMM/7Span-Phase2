import LogoAmh from "@assets/images/logo-white-amh.png";
import Logo from "@assets/images/logo-white.png";
import { cookies } from "next/headers";
import Image from "next/image";

const Loading = () => {
  const lang = cookies().get("lang");
  return (
    <div>
      <div className="flex h-screen w-full items-center justify-center bg-black transition-all fixed inset-0 z-50">
        <div className="flex flex-col items-center space-y-3">
          <Image
            src={lang?.value === "am-et" ? LogoAmh : Logo}
            className="h-auto w-60 animate-pulse md:w-80"
            alt="pricenton ethiopian eritrean & egyptian miracles of marry project "
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
