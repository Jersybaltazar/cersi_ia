import React from 'react'
import { cn, extractUUIDFromString, getMonthName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  message: {
    role: 'assistant' | 'user'
    content: string
    link?: string
  }
  createdAt?: Date
  domainIcon?:string | null
}

const Bubble = ({ message, createdAt,domainIcon  }: Props) => {
  let d = new Date()
  const image = extractUUIDFromString(message.content)
  console.log(message.link)

  return (
    <div
      className={cn(
        'flex gap-2 items-end',
        message.role == 'assistant' ? 'self-start' : 'self-end flex-row-reverse'
      )}
    >
      {message.role == 'assistant' ? (
        <Avatar className="w-5 h-5">
         <AvatarImage
            src={
              domainIcon  // Mostramos el icono del dominio dinámicamente
                ? `https://ucarecdn.com/${domainIcon}/`
                : "https://ucarecdn.com/d24c6b73-55cb-466c-b08f-0cc49c6ce0ec/124599"  // Fallback en caso de que no haya icono
            }
            alt="icono del dominio"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-5 h-5">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'flex flex-col gap-3 min-w-[200px] max-w-[300px] p-4 rounded-t-md',
          message.role == 'assistant'
            ? 'bg-muted rounded-r-md'
            : 'bg-blue-300 rounded-l-md'
        )}
      >
        {createdAt ? (
          <div className="flex gap-2 text-xs text-gray-600">
            <p>
              {createdAt.getDate()} {getMonthName(createdAt.getMonth())}
            </p>
            <p>
              {createdAt.getHours()}:{createdAt.getMinutes()}
              {createdAt.getHours() > 12 ? 'PM' : 'AM'}
            </p>
          </div>
        ) : (
          <p className="text-xs">
            {`${d.getHours()}:${d.getMinutes()} ${
              d.getHours() > 12 ? 'pm' : 'am'
            }`}
          </p>
        )}
        {image ? (
          <div className="relative aspect-square">
            <Image
              src={`https://ucarecdn.com/${image[0]}/`}
              fill
              alt="image"
            />
          </div>
        ) : (
          <p className="text-sm">
            {message.content.replace('(complete)', ' ')}
            {message.link && (
              <Link
                className="underline font-bold pl-2"
                href={message.link}
                target="_blank"
              >
                Su enlace
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Bubble