import CalIcon from '@/icons/cal-icon'
import ChatIcon from '@/icons/chat-icon'
import DashboardIcon from '@/icons/dashboard-icon'
import EmailIcon from '@/icons/email-icon'
import HelpDeskIcon from '@/icons/help-desk-icon'
import IntegrationsIcon from '@/icons/integrations'
import SettingsIcon from '@/icons/settings-icon'
import StarIcon from '@/icons/start-icon'
import TimerIcon from '@/icons/timer-icon'

type SIDE_BAR_MENU_PROPS = {
  label: string
  icon: JSX.Element
  path: string
}

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: 'Panel de control',
    icon: <DashboardIcon />,
    path: 'dashboard',
  },
  {
    label: 'Conversaciones',
    icon: <ChatIcon />,
    path: 'conversation',
  },
  {
    label: 'Integraciones',
    icon: <IntegrationsIcon />,
    path: 'integration',
  },
  {
    label: 'Configuración',
    icon: <SettingsIcon />,
    path: 'settings',
  },
  {
    label: 'Citas',
    icon: <CalIcon />,
    path: 'appointment',
  },
  {
    label: 'Email Marketing',
    icon: <EmailIcon />,
    path: 'email-marketing',
  },
]

type TABS_MENU_PROPS = {
  label: string
  icon?: JSX.Element
}

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'no leidos',
    icon: <EmailIcon />,
  },
  {
    label: 'todos',
    icon: <EmailIcon />,
  },
  {
    label: 'expirados',
    icon: <TimerIcon />,
  },
  {
    label: 'favoritos',
    icon: <StarIcon />,
  },
]

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'servicio de asistencia',
  },
  {
    label: 'preguntas',
  },
]

export const APPOINTMENT_TABLE_HEADER = [
  'Nombre',
  'Fecha de la cita',
  'Registro de cita',
  'Dominio o tienda',
]

export const EMAIL_MARKETING_HEADER = ['Id', 'Cliente', 'Respuestas', 'Dominio o Tienda']

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
    icon: <ChatIcon />,
  },
  {
    label: 'servicio de asistencia',
    icon: <HelpDeskIcon />,
  },
]