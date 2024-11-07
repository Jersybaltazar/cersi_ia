"use client";
import React, { useEffect } from "react";

const BotComponent: React.FC = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");

    const iframeStyles = (styleString: string) => {
      const style = document.createElement("style");
      style.textContent = styleString;
      document.head.append(style);
    };

    iframeStyles(`
      .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
        z-index: 1000;
      }
    `);

    iframe.src = "http://localhost:3000/chatbot";
    iframe.classList.add("chat-frame");
    document.body.appendChild(iframe);

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "http://localhost:3000") return;
      try {
        const dimensions = JSON.parse(e.data);
        iframe.width = dimensions.width;
        iframe.height = dimensions.height;
        
        // Verificación antes de llamar a postMessage
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            "f1b0cf36-778c-4f2a-918a-64975dfc08cd",
            "http://localhost:3000/"
          );
        }
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      document.body.removeChild(iframe);
    };
  }, []);

  return null;
};

export default BotComponent;
