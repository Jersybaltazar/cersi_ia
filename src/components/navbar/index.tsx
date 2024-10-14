import * as React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import Header from "@/components/header";
function NavBar() {
  return (
    <>
      <Header />
      <div className="sticky top-0 backdrop-blur-sm flex gap-8 justify-between items-center px-10 py-3 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5">
        <div className="flex gap-1.5 items-center justify-between self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
          <Image
            src="/svg/Logo.svg"
            alt="LOGO"
            sizes="100vw"
            style={{
              width: "50px",
              height: "auto",
              padding: 3,
            }}
            width={0}
            height={0}
          />
        </div>

        <ul className="justifify-between self-stretch my-auto text-sm leading-5 text-neutral-500 max-md:flex-wrap max-md:max-w-full font-normal gap-8 hidden md:flex text-black/60 items-center">
          <li className="hover:text-[#2A82D1] transition-colors duration-300 ease-in-out cursor-pointer">
            Inicio
          </li>
          <li className="hover:text-[#2A82D1] transition-colors duration-300 ease-in-out cursor-pointer">
            Precios
          </li>
          <li className="hover:text-[#2A82D1] transition-colors duration-300 ease-in-out cursor-pointer">
            Noticias
          </li>
          <li className="hover:text-[#2A82D1] transition-colors duration-300 ease-in-out cursor-pointer">
            Caracteristicas
          </li>
          <li className="hover:text-[#2A82D1] transition-colors duration-300 ease-in-out cursor-pointer">
            Contactenos
          </li>
          <Link
            href="/dashboard"
            className="bg-purple-900 px-5 py-3 rounded-md text-white font-semibold inline-flex items-center justify-center tracking-tight hover:bg-purple-800 transition-all duration-300 ease-in-out shadow-lg"
          >
            Explorar
          </Link>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
