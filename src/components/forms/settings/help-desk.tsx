'use client'
import React from 'react'
import { useHelpDesk } from '@/hooks/settings/use-settings'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import Section from '@/components/section-label'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import Accordion from '@/components/accordian'

type Props = {
  id: string
}

const HelpDesk = ({ id }: Props) => {
  const { register, errors, onSubmitQuestion, isQuestions, loading } =
    useHelpDesk(id)

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Servicio de Asistencia</CardTitle>
        <form
          onSubmit={onSubmitQuestion}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="flex flex-col gap-3">
            <Section
              label="Pregunta"
              message="Añade una pregunta que creas que se haga con frecuencia."
            />
            <FormGenerator
              inputType="input"
              register={register}
              errors={errors}
              form="help-desk-form"
              name="question"
              placeholder="Escriba su pregunta"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Respuesta a la pregunta"
              message="La respuesta a la pregunta anterior"
            />
            <FormGenerator
              inputType="textarea"
              register={register}
              errors={errors}
              name="answer"
              form="help-desk-form"
              placeholder="Escriba su respuesta"
              type="text"
              lines={5}
            />
          </div>
          <Button
            type="submit"
            className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
          >
            Crear
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question) => (
              <Accordion
                key={question.id}
                trigger={question.question}
                content={question.answer}
              />
            ))
          ) : (
            <CardDescription>No hay preguntas para mostrar</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  )
}

export default HelpDesk