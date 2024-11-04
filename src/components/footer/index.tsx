import React from "react";
import Logo from "../../../public/svg/Logo.svg";
import XSocial from "../../../public/svg/social-x.svg";
import InstaSocial from "../../../public/svg/social-instagram.svg";
import YtSocial from "../../../public/svg/social-youtube.svg";
import Image from "next/image";

type Props = {};

const index = (props: Props) => {
    
  return (
      <footer className="py-5 border-t border-white/15">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-8 ">
          <div className="flex gap-2 items-center lg:flex-1">
            <Logo src={Logo} alt="Logo" className="h-6 w-6" />
            <div className="font-medium">SERSI-AI</div>
          </div>

          <nav className="flex flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1">
            <a
              href=""
              className="text-gray-800 dark:text-white/70 hover:text-black dark:hover:text-white text-xs md:text-sm transition"

            >
              Características
            </a>
            <a
              href=""
              className="text-gray-800 dark:text-white/70 hover:text-black dark:hover:text-white text-xs md:text-sm transition"

            >
              Desarrolladores
            </a>
            <a
              href=""
              className="text-gray-800 dark:text-white/70 hover:text-black dark:hover:text-white text-xs md:text-sm transition"

            >
              Empresa
            </a>
            <a
              href=""
              className="text-gray-800 dark:text-white/70 hover:text-black dark:hover:text-white text-xs md:text-sm transition"
              >
              Blog
            </a>
            <a
              href=""
              className="text-gray-800 dark:text-white/70 hover:text-black dark:hover:text-white text-xs md:text-sm transition"
              >
              Empresa
            </a>
          </nav>

          <div className="flex gap-5 lg:flex-1 lg:justify-end">
          <XSocial className="w-6 h-6 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition" />
            <InstaSocial className="w-6 h-6 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition" />
            <YtSocial className="w-6 h-6 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default index;
