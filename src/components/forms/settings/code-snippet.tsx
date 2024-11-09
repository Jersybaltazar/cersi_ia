"use client";
import Section from "@/components/section-label";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast();
  let snippet = `
    const iframe = document.createElement("iframe");
    
    const iframeStyles = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
    }
    
    iframeStyles(\`
        .chat-frame {
            position: fixed;
            bottom: 50px;
            right: 50px;
            border: none;
            z-index: 1000;
        }
    \`);
    
    iframe.src = "http://cersi-ia.vercel.app/chatbot";
    iframe.classList.add('chat-frame')
    document.body.appendChild(iframe)
    
    window.addEventListener("message", (e) => {
        if (e.origin !== "http://cersi-ia.vercel.app") return;
        try {
            let dimensions = JSON.parse(e.data);
            iframe.width = dimensions.width;
            iframe.height = dimensions.height;
            iframe.contentWindow.postMessage("${id}", "http://cersi-ia.vercel.app/");
        } catch (error) {
            console.error("Error al procesar el mensaje:", error);
        }
    });
`;

  return (
    <div className="mt-10 flex flex-col gap-5 items-start">
      <Section
        label="Fragmento de codigo"
        message="Copia y pega este fragmento de código en la etiqueta <header/> de tu sitio web."
      />
      <div className="bg-muted px-10 rounded-lg inline-block relative">
        <Copy
          className="absolute top-5 right-5 text-gray-400 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(snippet);
            toast({
              title: "Copiado en el portapapeles",
              description: "Ahora pegue el código dentro de su sitio web",
            });
          }}
        />
        <pre>
          <code className="text-gray-500">{snippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
