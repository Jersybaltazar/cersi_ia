"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import gridLines from "../../../public/images/grid-lines.png";
import StarsBg from "../../../public/images/stars.png";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Modal from "../mondal";
import { useContactForm } from "@/hooks/contact/use-contanctform";
type Props = {};

const useRelativeMousePosition = (to: RefObject<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosition = (event: MouseEvent) => {
    if (!to.current) return;
    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return [mouseX, mouseY];
};

const Index: React.FC<Props> = (props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );
  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const { register, errors, loading, onSubmit } = useContactForm();
  return (
    <section className="py-20" ref={sectionRef}>
      <div className="container">
        <motion.div
          ref={borderedDivRef}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group"
          animate={{
            backgroundPositionX:
              typeof StarsBg === "object" && "width" in StarsBg
                ? StarsBg.width
                : "100%",
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          style={{
            backgroundPositionY,
            backgroundImage: `url(${StarsBg.src})`,
          }}
        >
          <div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
            style={{
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></div>
          <motion.div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay  opacity-0 group-hover:opacity-100 transition duration-700"
            style={{
              maskImage,
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></motion.div>
          <div className="relative py-20">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">
              Conecta con nosotros
            </h2>
            <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">
              Aumenta tus conversiones mientras duermes con asistentes virtuales
              inteligentes
            </p>
            <div className="flex justify-center mt-8">
              <Modal
                title="Agendar una llamada con un ejecutivo de cuentas"
                description="Responderemos en menos de 24 horas hábiles"
                trigger={
                  <Button className="bg-purple-900 font-bold text-white dark:hover:text-black py-3 px-6 mb-10">
                    Solicita información
                  </Button>
                }
              >
                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                  <input
                    type="text"
                    placeholder="Nombre de empresa o negocio"
                    className="border border-gray-300 rounded-md p-2"
                    value={formData.nombre}
                    {...register("nombre", {
                      onChange: (e) => setFormData({ ...formData, nombre: e.target.value }),
                    })}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm">
                      {errors.nombre.message}
                    </p>
                  )}
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="border border-gray-300 rounded-md p-2"
                    value={formData.email}
                    {...register("email", {
                      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="border border-gray-300 rounded-md p-2"
                    value={formData.telefono}
                    {...register("telefono", {
                      onChange: (e) => setFormData({ ...formData, telefono: e.target.value }),
                    })}
                  
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm">
                      {errors.telefono.message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="bg-purple-900 font-bold text-white dark:hover:text-black py-3 px-6 mt-4"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </Button>
                </form>
              </Modal>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Index;
