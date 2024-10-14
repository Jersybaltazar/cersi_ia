import TabsMenu from '@/components/tabs/intex'
import { TabsContent } from '@/components/ui/tabs'
import { HELP_DESK_TABS_MENU } from '@/constants/menu'
import React from 'react'
import HelpDesk from './help-desk'
import FilterQuestions from './filter-questions'

type Props = {
  id: string
}

const BotTrainingForm = ({ id }: Props) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Entrenamiento del Bot</h2>
        <p className="text-sm font-light">
        Establezca preguntas frecuentes, cree preguntas para captar información de clientes potenciales y
          entrena a tu bot para que actúe como tú quieras.
        </p>
      </div>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent
          value="servicio de asistencia"
          className="w-full"
        >
          <HelpDesk id={id} />
        </TabsContent>
        <TabsContent value="preguntas">
          <FilterQuestions id={id} />
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default BotTrainingForm