import Image from "next/image";
import Navbar from "../components/navbar";
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

export default async function Home() {
  const posts:
    | {
        id: string;
        title: string;
        image: string;
        content: string;
        createdAt: Date;
      }[]
    | undefined = await onGetBlogPosts();
  return (
    <main>
      <Navbar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
          <span className=" text-purple-900 bg-purples/20 px-4 py-2 rounded-full text-sm">
            Un Chat bot asistente en ventas impulsado por IA
          </span>
          <br />
          <h1 className="text-8xl font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text text-center ">
            SERSI-AI
          </h1>
          <p className="text-center max-w-[600px] font-bold">
            ¡Su asistente de ventas impulsado por IA! Incruste rambo AI en
            cualquier sitio web ¡Con solo un fragmento de código!{" "}
          </p>
          <Button className="bg-purple-900  font-bold text-white px-4">
            Empezar Gratis
          </Button>
          <Image
            src="/images/hero.png"
            alt="LOGO"
            sizes="100vw"
            style={{
              width: "100px",
              height: "auto",
            }}
            width={0}
            height={0}
          />
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-10">
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
              "border-2 border-primary": card.title === "Unlimited",
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
              <span className="text-muted-foreground">
                <span>/ mes</span>
              </span>
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
              <Link
                href={`/dashbord?plan=${card.title}`}
                className="bg-purples/20  border-purple-800 border-2 p-2 w-full text-center font-bold rounded-md"
              >
                Empezar Ahora
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        <h2 className="text-4xl text-center">News Room</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Explore our insights on AI, technology, and optimizing your business.
        </p>
      </section>
      <section className="md:grid-cols-3 grid-cols-1 grid gap-5 container mt-8">
        {posts &&
          posts.map((post) => (
            <Link href={`/blogs/${post.id}`} key={post.id}>
              <Card className="flex flex-col gap-2 rounded-xl overflow-hidden h-full hover:bg-gray-100">
                <div className="relative w-full aspect-video">
                  <Image
                    src={`${process.env.CLOUDWAYS_UPLOADS_URL}${post.image}`}
                    alt="post featured image"
                    fill
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
    </main>
  );
}
