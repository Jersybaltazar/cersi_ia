import { CheckCircle2Icon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { StripeConnect } from '../settings/stripe-connect'

type IntegrationModalBodyProps = {
  type: string
  connections: {
    [key in 'stripe']: boolean
  }
}

export const IntegrationModalBody = ({
  type,
  connections,
}: IntegrationModalBodyProps) => {
  switch (type) {
    case 'stripe':
      return (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Stripe tendra accesso a</h2>
          {[
            'Informacion bancaria y de pagos',
            'Productos y servicios que vende',
            'Ingormacion comercial y fiscal',
            'Crear y actualizar productos',
          ].map((item, key) => (
            <div
              key={key}
              className="flex gap-2 items-center pl-3"
            >
              <CheckCircle2Icon />
              <p>{item}</p>
            </div>
          ))}
          <div className="flex justify-between mt-10">
            <Button variant="outline">Más información</Button>
            <StripeConnect connected={connections[type]} />
          </div>
        </div>
      )
    default:
      return <></>
  }
}