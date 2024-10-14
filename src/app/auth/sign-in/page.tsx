import SignInFormProvider from "@/components/forms/sign-in/form-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import LoginForm from "@/components/forms/sign-in/login-form"

const SignInPage = () =>{
    return(
        <div className="flex-1 py-36 md:px-16 w-full">
            <div className="flex flex-col h-full gap-3">
                <SignInFormProvider>
                    <div className="flex flex-col gap-3">
                        <LoginForm />
                        <div className="w-full flex flex-col gap-3 items-center">
                            <Button        
                            type="submit"
                            className="w-full">
                                Iniciar Sesión
                            </Button>
                            <p>
                                ¿No tienes una cuenta? {''}
                                <Link
                                href="/auth/sign-up"
                                className="font-bold">
                                    Create una
                                </Link>
                            </p>
                        </div>

                    </div>
                </SignInFormProvider>

            </div>

        </div>
    )
}
export default SignInPage