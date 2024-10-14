"use client";
import Image from "next/image";

const Header = () => {
  return (
    <header className="">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm">
        <p className="text-white/60 hidden md:block">
          Optimice su flujo de trabajo y aumente su productividad   {''}    
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>&nbsp;&nbsp;Comienza ahora Gratis!</p>
          <span className="h-6 w-6 inline-flex justify-center items-center">
          <Image
            src="/svg/arrow-right.svg"
            alt="Arrow"
            sizes="100vw"
            width={500}
            height={500}
          />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
