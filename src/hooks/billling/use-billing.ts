import React, { useEffect, useState } from 'react'
import {
  onProcessPayment,
  onUpdateSubscription,
} from '@/actions/mercadoPago'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import {
  useElements,
  useStripe as useStripeHook,
} from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'

export const useStripe = () => {
  const [onStripeAccountPending, setOnStripeAccountPending] =
    useState<boolean>(false)

  const onStripeConnect = async () => {
    try {
      setOnStripeAccountPending(true)
      const account = await axios.get(`/api/stripe/connect`)
      if (account) {
        setOnStripeAccountPending(false)
        if (account) {
          window.location.href = account.data.url
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return { onStripeConnect, onStripeAccountPending }
}



export const useCompleteCustomerPayment = (onNext: () => void) => {
  const [processing, setProcessing] = useState<boolean>(false)
  const { toast } = useToast()
  const stripe = useStripeHook()
  const elements = useElements()

  const onMakePayment = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return null
    }

    console.log('no reload')

    try {
      setProcessing(true)

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/settings',
        },
        redirect: 'if_required',
      })

      if (error) {
        console.log(error)
      }

      if (paymentIntent?.status === 'succeeded') {
        toast({
          title: 'Success',
          description: 'Payment complete',
        })
        onNext()
      }

      setProcessing(false)
    } catch (error) {
      console.log(error)
    }
  }

  return { processing, onMakePayment }
}





export const useCompleteMercadoPagoPayment = (initPoint: string) => {
  const onMakePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (initPoint) {
      window.location.href = initPoint; // Redirigir al usuario al flujo de pago
    }
  };

  return { onMakePayment };
};



export const useSubscriptionsMercadoPago = (plan: 'STANDARD' | 'PRO' | 'ULTIMATE') => {
  const [loading, setLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState<'STANDARD' | 'PRO' | 'ULTIMATE'>(plan);
  const { toast } = useToast();
  const router = useRouter();

  const onUpdatetToFreTier = async () => {
    try {
      setLoading(true);
      const free = await onUpdateSubscription('STANDARD');
      if (free) {
        setLoading(false);
        toast({
          title: 'Success',
          description: free.message,
        });
        router.refresh();
      }
    } catch (error) {
      console.log('Error al actualizar la suscripción:', error);
    }
  };

  const onSetPayment = (payment: 'STANDARD' | 'PRO'| 'ULTIMATE') => 
    setPayment(payment);
  ;

  return { loading, payment, onSetPayment, onUpdatetToFreTier };
};



export const useMercadoPagoElements = (payment: 'STANDARD' | 'PRO' | 'ULTIMATE') => {
  const [loading, setLoading] = useState(true);
  const [mp, setMp] = useState(null);

  useEffect(() => {
    const loadMP = async () => {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const mpInstance = new window.MercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY, {
          locale: 'es-AR',
        });
        setMp(mpInstance);
        setLoading(false);
      };

      script.onerror = () => {
        console.error('Error al cargar Mercado Pago');
        setLoading(false);
      };

      return () => {
        document.body.removeChild(script);
      };
    };

    if (payment !== 'STANDARD') {
      loadMP();
    } else {
      setLoading(false);
    }
  }, [payment]);

  return { loading, mp };
};

export const useCompletePayment = (
  payment: 'STANDARD' | 'PRO' | 'ULTIMATE'
) => {
  const [processing, setProcessing] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()
  const stripe = useStripeHook()
  const elements = useElements()

  const onMakePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return null
    }


    try {
      setProcessing(true)

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/settings',
        },
        redirect: 'if_required',
      })

      if (error) {
        console.log(error)
      }

      if (paymentIntent?.status === 'succeeded') {
        const plan = await onUpdateSubscription(payment)
        if (plan) {
          toast({
            title: 'Success',
            description: plan.message,
          })
        }
      }

      setProcessing(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return { processing, onMakePayment }
}

type UseCompletePaymentMercadoPagoProps = {
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
  cardFormInstance: any;
  amount:string;
}
export const useCompletePaymentMercadoPago = ({plan,cardFormInstance,amount}:UseCompletePaymentMercadoPagoProps) => {
  
  const [processing, setProcessing] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const onMakePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Amount recibido:', amount);
    
    if (!cardFormInstance) {
      console.error('Card form instance is not initialized');
      return;
    }

    try {
      setProcessing(true);

      const cardData = cardFormInstance.getCardFormData();
      console.log(cardData)
      console.log('Token de la tarjeta', cardData.token)
      // Preparar los datos del pago
      const paymentData = {
        transaction_amount: Number(amount),
        token: cardData.token,
        description: `Suscripción ${plan}`,
        installments: Number(cardData.installments),
        payment_method_id: cardData.paymentMethodId,
        issuer_id: cardData.issuerId,
        payer: {
          email: cardData.cardholderEmail,
          identification: {
            type: cardData.identificationType,
            number: cardData.identificationNumber,
          },
        },
      };

      console.log('paymentData:', paymentData.token );
      const result = await onProcessPayment(paymentData, plan);

      if (result.status === 'approved') {
        toast({
          title: 'Pago Exitoso',
          description: 'Tu suscripción ha sido actualizada.',
        });
        router.push('/settings');
      } else {
        toast({
          title: 'Error en el Pago',
          description: result.message || 'No se pudo procesar el pago.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      toast({
        title: 'Error en el Pago',
        description: 'Ocurrió un error al procesar el pago.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };


    return  { processing, onMakePayment };
  };
  