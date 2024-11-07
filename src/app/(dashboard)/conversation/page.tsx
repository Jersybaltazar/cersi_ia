import { onGetAllAccountDomains } from '@/actions/settings'
import {  onGetAllCustomers } from '@/actions/mail'
import ConversationMenu from '@/components/conversations'
import Messenger from '@/components/conversations/messenger'
import InfoBar from '@/components/infobar'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const ConversationPage = async (props: Props) => {
  const user = await currentUser()
  if (!user) return null
  const customers = await onGetAllCustomers(user.id)
  console.log(customers?.subscription)
  const domains = await onGetAllAccountDomains()
  return (
    <div className="w-full h-full flex">
      <ConversationMenu domains={domains?.domains} />

      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
          <InfoBar />
        </div>
        <Messenger />
      </div>
    </div>
  )
}

export default ConversationPage