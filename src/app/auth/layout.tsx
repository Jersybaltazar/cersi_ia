import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();
  if (user) redirect("/");
  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
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
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hola soy un asistente de ventas impulsado por IA,
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          SERSI es capaz de capturar informacion de prospectos sin un formulario
          {""}
          <br />
          algo nunca antes hecho
        </p>
        <Image
          src="/images/Captura.png"
          alt="app image"
          loading="lazy"
          sizes="100vw"
          objectFit="cover"
          className="absolute w-full max-w-[1600px] h-auto top-48 right-0" 
          width={1600}
          height={900}
        />
      </div>
    </div>
  );
};

export default Layout;
