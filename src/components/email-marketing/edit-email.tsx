'use client'
import React, { useEffect } from 'react'

import { Button } from '../ui/button'
import { Loader } from '../loader'
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { useEditEmail } from '@/hooks/email-marketing/use-marketing'
import FormGenerator from '../forms/form-generator'

type EditEmailProps = {
  id: string
  onCreate(): void
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  setDefault: UseFormSetValue<FieldValues>
}

export const EditEmail = ({
  id,
  onCreate,
  errors,
  register,
  setDefault,
}: EditEmailProps) => {
  const { loading, template } = useEditEmail(id)

 
  useEffect(()=>{ 
    if (template) {
      setDefault('description', JSON.parse(template))
    }else{
      setDefault('description','')
    }
  },[template,setDefault])
  return (
    <form
      onSubmit={onCreate}
      className="flex flex-col gap-3"
    >
      <Loader loading={loading}>
        <FormGenerator
          name="description"
          label="Mensaje"
          register={register}
          errors={errors}
          inputType="textarea"
          lines={10}
          placeholder="Mensaje para los correos electronicos"
          type="text"
        />
        <Button>Guardar</Button>
      </Loader>
    </form>
  )
}