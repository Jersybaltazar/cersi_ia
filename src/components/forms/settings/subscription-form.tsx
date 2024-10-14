"use client";
import { Loader } from "@/components/loader";
import { MercadoPagoElements } from "@/components/settings/mercadoPagoElements";
import SubscriptionCard from "@/components/settings/subscription-card";
import { Button } from "@/components/ui/button";
import { useSubscriptionsMercadoPago } from "@/hooks/billling/use-billing";
import React from "react";

type Props = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
};

const SubscriptionForm = ({ plan }: Props) => {
  const { loading, onSetPayment, payment, onUpdatetToFreTier } =
    useSubscriptionsMercadoPago(plan);
  console.log(plan);
  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SubscriptionCard
            title="STANDARD"
            description="Perfecto si recién estás empezando a utilizar Cersi AI"
            price="0"
            payment={payment}
            onPayment={onSetPayment}
            id="STANDARD"
          />

          <SubscriptionCard
            title="PRO"
            description="Para propietarios de varias tiendas"
            price="65"
            payment={payment}
            onPayment={onSetPayment}
            id="PRO"
          />

          <SubscriptionCard
            title="ULTIMATE"
            description="El kit definitivo para las Empresas"
            price="95"
            payment={payment}
            onPayment={onSetPayment}
            id="ULTIMATE"
          />
        </div>
        {payment !== "STANDARD" && <MercadoPagoElements payment={payment} />}

        {payment === "STANDARD" && (
          <Button onClick={onUpdatetToFreTier}>
            <Loader loading={loading}>Confirmar</Loader>
          </Button>
        )}
      </div>
    </Loader>
  );
};

export default SubscriptionForm;
