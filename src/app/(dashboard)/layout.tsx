import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
 const authenticated = await  onLoginUser()
  if (!authenticated) {
    redirect('/auth/sign-in');
    return null;
  }
  return (
    <ChatProvider>
      <div className="flex h-screen w-full">
      <SideBar domains={authenticated.domain} />
        <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  )
}

export default OwnerLayout