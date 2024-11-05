import React from "react";
import Image from "next/image";
import BotIconImage from "../../public/svg/1.svg";
export const BotIcon = () => {
  return <BotIconImage src={BotIconImage} alt="Bot Icon" width="55" height="47" />;
};
