type UserRegistrationProps = {
    id: string
    type: 'email' | 'text' | 'password'
    inputType: 'select' | 'input'
    options?: { value: string; label: string; id: string }[]
    label?: string
    placeholder: string
    name: string
  }
  
  export const USER_REGISTRATION_FORM: UserRegistrationProps[] = [
    {
      id: '1',
      inputType: 'input',
      placeholder: 'Nombres Completos',
      name: 'fullname',
      type: 'text',
    },
    {
      id: '2',
      inputType: 'input',
      placeholder: 'Correo electronico',
      name: 'email',
      type: 'email',
    },
    {
      id: '3',
      inputType: 'input',
      placeholder: 'Confirmar correo',
      name: 'confirmEmail',
      type: 'email',
    },
    {
      id: '4',
      inputType: 'input',
      placeholder: 'Contraseña',
      name: 'password',
      type: 'password',
    },
    {
      id: '5',
      inputType: 'input',
      placeholder: 'Confrimar contraseña',
      name: 'confirmPassword',
      type: 'password',
    },
  ]
  
  export const USER_LOGIN_FORM: UserRegistrationProps[] = [
    {
      id: '1',
      inputType: 'input',
      label:'email',
      placeholder: 'Correo electronico',
      name: 'email',
      type: 'email',
    },
    {
      id: '2',
      inputType: 'input',
      label:'password',
      placeholder: 'Contraseña',
      name: 'password',
      type: 'password',
    },
  ]