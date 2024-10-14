"use client";
import { Button } from "@/components/ui/button";
import { useAuthContextHook } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import React from "react";

type Props = {};

const ButtonHandler = (props: Props) => {
  const { setCurrentStep, currentStep } = useAuthContextHook();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGenerateOTP } = useSignUpForm();

  const { isDirty: isName } = getFieldState("fullname", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState); 

  if (currentStep === 3) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button type="submit" className="w-full">
          Create una cuenta
        </Button>
        <p>
          ¿Ya tienes una cuenta? {''}
          <Link href="/auth/sign-in" className="font-bold">
          Inicia Sesión
          </Link>
        </p>
      </div>
    )
  }
  if (currentStep === 2) {
    return(
        <div className="w-full flex flex-col gap-3 items-center">
            <Button 
            type="submit" 
            className="w-full"
            {...(isName && 
                isEmail && 
                isPassword &&{
                onClick:()=> 
                    onGenerateOTP(
                        getValues('email'),
                        getValues('password'),
                        setCurrentStep
                    ),
            })}
            >
                    Continuar
            </Button>
            <p>
                ¿Ya tienes una cuenta? {''}
                <Link
                href="/auth/sign-in"
                className="font-bold">
                    Inicia Sesión
                </Link>
            </p>
        </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="submit"
        className="w-full"
        onClick={() => setCurrentStep((prev: number) => prev + 1)}
      >
        Continuar
      </Button>
      <p>
        Ya tienes una cuenta? {""}
        <Link href="/auth/sign-in" className="font-bold">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};
export default ButtonHandler;
