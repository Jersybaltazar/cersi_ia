import { ZodType, z } from "zod";
export type UserRegistrationProps = {
  type: string;
  fullname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
};
export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().min(1),
    fullname: z
      .string()
      .min(4, { message: "Tu nombre completo debe tener al menos 4 caracteres" }),
    email: z.string().email({ message: "Formato de correo electrónico incorrecto" }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Tu contraseña debe tener al menos 8 caracteres" })
      .max(64, {
        message: "Tu contraseña no puede tener más de 64 caracteres",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "La contraseña solo debe contener letras y números"
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: "Debes ingresar un código de 6 dígitos" }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: "Los correos electrónicos no coinciden",
    path: ["confirmEmail"],
  });

export type UserLoginProps = {
  email: string;
  password: string;
};

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "No ingresaste un correo electrónico válido" }),
  password: z
    .string()
    .min(8, { message: "Tu contraseña debe tener al menos 8 caracteres" })
    .max(64, {
      message: "Tu contraseña no puede tener más de 64 caracteres",
    }),
});

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { message: "Tu contraseña debe tener al menos 8 caracteres" })
      .max(64, {
        message: "Tu contraseña no puede tener más de 64 caracteres",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "La contraseña solo debe contener letras y números"
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
