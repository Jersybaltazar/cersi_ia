import { z } from 'zod';

export const ContactFormSchema = z.object({
  nombre: z.string().nonempty('El nombre es obligatorio'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().nonempty('El teléfono es obligatorio'),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
