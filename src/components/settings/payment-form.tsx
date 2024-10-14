'use client'
import React from 'react'
import { CardDescription } from '../ui/card'
import { Loader } from '../loader'
import { PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '../ui/button'
import { useCompletePayment } from '@/hooks/billling/use-billing'


type PaymentFormProps = {
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
}

export const PaymentForm = ({ plan }: PaymentFormProps) => {
  const { processing, onMakePayment } = useCompletePayment(plan)
  return (
    <form
      onSubmit={onMakePayment}
      className="flex flex-col gap-5"
    >
      <div>
        <h2 className="font-semibold text-xl text-black">Metodo de Pago</h2>
        <CardDescription>Ingresa los datos de tu tarjeta</CardDescription>
      </div>
      <PaymentElement />
      <Button type="submit">
        <Loader loading={processing}>Pagar</Loader>
      </Button>
    </form>
  )
}