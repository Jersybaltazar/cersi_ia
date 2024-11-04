"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import Contact from "../components/contact";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";
import { pricingCards } from "@/constants/landing-page";
import { getMonthName } from "@/lib/utils";
import parse from "html-react-parser";
import { onGetBlogPosts } from "@/actions/landing";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Footer from "../components/footer";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [posts, setPosts] = useState<
    {
      id: string;
      title: string;
      image: string;
      content: string;
      createdAt: Date;
    }[]
  >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await onGetBlogPosts();
      if (data) setPosts(data);
    };

    fetchPosts();
  }, []);
  console.log(posts);
  const handlePlanClick = (planTitle: any) => {
    if (isSignedIn) {
      // Si el usuario está logeado, redirigir al dashboard con el plan seleccionado
      router.push(`/settings?plan=${planTitle}`);
    } else {
      // Si no está logeado, redirigir a la página de inicio de sesión
      router.push("/auth/sign-in");
    }
  };

  return (
    <main>
      <Navbar />
      <section className="container">
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
          <span className=" text-[rgb(16,146,224)] bg-[rgb(16,146,224)]/20 px-4 py-2 rounded-full text-sm mb-5">
            Un Chat bot asistente en ventas impulsado por IA
          </span>
          <br />
          <h1 className="text-8xl font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,rgb(16,146,224),white,rgb(74,32,138,.5))] text-transparent bg-clip-text text-center mb-10">
            SERSI-AI
          </h1>
          <p className="text-center max-w-[600px] font-bold mb-10">
            Descubra el poder de SERSI-AI , su asistente virtual personalizado e
            impulsado por potentes modelos de inteligencia artificial. Incruste
            SERSI-AI en cualquier sitio web ¡Con solo un fragmento de código!{" "}
          </p>
          <Button className="bg-purple-900  font-bold text-white py-3 px-6 mb-10">
            Iniciar Prueba Gratuita
          </Button>

          <div className="relative w-full max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 mt-8 z-[-10000] ">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-500/10 z-10"></div>
            <div className="relative group">
              <Image
                src="/images/Captura.png"
                alt="Dashboard SERSI-AI"
                quality={90}
                priority
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-[1.02] transition-transform duration-300"
                width={1200}
                height={675}
                style={{
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-purple-900/30 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-purple-900/30 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-purple-900/30 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-purple-900/30 rounded-br-2xl"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="container flex justify-center items-center flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center">Elije lo que mas te convenga</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Nuestros planes de precios sencillos están diseñados para satisfacer
          tus necesidades. Si
          {"no "} estás listo para comprometerte, puedes comenzar gratis.
        </p>
      </section>
      <div className="flex justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={clsx("w-[300px] flex flex-col justify-between", {
              "border-2 border-primary": card.title === "PRO",
            })}
          >
            <CardHeader>
              <CardTitle className="text-purple-900">{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              {card.title !== "ULTIMATE" && (
                <span className="text-muted-foreground">
                  <span>/mes</span>
                </span>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div key={feature} className="flex gap-2">
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              {card.title !== "ULTIMATE" ? (
                <button
                  onClick={() => handlePlanClick(card.title)}
                  className="bg-purples/20 border-purple-800 border-2 p-2 w-full text-center font-bold rounded-md"
                >
                  Empezar Ahora
                </button>
              ) : (
                <Link
                  href="/"
                  className="bg-purples/20 border-purple-800 border-2 p-2 w-full text-center font-bold rounded-md"
                >
                  Contáctenos
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <section className="container flex justify-center items-center flex-col gap-4 mt-28">
        <h2 className="text-4xl text-center">Sala de Noticias</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Explore nuestros conocimientos sobre IA, tecnologia y optimizacion
          para su negocio.
        </p>
      </section>
      <section className="md:grid-cols-3 grid-cols-1 grid gap-5 container mt-8">
        {posts &&
          posts.map((post) => (
            <Link href={`/blogs/${post.id}`} key={post.id}>
              <Card className="flex flex-col gap-2 rounded-xl overflow-hidden h-full hover:bg-gray-100">
                <div className="relative w-full aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4XHRYWHSIiHxwfIi4kJCUkHy4uMDAwLi44OjYzNjo4QUFBQUFBQUFBQUFBQUFBQUH/2wBDAQUWFh0ZHTkdHTlBOC44QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    placeholder="blur"
                  />
                </div>
                <div className="py-5 px-10 flex flex-col gap-5">
                  <CardDescription>
                    {getMonthName(post.createdAt.getMonth())}{" "}
                    {post.createdAt.getDate()} {post.createdAt.getFullYear()}
                  </CardDescription>
                  <CardTitle>{post.title}</CardTitle>
                  {parse(post.content.slice(4, 100))}...
                </div>
              </Card>
            </Link>
          ))}
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
