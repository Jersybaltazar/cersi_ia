import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
type Props = {
  domainIcon?: string | null;
};

export const Responding = ({ domainIcon }: Props) => {
  return (
    <div className="self-start flex items-end gap-3">
      <Avatar className="w-5 h-5">
        <AvatarImage
          src={
            domainIcon // Usamos el icono del dominio dinámicamente
              ? `https://ucarecdn.com/${domainIcon}/`
              : "https://ucarecdn.com/d24c6b73-55cb-466c-b08f-0cc49c6ce0ec/124599" // Fallback en caso de que no haya icono
          }
          alt="icono del dominio"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="chat-bubble">
        <div className="typing">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};
