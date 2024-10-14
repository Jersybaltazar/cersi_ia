import { getUserAppointments } from '@/actions/appointment'
import {
  getUserBalance,
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
  getUserTransactions,
} from '@/actions/dashboard'
import DashboardCard from '@/components/dashboard/cards'
import { PlanUsage } from '@/components/dashboard/plan-usage'
import InfoBar from '@/components/infobar'
import { Separator } from '@/components/ui/separator'
import CalIcon from '@/icons/cal-icon'
import EmailIcon from '@/icons/email-icon'
import PersonIcon from '@/icons/person-icon'
import { TransactionsIcon } from '@/icons/transactions-icon'
import { Banknote ,HandCoins  } from 'lucide-react'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const clients = await getUserClients()
  const sales = await getUserBalance()
  const bookings = await getUserAppointments()
  const plan = await getUserPlanInfo()
  const transactions = await getUserTransactions()
  const products = await getUserTotalProductPrices()

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Clientes Potenciales"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Valor del Pipeline"
            icon={<Banknote  />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Citas"
            icon={<CalIcon />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Ventas Totales"
            icon={<HandCoins />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
            <div>
              <h2 className="font-bold text-2xl">Plan de Uso</h2>
              <p className="text-sm font-light">
                Una descripción detallada de sus metricas, usos, clientes y más
              </p>
            </div>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
          <div className="flex flex-col">
            <div className="w-full flex justify-between items-start mb-5">
              <div className="flex gap-3 items-center">
                <TransactionsIcon />
                <p className="font-bold">Transacciones Recientes</p>
              </div>
              <p className="text-sm">Ver mas</p>
            </div>
            <Separator orientation="horizontal" />
            {transactions &&
              transactions.data.map((transaction) => (
                <div
                  className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
                  key={transaction.id}
                >
                  <p className="font-bold">
                    {transaction.calculated_statement_descriptor}
                  </p>
                  <p className="font-bold text-xl">
                    {transaction.amount / 100} PEN
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page