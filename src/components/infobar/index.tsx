'use client'
import React from "react";
import BreadCrumb from "./bread-crumb";
import {  Star, Trash } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback,AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/clerk-react";

type Props = {};

const Infobar = (props: Props) => {
  const {user} = useUser();
  return (
    <div className="flex w-full justify-between items-center py-1 mb-8 px-4 md:px-8">
      <BreadCrumb />
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="Use Avatar"></AvatarImage>
        <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
        </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Infobar;
