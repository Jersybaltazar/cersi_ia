"use client";
import useSideBar from "@/context/use-sidebar";
import React from "react";
import { Loader } from "../loader";
import { Switch } from "../ui/switch";

type Props = {};

const BreadCrumb = (props: Props) => {
  // wip: configura el uso del gancho de la barra lateral para chat en tiempo real y cosas del chat bot
  //WIP: CONFIGURAR LA DESCRIPCIÓN Y EL INTERRUPTOR
  const {
    chatRoom,
    expand,
    loading,
    onActivateRealtime,
    onExpand,
    page,
    onSignOut,
    realtime,
  } = useSideBar();
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
        {page === "conversation" && chatRoom && (
          <Loader loading={loading} className="p-0 inline">
            <Switch
              defaultChecked={realtime}
              onClick={(e) => onActivateRealtime(e)}
              className="data-[state=checked]:bg-purple-900 data-[state=unchecked]:bg-peach"
            />
          </Loader>
        )}
      </div>
      <p className="text-gray-500 text-sm">
        {page == 'settings'
          ? 'Gestione la configuración, las preferencias y las integraciones de su cuenta.'
          : page == 'dashboard'
          ? 'Una descripción detallada de sus métricas, uso, clientes y más.'
          : page == 'appointment'
          ? 'Ver y editar todas tus citas.'
          : page == 'email-marketing'
          ? 'Envié correos electronicos masivos a tus cliente.s'
          : page == 'integration'
          ? 'Conecte aplicaciones de terceros a SERSI-AI.'
          : 'Modifica la configuración del dominio , cambia las opciones del chatbot, ingrese preguntas de ventas y entrena a tu bot para que haga lo que quieras.'}
      </p>
    </div>
  );
};

export default BreadCrumb;
