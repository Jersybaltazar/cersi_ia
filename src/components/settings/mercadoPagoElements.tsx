'use client'

import React from 'react'; 
import { Loader } from '../loader'
import {useMercadoPagoElements} from '@/hooks/billling/use-billing'
import { MercadoPagoForm } from './mercadopago-form'; // Tu formulario personalizado


type MercadoPagoElementsProps = {
  payment: 'STANDARD' | 'PRO' | 'ULTIMATE';
};

export const MercadoPagoElements = ({ payment }: MercadoPagoElementsProps) => {
  
  const { loading, mp } = useMercadoPagoElements(payment);
  console.log(mp)
  console.log(payment)
  
  return  ( 
    (payment === 'PRO' || payment === 'ULTIMATE') && (
      <Loader loading={loading}>
        {mp && <MercadoPagoForm plan={payment} mp={mp} />}
      </Loader>
    )
  );
};
