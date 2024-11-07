"use server";
import { MercadoPagoConfig, Payment, CardToken } from "mercadopago";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

const mercadoPago = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN!,
});
const payment = new Payment(mercadoPago);

const validatePaymentData = (data: any) => {
  if (!data) throw new Error("paymentData es requerido");

  // Campos requeridos de primer nivel
  const requiredFields = [
    "transaction_amount",
    "token",
    "description",
    "installments",
    "payment_method_id",
    "issuer_id",
  ];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      throw new Error(`El campo ${field} es requerido en paymentData`);
    }
  }

  // Validación de campos anidados en `payer`
  if (!data.payer || typeof data.payer !== "object") {
    throw new Error(
      "El campo payer es requerido y debe ser un objeto en paymentData"
    );
  }

  if (!data.payer.email) {
    throw new Error("El campo payer.email es requerido en paymentData");
  }

  if (!data.payer.identification) {
    throw new Error(
      "El campo payer.identification es requerido en paymentData"
    );
  }
};

export const onProcessPayment = async (
  paymentData: any,
  plan: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  console.log("paymentData recibido:", paymentData);
  try {
    validatePaymentData(paymentData);
    const user = await currentUser();
    if (!user) throw new Error("Usuario no autenticado");

    const idempotencyKey = uuidv4();

    // Procesar el pago con MercadoPago
    const response = await payment.create({
      body: {
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
      requestOptions: {
        idempotencyKey: idempotencyKey,
      },
    });

    console.log(
      "Respuesta completa de Mercado Pago:",
      JSON.stringify(response, null, 2)
    );

    if (response.status === "approved") {
      // Actualizar la suscripción del usuario
      const update = await onUpdateSubscription(plan);
      if (update && update.status === 200) {
        return {
          status: "approved",
          message: "Pago aprobado y suscripción actualizada",
          plan: update.plan,
        };
      } else {
        throw new Error("Error al actualizar la suscripción");
      }
    } else {
      console.error("Error en el pago:", response);
      return {
        status: response.status,
        message: response.status_detail,
      };
    }
  } catch (error: any) {
    console.error("Error en onProcessPayment:", error);
    return { status: "error", message: error.message };
  }
};
export const onUpdateSubscription = async (
  plan: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const user = await currentUser();
    if (!user) return{ status: 400, message: 'Usuario no autenticado' };
    const creditsByPlan = {
      STANDARD: 10,
      PRO: 50,
      ULTIMATE: 500,
    };
    const update = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        subscription: {
          update: {
            data: {
              plan,
              credits: creditsByPlan[plan],
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
    });
    if (update) {
      return {
        status: 200,
        message: "subscription updated",
        plan: update.subscription?.plan,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
