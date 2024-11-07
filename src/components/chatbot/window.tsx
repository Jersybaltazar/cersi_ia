import { ChatBotMessageProps } from "@/schemas/conversation.schema";
import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RealTimeMode from "./real-time";
import Image from "next/image";
import TabsMenu from "../tabs/intex";
import { BOT_TABS_MENU } from "@/constants/menu";
import ChatIcon from "@/icons/chat-icon";
import { TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import Bubble from "./bubble";
import { Responding } from "./responding";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Paperclip, Send } from "lucide-react";
import { Label } from "../ui/label";
import { CardDescription, CardTitle } from "../ui/card";
import Accordion from "../accordian";
import UploadButton from "../upload-button";

type Props = {
  errors: any;
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: "assistant" | "user"; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  helpdesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
  icon?: string | null;
};

export const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode,
      setChat,
      textColor,
      theme,
      help,
      icon,
    },
    ref
  ) => {
    return (
      <div className="min-h-[500px] w-full max-w-[400px] sm:max-w-[300px] flex flex-col bg-white rounded-xl border-[1px] overflow-hidden px-3 xs:px-10 py-2 sm:py-3">
        {" "}
        <div className="flex justify-between px-10">
          <div className="flex gap-2 items-start">
            <div className="min-w-[60px] w-[60px] h-[60px] sm:w-20 sm:h-20 relative">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={
                    icon
                      ? `https://ucarecdn.com/${icon}/` // Cargamos el icono dinámicamente
                      : "https://ucarecdn.com/d24c6b73-55cb-466c-b08f-0cc49c6ce0ec/124599" // Fallback en caso de que el icono sea null
                  }
                  alt="Icono del Dominio"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-base sm:text-lg font-bold leading-tight text-black">
                Representante de ventas en:
              </h3>
              <p className="text-sm text-black">{domainName.split(".com")[0]}</p>
              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>
        </div>
        <TabsMenu
          triggers={BOT_TABS_MENU}
          className=" bg-transparent border-[1px] border-border m-2"
        >
          <TabsContent value="chat">
            <Separator orientation="horizontal" />
            <div className="flex flex-col h-full">
              <div
                style={{
                  background: theme || "",
                  color: textColor || "",
                }}
                className="px-3 flex h-[350px] sm:h-[400px] flex-col py-5 gap-3 chat-window overflow-y-auto"
                ref={ref}
              >
                {chats.map((chat, key) => (
                  <Bubble key={key} message={chat} domainIcon={icon} />
                ))}
                {onResponding && <Responding domainIcon={icon} />}
              </div>
              <form
                onSubmit={onChat}
                className="flex px-3 py-1 flex-col flex-1 bg-porcelain"
              >
                <div className="flex justify-between">
                  <Input
                    {...register("content")}
                    placeholder="Escribe tu mensaje..."
                    className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-porcelain rounded-none outline-none border-none text-black"
                  />
                  <Button type="submit" className="mt-3">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <Label htmlFor="bot-image">
                  <Paperclip />
                  <Input
                    {...register("image")}
                    type="file"
                    id="bot-image"
                    className="hidden"
                  />
                </Label>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="servicio de asistencia">
            <div className="h-[400px] sm:h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle>Servicio de Asistencia</CardTitle>
                <CardDescription>
                  Explorar desde una lista de preguntas que las personas suelen
                  hacer
                </CardDescription>
              </div>
              <Separator orientation="horizontal" />

              {helpdesk.map((desk) => (
                <Accordion
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
        <div className="flex justify-center py-1">
          <p className="text-gray-400 text-xs">SERSI-IA</p>
        </div>
      </div>
    );
  }
);

BotWindow.displayName = "BotWindow";
