"use client"
import React from "react"
import { USER_LOGIN_FORM } from "@/constants/form"
import { useFormContext } from "react-hook-form"
import FormGenerator from "../form-generator"

type Props = {}


const LoginForm = (props:Props)=>{

    const {
        register,
        formState:{errors},
    }= useFormContext()
    return (
        <>
        <h2 className="text-gravel md:text-4xl font-bold">
            Inicia Sesión
        </h2>
        <p className="text-iridium md:text-sm">
            Ingresa tu correo y contraseña
        </p>

            {USER_LOGIN_FORM.map((field)=>(
                <FormGenerator
                key={field.id}
                {...field}
                errors={errors}
                register={register}
                name={field.name}
                />
            ))}

        </>
    )
}
export default LoginForm