"use client";
import { useToast } from "@/components/ui/use-toast";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });
  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (authenticated.status === "complete") {
          await setActive({ session: authenticated.createdSessionId });
          console.log("Sesión activa:", authenticated.createdSessionId);
          console.log("Redirigiendo al dashboard...");

          await new Promise(resolve=>setTimeout(resolve,500))

          router.push("/dashboard")
          console.log("redireccioncompleta")
          toast({
            title: "Succes",
            description: "Bienvenido de nuevo !",
          });
        } else {

          console.log("ERROR en la authentificacion")
        }
      } catch (error: any) {
        setLoading(false);
        if (error.errors[0].code === "form_password_incorrect") {
          toast({
            title: "Error",
            description: "Email/password is incorrect. Please try again.",
          });
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again later.",
          });
        }
      }
    }
  )
  return {
    methods,
    onHandleSubmit,
    loading,
  };
};
