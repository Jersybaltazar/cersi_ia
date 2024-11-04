import { useToast } from '@/components/ui/use-toast';
import { ContactFormSchema, ContactFormValues } from '@/schemas/contactForm.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { onSendContactEmail } from '@/actions/contact';

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const response = await onSendContactEmail(data);
      if (response) {
        toast({
          title: 'Success',
          description: response.message,
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Error al enviar el mensaje.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    register,
    errors,
    loading,
    onSubmit,
  };
};
