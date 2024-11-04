import { onAiChatBotAssistant, onGetCurrentChatBot } from "@/actions/bot";
import { postToParent, pusherClient } from "@/lib/utils";
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
} from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { UploadClient } from "@uploadcare/upload-client";

import { useForm } from "react-hook-form";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

export const useChatBot = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
  });
  const [currentBot, setCurrentBot] = useState<
    | {
        name: string;
        chatBot: {
          id: string;
          icon: string | null;
          welcomeMessage: string | null;
          background: string | null;
          textColor: string | null;
          helpdesk: boolean;
        } | null;
        helpdesk: {
          id: string;
          question: string;
          answer: string;
          domainId: string | null;
        }[];
        icon:string;
      }
    | undefined
  >();
  const messageWindowRef = useRef<HTMLDivElement | null>(null);
  const [botOpened, setBotOpened] = useState<boolean>(false);
  const onOpenChatBot = () => setBotOpened((prev) => !prev);
  const [loading, setLoading] = useState<boolean>(true);
  const [onChats, setOnChats] = useState<
    { role: "assistant" | "user"; content: string; link?: string }[]
  >([]);
  const [onAiTyping, setOnAiTyping] = useState<boolean>(false);
  const [currentBotId, setCurrentBotId] = useState<string>();
  const [onRealTime, setOnRealTime] = useState<
    { chatroom: string; mode: boolean } | undefined
  >(undefined);

  const onScrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    onScrollToBottom();
  }, [onChats, messageWindowRef]);

  useEffect(() => {
    postToParent(
      JSON.stringify({
        width: botOpened ? 400 : 80,
        height: botOpened ? 700 : 80,
      })
    );
  }, [botOpened]);

  let limitRequest = 0;

  const onGetDomainChatBot = async (id: string) => {
    setCurrentBotId(id);
    const chatbot = await onGetCurrentChatBot(id);
    if (chatbot) {
      setOnChats((prev) => [
        ...prev,
        {
          role: "assistant",
          content: chatbot.chatBot?.welcomeMessage!,
        },
      ]);
      setCurrentBot(chatbot);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("message", (e) => {
      console.log(e.data);
      const botid = e.data;
      if (limitRequest < 1 && typeof botid == "string") {
        onGetDomainChatBot(botid);
        limitRequest++;
      }
    });
  }, []);

  const onStartChatting = handleSubmit(async (values) => {
    console.log("ALL VALUES", values);

    if (values.image.length) {
      console.log("IMAGE fROM ", values.image[0]);
      const uploaded = await upload.uploadFile(values.image[0]);
      if (!onRealTime?.mode) {
        setOnChats((prev: any) => [
          ...prev,
          {
            role: "user",
            content: uploaded.uuid,
          },
        ]);
      }
      console.log('onRealTime:', onRealTime);
      console.log("🟡 RESPONSE FROM UC", uploaded.uuid);
      setOnAiTyping(true);
      const response = await onAiChatBotAssistant(
        currentBotId!,
        onChats,
        "user",
        uploaded.uuid
      );

      if (response) {
        setOnAiTyping(false);
        if (response.live) {
          setOnRealTime((prev) => ({
            ...prev,
            chatroom: response.chatRoom,
            mode: response.live,
          }));
        } else {
          setOnChats((prev: any) => [...prev, response.response]);
        }
      }
    }
    reset();

    if (values.content) {
      if (!onRealTime?.mode) {
        setOnChats((prev: any) => [
          ...prev,
          {
            role: "user",
            content: values.content,
          },
        ]);
      }

      setOnAiTyping(true);

      const response = await onAiChatBotAssistant(
        currentBotId!,
        onChats,
        "user",
        values.content
      );

      if (response) {
        setOnAiTyping(false);
        if (response.live) {
          setOnRealTime((prev) => ({
            ...prev,
            chatroom: response.chatRoom,
            mode: response.live,
          }));
        } else {
          setOnChats((prev: any) => [...prev, response.response]);
        }
      }
    }
  });
  useEffect(() => {
    if (onRealTime?.chatroom) {
      // Suscribirse al canal del chatroom
      pusherClient.subscribe(onRealTime.chatroom);

      // Escuchar el evento 'realtime-mode-updated' para cambios en el modo en tiempo real
      pusherClient.bind("realtime-mode-updated", (data: any) => {
        if (!data.live) {
          // El modo en tiempo real se ha desactivado
          setOnRealTime(undefined);
          // Opcional: notificar al usuario que el chat en tiempo real ha finalizado
        } else {
          // El modo en tiempo real sigue activo
          setOnRealTime((prev) => ({
            ...prev!,
            mode: data.live,
          }));
        }
      });

      // Escuchar mensajes en tiempo real
      pusherClient.bind("realtime-mode", (data: any) => {
        setOnChats((prev) => [
          ...prev,
          {
            role: data.chat.role,
            content: data.chat.message,
          },
        ]);
      });

      return () => {
        // Limpiar suscripciones
        pusherClient.unbind("realtime-mode-updated");
        pusherClient.unbind("realtime-mode");
        pusherClient.unsubscribe(onRealTime.chatroom);
      };
    }
  }, [onRealTime?.chatroom]);

  return {
    botOpened,
    onOpenChatBot,
    onStartChatting,
    onChats,
    register,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    setOnChats,
    onRealTime,
    errors,
  };
};

export const useRealTime = (
  chatRoom: string,
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >,
  
) => {
  const counterRef = useRef(1);

  useEffect(() => {
    pusherClient.subscribe(chatRoom);
    pusherClient.bind("realtime-mode", (data: any) => {
      console.log("✅", data);      
        setChats((prev: any) => [
          ...prev,
          {
            role: data.chat.role,
            content: data.chat.message,
          },
        ]);
      counterRef.current += 1;
    });
    return () => {
      pusherClient.unbind("realtime-mode");
      pusherClient.unsubscribe(chatRoom);
    };
  }, []);
};
