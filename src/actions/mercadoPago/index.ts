'use server'
import {MercadoPagoConfig, Payment} from 'mercadopago';
import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid';

const mercadoPago = new MercadoPagoConfig({accessToken: process.env.ACCESS_TOKEN!,});
const payment = new Payment(mercadoPago);



export const onProcessPayment = async (paymentData: any, plan: 'STANDARD' | 'PRO' | 'ULTIMATE') => {
      console.log('paymentData recibido:', paymentData);
      console.log('transaction_amount:', paymentData.transaction_amount);
    try {
      const user = await currentUser();
      if (!user) throw new Error('Usuario no autenticado');

      const idempotencyKey = uuidv4();
  
      // Procesar el pago con MercadoPago
      const response = await payment.create({
        body:{
            transaction_amount: paymentData.transaction_amount,
            token: paymentData.token,
            description: paymentData.description,
            installments: paymentData.installments,
            payment_method_id: paymentData.payment_method_id,
            issuer_id: paymentData.issuer_id,
            payer: {
              email: paymentData.payer.email,
              identification: paymentData.payer.identification,
            },
        },
        requestOptions:{
            idempotencyKey:idempotencyKey,
        }   
      });
  
      if (response.status === 'approved') {
        // Actualizar la suscripción del usuario
        const update = await client.user.update({
          where: { clerkId: user.id },
          data: {
            subscription: {
              update: {
                plan,
                credits: plan === 'PRO' ? 50 : plan === 'ULTIMATE' ? 500 : 10,
              },
            },
          },
          select: {
            subscription: { select: { plan: true } },
          },
        });
  
        return {
          status: 'approved',
          message: 'Pago aprobado y suscripción actualizada',
          plan: update.subscription?.plan,
        };
      } else {
        return {
          status: response.status,
          message: response.status_detail,
        };
      }
    } catch (error: any) {
      console.error('Error en onProcessPayment:', error);
      return { status: 'error', message: error.message };
    }
  };
export const onUpdateSubscription = async (
    plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
  ) => {
    try {
      const user = await currentUser()
      if (!user) return
      const update = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          subscription: {
            update: {
              data: {
                plan,
                credits: plan == 'PRO' ? 50 : plan == 'ULTIMATE' ? 500 : 10,
              },
            },
          },
        },
        select: {
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      })
      if (update) {
        return {
          status: 200,
          message: 'subscription updated',
          plan: update.subscription?.plan,
        }
      }
    } catch (error) {
      console.log(error)
    }
  }