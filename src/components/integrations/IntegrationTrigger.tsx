import React from 'react'
import { Card } from '../ui/card'
import { CloudIcon } from 'lucide-react'
import { Separator } from '../ui/separator'
import Modal from '../mondal'
import { IntegrationModalBody } from './integration-modal-body'
import mercadopago from 'mercadopago'

type Props = {
  name: 'stripe' | 'mercadopago'
  logo: string
  title: string
  descrioption: string
  connections: {
    stripe: boolean,
    mercadopago:boolean
  }
}

const IntegrationTrigger = ({
  name,
  logo,
  title,
  descrioption,
  connections,
}: Props) => {
  return (
    <Modal
      title={title}
      type="Integration"
      logo={logo}
      description={descrioption}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2">
          <CloudIcon />
          {connections[name as 'stripe' | 'mercadopago'] ? 'conectado' : 'conectar'}
        </Card>
      }
    >
      <Separator orientation="horizontal" />
      <IntegrationModalBody
        connections={connections}
        type={name}
      />
    </Modal>
  )
}

export default IntegrationTrigger