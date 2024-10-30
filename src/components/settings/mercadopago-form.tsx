"use client";
import React, { useState, useEffect } from "react";
import { CardDescription } from "../ui/card";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { useCompletePaymentMercadoPago } from '@/hooks/billling/use-billing'

type MercadoPagoFormProps = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  mp: any;
};

export const MercadoPagoForm = ({ plan,  mp  }: MercadoPagoFormProps) => {

  const [cardFormInstance, setCardFormInstance] = useState<any>(null);


      let amount = '0.00';
      switch (plan) {
        case 'PRO':
          amount = '65.00';
          break;
        case 'ULTIMATE':
          amount = '95.00';
          break;
        default:
          amount = '0.00';
      }

      const {processing, onMakePayment} = useCompletePaymentMercadoPago({
        plan,
        cardFormInstance,
        amount,

      });

      useEffect(() => {
        if (!mp) return;
        if ( cardFormInstance) return
      const cardForm = mp.cardForm({
        amount: amount,
        form: {
          id: 'form-checkout',
          cardholderName: { id: 'form-checkout__cardholderName' },
          cardholderEmail: { id: 'form-checkout__cardholderEmail' },
          cardNumber: { id: 'form-checkout__cardNumber' },
          expirationDate: { id: 'form-checkout__expirationDate' },
          securityCode: { id: 'form-checkout__securityCode' },
          identificationType: { id: 'form-checkout__identificationType' },
          identificationNumber: { id: 'form-checkout__identificationNumber' },
          issuer: { id: 'form-checkout__issuer' },
          installments: { id: 'form-checkout__installments' },
        },

        callbacks: {
          onFormMounted: (error: any) => {
            if (error) {
              console.warn('Error al montar el formulario:', error);
            } else {
              console.log('Formulario montado correctamente');
            }
            
          },
        },
      });

      setCardFormInstance(cardForm);
    
  }, [mp, amount, cardFormInstance, processing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (processing) return;
    if (!cardFormInstance) {
      console.error('Card form instance is not initialized');
      return;
    }
  
    try {
      const cardData = await cardFormInstance.createCardToken();
  
      if (cardData.error) {
        console.error('Error al generar el token:', cardData.error);

        return;
      }
  
      console.log('Token recibido:', cardData.token);
  
      // Proceder con el procesamiento del pago
      await onMakePayment(cardData);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="form-checkout">
    <div>
      <h2 className="font-semibold text-xl text-white">Método de Pago</h2>
      <CardDescription>Ingresa los datos de tu tarjeta</CardDescription>
    </div>
    <input
      type="text"
      name="cardNumber"
      id="form-checkout__cardNumber"
      placeholder="Número de tarjeta"
    />
    <input
      type="text"
      name="cardExpirationDate"
      id="form-checkout__expirationDate"
      placeholder="MM/YY"
    />
    <input
      type="text"
      name="securityCode"
      id="form-checkout__securityCode"
      placeholder="Código de seguridad"
    />
    <input
      type="text"
      name="cardholderName"
      id="form-checkout__cardholderName"
      placeholder="Titular de la tarjeta"
    />
    <input
      type="email"
      name="cardholderEmail"
      id="form-checkout__cardholderEmail"
      placeholder="E-mail"
    />
    <select name="identificationType" id="form-checkout__identificationType">
      <option value="DNI"></option>
    </select>
    <input
  
      type="text"
      name="identificationNumber"
      id="form-checkout__identificationNumber"
      placeholder="Número de documento"
    />
    <select name="" id="form-checkout__issuer"></select>
    <select name="" id="form-checkout__installments"></select>
    <Button type="submit">
      <Loader loading={processing}>Pagar</Loader>
    </Button>
  </form>
  );
};
