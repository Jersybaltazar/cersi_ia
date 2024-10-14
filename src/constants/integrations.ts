type IntegrationsListItemProps = {
    id: string
    name: 'stripe'
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
  ]