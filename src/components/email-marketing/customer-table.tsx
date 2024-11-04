"use client";
import React from "react";
import { DataTable } from "../table";
import { EMAIL_MARKETING_HEADER } from "@/constants/menu";
import { TableCell, TableRow } from "../ui/table";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { SideSheet } from "../sheet";
import Answers from "./answers";

type CustomerTableProps = {
  domains: {
    customer: {
      Domain: {
        name: string;
      } | null;
      id: string;
      email: string | null;
    }[];
  }[];
  onSelect(email: string): void;
  select: string[];
  onId(id: string): void;
  id?: string;
  subscriptionPlan: "STANDARD" | "PRO" | "ULTIMATE";
};

export const CustomerTable = ({
  domains,
  onSelect,
  select,
  onId,
  id,
  subscriptionPlan,
}: CustomerTableProps) => {
  return (
    <DataTable headers={EMAIL_MARKETING_HEADER}>
      {domains.map((domain) =>
        domain.customer
          .slice(
            0,
            subscriptionPlan === "STANDARD" 
            ? 10 
            : subscriptionPlan === "PRO"
            ? 50
            : domain.customer.length 
          )
          .map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <Card
                  onClick={() => onSelect(c.email as string)}
                  className={cn(
                    "rounded-full w-5 h-5 border-4 cursor-pointer",
                    select.includes(c.email as string)
                      ? "bg-purple-700"
                      : "bg-purple-300"
                  )}
                />
              </TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>
                <SideSheet
                  title="Respuestas"
                  description="Respuestas a las preguntas filtro configuradas por el bot."
                  trigger={
                    <Card
                      className="bg-purple-400 py-2 px-4 cursor-pointer text-gray-700 hover:bg-purple-600"
                      onClick={() => onId(c.id)}
                    >
                      Ver
                    </Card>
                  }
                >
                  <Answers id={id} />
                </SideSheet>
              </TableCell>
              <TableCell className="text-right">{c.Domain?.name}</TableCell>
            </TableRow>
          ))
      )}
    </DataTable>
  );
};
