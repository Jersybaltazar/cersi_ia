type IntegrationsListItemProps = {
    id: string
    name: 'stripe' | 'mercadopago',
    logo: string
    description: string
    title: string
    modalDescription: string
  }
  
  export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
    {
      id: '1',
      name: 'stripe',
      description:
        'Stripe es la forma más rápida y sencilla de integrar pagos y servicios financieros en su plataforma de software o mercado.',
      logo: 'a5418b3f-ca7e-477a-a00a-832116ee58ba',
      title: 'Connectar cuenta  de Stripe',
      modalDescription:
        'Las plataformas y mercados más exitosos del mundo, incluidos Shopify y DoorDash, utilizan Stripe Connect.',
    },
    {
      id: '2',
      name: 'mercadopago',
      description:
        'Mercado Pago es una plataforma de pagos confiable y rápida utilizada en América Latina para recibir y enviar pagos fácilmente.',
      logo: '97da4699-cf87-4a71-b3d4-6ef5d8f86bbf',
      title: 'Connectar cuenta  de Mercado Pago',
      modalDescription:
        'Las plataformas y mercados más exitosos del mundo, incluidos Shopify y DoorDash, utilizan MercadoPago Connect.',
    },
  ]